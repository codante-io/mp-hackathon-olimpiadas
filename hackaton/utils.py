import requests
from datetime import datetime, timedelta
import pytz


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


def get_agenda(actual, day):
    show_more = True
    url = f'https://apis.codante.io/olympic-games/events?page={actual}&date={day}'
    req = requests.get(url)
    req = req.json()
    agenda = []
    total_pages = 0
    while url != None and total_pages<5:
        agenda.extend([game for game in req['data']]) #Pega todos os jogos
        req = requests.get(url)
        req = req.json()

        if req['links']['next'] != None:
            url = f"{req['links']['next']}&date={day}"
            total_pages +=1
        else:
            url = None
            show_more = False

    return agenda, url, show_more


def casting_actual(url, day):
    actual = url.replace('https://apis.codante.io/olympic-games/events?page=', '')
    actual = actual.replace(f'&date={day}', '')
    actual = int(actual)
    return actual


def time_to_saopaulo(agenda):
    destination_timezone = pytz.timezone('America/Sao_Paulo')
    for event in agenda:
            try:
                # Converte a string para datetime com o fuso horário original
                original_dt = datetime.fromisoformat(event['start_date'])

                # Converte para o fuso horário de destino
                localized_dt = original_dt.astimezone(destination_timezone)

                # Formata a data no formato desejado
                event['start_date'] = localized_dt.strftime('%Y-%m-%d %H:%M:%S')

            except (ValueError, TypeError):
               pass
    return agenda