import pymongo
import hashlib

uri = "mongodb+srv://Sasho:Rikoshet123321@ability.hsrp9.mongodb.net/Ability?retryWrites=true&w=majority"

client = pymongo.MongoClient(uri)
db = client["data"]
users = db["users"]
ads = db["ads"]

uri_nasko = "mongodb+srv://Nakov:GolemataPatka@ability.hsrp9.mongodb.net/Ability?retryWrites=true&w=majority" 

#uri = uri_nasko

def add_user(username, password):
    #check if user exists
    for i in users.find({}):
        if i["name"] == username:
            return {"code": 400, "message": "User already exists"}

    #password hashing
    password = password.encode()
    salt = 32*b'\x00'
    password_hash = hashlib.pbkdf2_hmac('sha256', password, salt, 100000)

    print(password_hash)

    #insert user
    users.insert_one({'name': username, 'password': password_hash})

    return {"code": 200, "message": "User registered successfully"}

def check_user(username, password):
    for i in users.find({}):
        if i["name"] == username:
            password = password.encode()
            salt = 32*b'\x00'
            password_hash = hashlib.pbkdf2_hmac('sha256', password, salt, 100000)

            if i["password"] == password_hash:
                return {"code": 200, "message": "User logged in successfully", "username": i["name"], "id": str(i["_id"])}
            else:
                return {"code": 400, "message": "Username or password is incorrect"}
    
    return {"code": 400, "message": "Username or password is incorrect"}

def add_ad(title, description, username, location):
    pass
    #insert ad
    '''
    error = ads.insert_one({'title': title, 'description': description, 'username': username, "location": location})

    if(error is not None):
        return {"code": 400, "message": "Internal server error"}

    return {"code": 200, "message": "Ad added successfully"}
    '''

def get_ads():
    pass
    #get ads
    '''
    ads_list = []
    for i in ads.find({}):
        ads_list.append(i)

    if ads_list == []:
        return {"code": 400, "message": "No ads"}

    return {"code": 200, "message": "Ads retrieved successfully", "ads": ads_list}
    '''