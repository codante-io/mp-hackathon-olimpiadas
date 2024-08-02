from flask import Flask, render_template, request, redirect, url_for, flash, session, send_from_directory
import json, requests
from main import app
from config import *

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
