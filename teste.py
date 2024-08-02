import requests
from datetime import datetime

#requisicao = requests.get('https://apis.codante.io/olympic-games/countries')

#requisicao = requisicao.json()

formatted_date = datetime.now().strftime('%Y-%m-%d')

url = 'https://apis.codante.io/olympic-games/events/13625'

requisicao = requests.get(url)
requisicao =  requisicao.json()

print(requisicao)



#for i in requisicao['links']:
    
    







#for i in requisicao['data']:
#    print(f"{i['rank']} - {i['name']} - Ouro: {i['gold_medals']} | Prata: {i['silver_medals']} | Bronze: {i['bronze_medals']}")