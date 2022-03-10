from audioop import add
import os
import pymongo
import hashlib

def add_user(username, password):
    #connection
    client = pymongo.MongoClient("mongodb+srv://Sasho:Rikoshet123321@ability.hsrp9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
    db = client["data"]
    users = db["users"]

    #check if user exists
    for i in users.find({}):
        if i["name"] == username:
            return False

    #password hashing
    password = password.encode()
    salt = os.urandom(32)
    password_hash = hashlib.pbkdf2_hmac('sha256', password, salt, 100000)

    #insert user
    users.insert_one({'name': username, 'password': password_hash})

    return True

print(add_user("asdf", "123"))