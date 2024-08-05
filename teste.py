import requests
from datetime import datetime

#requisicao = requests.get('https://apis.codante.io/olympic-games/countries')

#requisicao = requisicao.json()

formatted_date = datetime.now().strftime('%Y-%m-%d')

#url = 'https://apis.codante.io/olympic-games/events/13625'

#requisicao = requests.get(url)
#requisicao =  requisicao.json()

#print(requisicao)

# url = f'https://apis.codante.io/olympic-games/disciplines'
# req = requests.get(url)
# req = req.json()

# for i in req['data']:
#     print(i['name'])

#for i in requisicao['links']:
    
#url = f'https://apis.codante.io/olympic-games/events?page=27&date={formatted_date}'
#req = requests.get(url)
#req = req.json()

#print(req['links'])
#print(req['data'][0])
#print(req.keys())



#for i in requisicao['data']:
#    print(f"{i['rank']} - {i['name']} - Ouro: {i['gold_medals']} | Prata: {i['silver_medals']} | Bronze: {i['bronze_medals']}")

def get_agenda(actual, day, sport=None):
    show_more = True
    url = f'https://apis.codante.io/olympic-games/events?page={actual}&date={day}'
    if sport:
        url = f'https://apis.codante.io/olympic-games/events?page={actual}&date={day}&discipline={sport}'
    req = requests.get(url)
    req = req.json()
    agenda = []
    total_pages = 0
    while url != None and total_pages<5:
        for game in req['data']:
            for competitor in game['competitors']:
                if len(competitor) > 2:
                    competitor['competitors_name'] = 'Quali'
        agenda.extend(req['data']) #Pega todos os jogos
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
