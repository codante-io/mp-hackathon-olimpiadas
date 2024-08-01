from flask import Flask, render_template, request, redirect, url_for, flash, session, send_from_directory
from main import app
@app.route('/')
def home():
    return render_template('index.html')