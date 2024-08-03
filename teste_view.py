import requests
from datetime import datetime


day = datetime.now().strftime('%Y-%m-%d')


url = f'https://apis.codante.io/olympic-games/events?date={day}'

req = requests.get(url)
req = req.json()

last_page = req['links']['last']
last_page = last_page.replace('https://apis.codante.io/olympic-games/events?page=', '')
last_page = int(last_page)
actual = 1
total_pages = 0
url = f'https://apis.codante.io/olympic-games/events?page={actual}date={day}'






agenda, final_url = get_agenda(actual)

actual = final_url.replace('https://apis.codante.io/olympic-games/events?page=', '')
actual = actual.replace(f'&date={day}', '')
actual = int(actual)


agenda, final_url = get_agenda(actual)

actual = final_url.replace('https://apis.codante.io/olympic-games/events?page=', '')
actual = actual.replace(f'&date={day}', '')
actual = int(actual)

agenda, final_url = get_agenda(actual)
actual = final_url.replace('https://apis.codante.io/olympic-games/events?page=', '')
actual = actual.replace(f'&date={day}', '')
actual = int(actual)
