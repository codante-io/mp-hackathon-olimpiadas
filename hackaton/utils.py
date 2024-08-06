import requests
from datetime import datetime, timedelta
import pytz


FINAL_DAY = datetime(2024, 8, 11)

def get_disciplines(): #Retorna os esportes
    req = requests.get('https://apis.codante.io/olympic-games/disciplines')
    req = req.json()
    req = req['data']
    return req


def check_if_days_are_valid(day): #Verifica se os dias estão dentro do espaço de tempo das Olimpíadas
    day = datetime.strptime(day, '%Y-%m-%d')
    day_plus_one = day + timedelta(days=1)

    day_minus_one = day - timedelta(days=1)

    show_previous = day_minus_one.date() >= datetime.now().date()
    show_next = day_plus_one <= FINAL_DAY


    day_minus_one = day_minus_one.strftime('%Y-%m-%d')
    day_plus_one = day_plus_one.strftime('%Y-%m-%d')

    return show_next, show_previous, day_plus_one, day_minus_one


def get_agenda(actual, day, sport=None): #Pega a agenda de jogos de 5 em 5 requisições
    show_more = True
    url = f'https://apis.codante.io/olympic-games/events?page={actual}&date={day}'
    if sport:
        url = f'https://apis.codante.io/olympic-games/events?page={actual}&date={day}&discipline={sport}'
    req = requests.get(url)
    req = req.json()
    agenda = []
    total_pages = 0
    while url != None and total_pages<5:
        agenda.extend(game for game in req['data']) 
        req = requests.get(url)
        req = req.json()

        if req['links']['next'] != None:
            url = f"{req['links']['next']}&date={day}"
            if sport:
                url = f"{url}&discipline={sport}"
            total_pages +=1
        else:
            url = None
            show_more = False

    return agenda, url, show_more


def casting_actual(url, day): #Retira a última página em que foi feita requisição
    actual = url.replace('https://apis.codante.io/olympic-games/events?page=', '')
    actual = actual.replace(f'&date={day}', '')
    actual = int(actual)
    return actual


def time_to_saopaulo(agenda): #Converte os horários do fuso de Paris para o de São Paulo
    destination_timezone = pytz.timezone('America/Sao_Paulo')
    for event in agenda:
            try:
                original_dt = datetime.fromisoformat(event['start_date'])

                localized_dt = original_dt.astimezone(destination_timezone)

                event['start_date'] = localized_dt.strftime('%Y-%m-%d %H:%M:%S')

            except (ValueError, TypeError):
               pass
    return agenda

