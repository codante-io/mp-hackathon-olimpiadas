import requests
from datetime import datetime

#requisicao = requests.get('https://apis.codante.io/olympic-games/countries')

#requisicao = requisicao.json()

formatted_date = datetime.now().strftime('%Y-%m-%d')

#url = 'https://apis.codante.io/olympic-games/events/13625'

#requisicao = requests.get(url)
#requisicao =  requisicao.json()

#print(requisicao)

url = f'https://apis.codante.io/olympic-games/countries'
req = requests.get(url)
req = req.json()

print(req)

#for i in requisicao['links']:
    
#url = f'https://apis.codante.io/olympic-games/events?page=27&date={formatted_date}'
#req = requests.get(url)
#req = req.json()

#print(req['links'])
#print(req['data'][0])
#print(req.keys())



#for i in requisicao['data']:
#    print(f"{i['rank']} - {i['name']} - Ouro: {i['gold_medals']} | Prata: {i['silver_medals']} | Bronze: {i['bronze_medals']}")





{% for competitor in item['competitors'] %}
                                {%if loop.index == 1%}
                                    {%set competitors_list = competitors_list.append(competitor['competitor_name'] + ' ' + competitor['result_mark'] + ' X ')%}
                                {% else %}
                                    {%set competitors_list = competitors_list.append(competitor['result_mark'] + ' ' + competitor['competitor_name'] )%}
                                {%endif%}
                            {% endfor %}