import requests
from datetime import datetime, timedelta


FINAL_DAY = datetime(2024, 8, 11)

def get_disciplines():
    req = requests.get('https://apis.codante.io/olympic-games/disciplines')
    req = req.json()
    req = req['data']
    return req


def check_if_days_are_valid(day):
    day = datetime.strptime(day, '%Y-%m-%d')
    day_plus_one = day + timedelta(days=1)

    day_minus_one = day - timedelta(days=1)

    show_previous = day_minus_one.date() >= datetime.now().date()
    show_next = day_plus_one <= FINAL_DAY


    day_minus_one = day_minus_one.strftime('%Y-%m-%d')
    day_plus_one = day_plus_one.strftime('%Y-%m-%d')

    return show_next, show_previous, day_plus_one, day_minus_one
