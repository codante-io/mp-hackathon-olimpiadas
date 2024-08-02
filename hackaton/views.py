from flask import Flask, render_template, request, redirect, url_for, flash, session, send_from_directory
import json, requests
from main import app
from config import *

@app.route('/')
def home(): 
    response = requests.get(URL)
    countries = []
    if response.status_code == 200:
        data = response.json()

        for item in data['data']:
            
            countries.append({'nome': item['name'], 'medalha': item['total_medals']})

            countries_sort = sorted(countries, key=lambda x: x['medalha'], reverse=True)  

    return render_template('index.html', countries = countries_sort)