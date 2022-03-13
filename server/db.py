import pymongo
import hashlib
import os
from bson import ObjectId
from dotenv import load_dotenv

load_dotenv()
uri = os.environ["MONGODB_URI"]

client = pymongo.MongoClient(uri)
db = client["data"]
users = db["users"]
ads = db["ads"]

def add_user(username, password):
    #check if user exists
    for i in users.find({}):
        if i["name"] == username:
            return {"code": 400, "message": "User already exists"}

    #password hashing
    password = password.encode()
    salt = 32*b'\x00'
    password_hash = hashlib.pbkdf2_hmac('sha256', password, salt, 100000)

    #insert user
    users.insert_one({'name': username, 'password': password_hash, 'points': 0})

    return {"code": 200, "message": "User registered successfully"}

def check_user(username, password):
    for i in users.find({}):
        if i["name"] == username:
            password = password.encode()
            salt = 32*b'\x00'
            password_hash = hashlib.pbkdf2_hmac('sha256', password, salt, 100000)

            if i["password"] == password_hash:
                return {"code": 200, "message": "User logged in successfully", "username": i["name"], "id": str(i["_id"]), "points": i["points"]}
            else:
                return {"code": 400, "message": "Username or password is incorrect"}
    
    return {"code": 400, "message": "Username or password is incorrect"}

def fetch_users():
    cursor = users.find({})
    all_users = []

    for i in cursor:
        i["_id"] = None
        i["password"] = None
        all_users.append(i)
        

    return {"code": 200, "message": "STATUS OK", "users": all_users}


def verify_user_db(username):
    schema = {"name": username}
    user = users.find_one(schema)

    if user:
        return {"code": 200, "message": "STATUS OK", "exists": True, "points": user["points"]}

    return {"code": 200, "message": "STATUS OK", "exists": False}

def add_task(title, description, id, location, reward, taken_by):
    #insert ad
    res = ads.find_one({"title": title})
    if res:
        return {"code": 304, "message": "Task with the same title already exists."}
        
    ads.insert_one({'title': title, 'description': description, 'uid': id, 'location': location, 'reward': reward, 'taken_by': taken_by})

    ad_obj = dict(ads.find_one({'title': title, 'uid': id}))

    ad_id = str(ad_obj["_id"])
    ad_obj["id"] = ad_id
    ad_obj["_id"] = None

    print(ad_obj)
    return {"code": 200, "message": "Ad added successfully", "adObject": dict(ad_obj)}

def accept_task_db(task_id, uid):
    res = ads.update_one({"_id": ObjectId(task_id)}, {"$set": {"taken_by": uid}})
    
    if res.acknowledged == False:
        return {"code": 400, "message": "Task not accepted."}

    return {"code": 200, "message": "Task accepted."}

def get_tasks(filter = {}):
    #get ads
    ads_list = []
    cursor = ads.find(filter)

    for i in cursor:
        i["id"] = str(i["_id"])
        i["_id"] = None

        ads_list.append(i)

    if ads_list == []:
        return {"code": 400, "message": "No ads"}

    return {"code": 200, "message": "Ads retrieved successfully", "ads": ads_list}

def remove_task_db(title, uid):
    schema = {"title": title, "uid": uid}
    ads.delete_many(schema)

    return {"code": 200, "message": "STATUS OK"}

def abandon_task(title):
    #find ad
    res = ads.update_one({"title": title}, {"$set": {"taken_by": ""}})

    return {"code": 200, "message": "STATUS OK"}

def complete_task(title):
    #find ad
    ad = ads.find_one({"title": title})

    user = users.find_one({"_id": ObjectId(ad["taken_by"])})
    user["points"] += 1
    users.update_one({"_id": user["_id"]}, {"$set": {"points": user["points"]}})

    remove_task_db(title, ad["uid"])

    return {"code": 200, "message": "STATUS OK"}
