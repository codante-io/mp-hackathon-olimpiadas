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
            countries.append({'rank': item['rank'], 'nome': item['name'], 'gold': item['gold_medals'], 
                              'silver': item['silver_medals'], 'bronze': item['bronze_medals'],'medalha': item['total_medals']})

            countries_sort = sorted(countries, key=lambda x: x['gold'], reverse=True)  
        
    return render_template('pages/index.html', countries = countries_sort)




@app.route('/calendario', methods=['POST', 'GET'])
def calendário():
    day = request.args.get('day', datetime.now().strftime('%Y-%m-%d'))
    disciplines = get_disciplines()
    actual = request.args.get('actual', 1)

    agenda, final_url, show_more = get_agenda(actual, day)
    
    
    
    if show_more:
        actual = casting_actual(final_url, day)
    agenda = time_to_saopaulo(agenda)

    show_next, show_previous, day_plus_one, day_minus_one = check_if_days_are_valid(day)


    context = {"agenda": agenda, "day_plus_one": day_plus_one, "day_minus_one": day_minus_one,
                "show_previous": show_previous, "show_next": show_next, "disciplines": disciplines, "actual": actual, "day":day,
                "show_more":show_more, "translations": TRANSLATIONS}

    return render_template('pages/agenda.html', **context)



@app.route('/agenda-modalidade', methods=['POST', 'GET'])
def calendario_filtrado():
    day = request.args.get('day', datetime.now().strftime('%Y-%m-%d')) 
    sport = request.args.get('sport')
    disciplines = get_disciplines()

    if request.method == 'POST':
        form_data = request.form.to_dict()
        if form_data.get('selecao_esporte'):
            sport = form_data.get('selecao_esporte')
            
        else:
            return redirect('calendario')

    show_next, show_previous, day_plus_one, day_minus_one = check_if_days_are_valid(day)

    actual = request.args.get('actual', 1)

    agenda, final_url, show_more = get_agenda(actual, day, sport)
    
    if show_more:
        actual = casting_actual(final_url, day)
    agenda = time_to_saopaulo(agenda)

    context = {"agenda": agenda, "day_plus_one": day_plus_one, "day_minus_one": day_minus_one,
            "show_previous": show_previous, "show_next": show_next, "sport": sport, "actual": actual, 
            "translations": TRANSLATIONS, "disciplines": disciplines}
    
    return render_template('pages/calendario_filtrado.html', **context, len=len)


@app.route('/resultados')
def resultados():
    day = request.args.get('day', '2024-07-27')
    disciplines = get_disciplines()
    actual = request.args.get('actual', 1)

    agenda, final_url, show_more = get_agenda(actual, day)
    
    if show_more:
        actual = casting_actual(final_url, day)
    agenda = time_to_saopaulo(agenda)

    show_next, show_previous, day_plus_one, day_minus_one = check_if_days_are_valid(day)

    context = {"agenda": agenda, "day_plus_one": day_plus_one, "day_minus_one": day_minus_one,
                "show_previous": show_previous, "show_next": show_next, "disciplines": disciplines, "actual": actual, "day":day,
                "show_more":show_more, "translations": TRANSLATIONS}
    return render_template('pages/resultados.html', **context)

@app.route('/resultados_filtrados', methods=['POST', 'GET'])
def resultados_filtrados():
    day = request.args.get('day', datetime.now().strftime('%Y-%m-%d')) 
    sport = request.args.get('sport')
    disciplines = get_disciplines()

    if request.method == 'POST':
        form_data = request.form.to_dict()
        if form_data.get('selecao_esporte'):
            sport = form_data.get('selecao_esporte')
            
        else:
            return redirect('resultados')

    show_next, show_previous, day_plus_one, day_minus_one = check_if_days_are_valid(day)

    actual = request.args.get('actual', 1)

    agenda, final_url, show_more = get_agenda(actual, day, sport)
    
    if show_more:
        actual = casting_actual(final_url, day)
    agenda = time_to_saopaulo(agenda)

    context = {"agenda": agenda, "day_plus_one": day_plus_one, "day_minus_one": day_minus_one,
            "show_previous": show_previous, "show_next": show_next, "sport": sport, "actual": actual, 
            "translations": TRANSLATIONS, "disciplines": disciplines}
    
    return render_template('pages/resultados_filtrados.html', **context, len=len)

@app.route('/historia')
def historia():
    response = requests.get(URL)
    countries = []
    if response.status_code == 200:
        data = response.json()
        for item in data['data']:
            if item['id'] == 'USA':
                usa_medals = item['total_medals']
                usa_gold_medals = item['gold_medals']
                break
        for item in data['data']:
            if item['id'] == 'BRA':
                br_medals = item['total_medals']
                br_gold_medals = item['gold_medals']
                print(br_gold_medals)
                break
    
    context = {"usa_medals": usa_medals, "usa_gold_medals": usa_gold_medals, "br_medals": br_medals, "br_gold_medals": br_gold_medals}

    return render_template('pages/historia.html',**context)
