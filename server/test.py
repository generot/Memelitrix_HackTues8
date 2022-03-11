import requests

URL = "http://127.0.0.1:5000/user/login"
PARAMS = {"username": "Sasho", "password": "123"}

r = requests.get(url = URL, params = PARAMS)\

data = r.json()
print(data)