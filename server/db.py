import pymongo
import hashlib

uri = "mongodb+srv://Sasho:Rikoshet123321@ability.hsrp9.mongodb.net/Ability?retryWrites=true&w=majority"

def add_user(username, password):
    #connection
    client = pymongo.MongoClient(uri)
    db = client["data"]
    users = db["users"]

    #check if user exists
    for i in users.find({}):
        if i["name"] == username:
            return {"code": 200, "message": "User registered successfully"}

    #password hashing
    password = password.encode()
    salt = 32*b'\x00'
    password_hash = hashlib.pbkdf2_hmac('sha256', password, salt, 100000)

    print(password_hash)

    #insert user
    users.insert_one({'name': username, 'password': password_hash})

    return {"code": 400, "message": "User already exists"}

def check_user(username, password):
    #connection
    client = pymongo.MongoClient(uri)
    db = client["data"]
    users = db["users"]

    for i in users.find({}):
        if i["name"] == username:
            password = password.encode()
            salt = 32*b'\x00'
            password_hash = hashlib.pbkdf2_hmac('sha256', password, salt, 100000)

            if i["password"] == password_hash:
                return {"code": 200, "message": "User logged in successfully"}
            else:
                return {"code": 400, "message": "Wrong password"}
    
    return {"code": 400, "message": "User does not exist"}
