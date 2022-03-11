import requests

URL = "http://127.0.0.1:5000/tasks/get"
PARAMS = {"title": "test", "description": "test", "uid": "1", "location": "test"}

r = requests.get(url = URL, params = PARAMS)

data = r.json()

print(data)
