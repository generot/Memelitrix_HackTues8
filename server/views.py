from flask import Blueprint, render_template, request
import db

views = Blueprint(__name__, "views")

@views.route("/")
def home():
    return render_template("login.html")

@views.route("/user/register", methods=["POST"])
def register():
    data = request.json
    username = data["username"]
    password = data["password"]

    if db.add_user(username, password):
        return {"code": 200, "message": "User registered successfully"}
    else:
        return {"code": 400, "message": "User already exists"}

@views.route("/user/login", methods=["GET"])
def login():
    pass