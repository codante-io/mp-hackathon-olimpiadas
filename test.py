import requests

url = "https://apis.codante.io/olympic-games/countries"
response = requests.get(url)
# countries = []
# if response.status_code == 200:
#     try:
#         data = response.json()

#         for item in data['data']:
            
#             countries.append({'nome': item['name'], 'medalha': item['total_medals']})

#         countries_sort = sorted(countries, key=lambda x: x['medalha'], reverse=True)  
#         for country in countries_sort:
#             print(f'{country['nome']}: {country['medalha']}')
#     except ValueError as e:
#         print(f"Erro ao converter a resposta para JSON: {e}")
# else:
#     print(f"Erro ao acessar a API: {response.status_code}")

if response.status_code == 200:
    data = response.json()

    for item in data['data']:
        if item['id'] == 'BRA':
            print(item)