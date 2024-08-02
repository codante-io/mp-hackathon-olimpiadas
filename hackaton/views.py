from flask import Flask, render_template, request, redirect, url_for, flash, session, send_from_directory
import json, requests
from main import app
from config import *


@app.route('/')
def filtro():
    requisicao = requests.get('https://apis.codante.io/olympic-games/disciplines')
    requisicao = requisicao.json()
    requisicao = requisicao['data']
    
    return render_template('filtro.html', requisicao=requisicao)


@app.route('/calendario-filtrado/', methods=['POST'])
def process_selection():
    form_data = request.form.to_dict()
    esporte = None
    dia = None
    try:
        esporte = form_data.get('selecao_esporte')
        dia = form_data.get('selecao_dia')

    except:
        pass
    
    requisicao = requests.get(f'https://apis.codante.io/olympic-games/events?date={dia}&discipline={esporte}')
    requisicao = requisicao.json()
    requisicao = requisicao['data']
    return render_template('calendario.html', requisicao=requisicao)






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
