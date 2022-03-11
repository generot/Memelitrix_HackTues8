from flask import Blueprint, render_template, request
import db

views = Blueprint(__name__, "views")

@views.route("/")
def home():
    return render_template("start.html")

@views.route("/login")
def login_page():
    return render_template("login.html")


@views.route("/user/register", methods=["POST"])
def register():
    data = request.json
    username = data["username"]
    password = data["password"]

    return db.add_user(username, password)

@views.route("/user/login", methods=["GET"])
def login():
    data = request.args.to_dict()
    username = data["username"]
    password = data["password"]

    a = db.check_user(username, password)
    print(a)

    return a

@views.route("/ads/add")
def add_ad():
    pass

@views.route("/ads")
def asdf():
    pass