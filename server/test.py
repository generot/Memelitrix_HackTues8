import requests
from pymongo import *

client = MongoClient("URI HERE")
db = client["data"]
ads = db["ads"]

def check_req():
    URL = "http://127.0.0.1:5000/tasks/get"
    PARAMS = {"title": "test", "description": "test", "uid": "1", "location": "test"}

    r = requests.get(url = URL, params = PARAMS)

    data = r.json()

    print(data)

def cascade_insert():
    ads.update_many({}, {"$set": {"reward": 0, "taken_by": ""}})
        
