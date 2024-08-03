from flask import Flask, render_template, request, redirect, url_for, flash, session, send_from_directory
from datetime import datetime, timedelta
import json, requests
from main import app
from config import *
from utils import *

@app.route('/')
def home(): 
    # page = int(request.args.get('page', 1))
    # start = (page-1) * TOTAL_RESULTS
    # end = start + TOTAL_RESULTS 
    response = requests.get(URL)
    countries = []
    if response.status_code == 200:
        data = response.json()

        for item in data['data']:        
            countries.append({'rank': item['rank'], 'nome': item['name'], 'gold': item['gold_medals'], 'silver': item['silver_medals'], 'bronze': item['bronze_medals'],'medalha': item['total_medals']})

            countries_sort = sorted(countries, key=lambda x: x['gold'], reverse=True)  
    return render_template('index.html', countries = countries_sort)



@app.route('/calendario', methods=['POST', 'GET'])
def calendário():
    day = request.args.get('day', datetime.now().strftime('%Y-%m-%d'))
    disciplines = get_disciplines()
    actual = request.args.get('actual', 1)


    agenda, final_url, show_more = get_agenda(actual, day)
    
    if show_more:
        actual = casting_actual(final_url, day)


    show_next, show_previous, day_plus_one, day_minus_one = check_if_days_are_valid(day)

    context = {"agenda": agenda, "day_plus_one": day_plus_one, "day_minus_one": day_minus_one,
                "show_previous": show_previous, "show_next": show_next, "disciplines": disciplines, "actual": actual, "day":day, "show_more":show_more}

    return render_template('agenda.html', **context)



@app.route('/agenda-modalidade', methods=['POST', 'GET'])
def calendario_filtrado():
    day = request.args.get('day', datetime.now().strftime('%Y-%m-%d')) 
    sport = request.args.get('sport')

    if request.method == 'POST':
        form_data = request.form.to_dict()
        if form_data.get('selecao_esporte'):
            sport = form_data.get('selecao_esporte')
            
        else:
            return redirect('calendario')

    show_next, show_previous, day_plus_one, day_minus_one = check_if_days_are_valid(day)

    agenda = requests.get(f'https://apis.codante.io/olympic-games/events?date={day}&discipline={sport}')
    agenda = agenda.json()
    agenda = agenda['data']

    context = {"agenda": agenda, "day_plus_one": day_plus_one, "day_minus_one": day_minus_one,
            "show_previous": show_previous, "show_next": show_next, "sport": sport}
    return render_template('calendario_filtrado.html', **context)






@app.route('/modalidade/<int:id_pagina>')
def resultados(id_pagina):
    proximo = True
    url = f'https://apis.codante.io/olympic-games/events?page={id_pagina}'
    resultados = []

    requisicao = requests.get(url)
    requisicao = requisicao.json()
    
    if requisicao['links']['next'] == None:
        proximo = False

    for i in requisicao['data']:
        if i['status'] == "Finished":
            resultados.append(i)

    context = {"id_pagina": id_pagina, "proximo": proximo, "resultados":resultados}
    return render_template('resultados.html', **context)










@app.route('/teste')
def teste():
    day = request.args.get('day', '2024-08-02')  # Obtém a data do parâmetro da query string
    page = int(request.args.get('page', 1))  # Obtém o número da página, padrão é 1
    per_page = 10  # Número de eventos por página

    url = f'https://apis.codante.io/olympic-games/events?date={day}&page={page}'
    response = requests.get(url)
    data = response.json()

    agenda = [game for game in data['data'] if game['status'] != "Finished"]
    has_next_page = data['links'].get('next') is not None
    
    
    

    context = {"agenda": agenda, "day": day,
            "page": page, "has_next_page": has_next_page}

    return render_template('agenda.html', **context)