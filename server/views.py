from flask import Blueprint, render_template, request
import server.db
import json

views = Blueprint(__name__, "views")


@views.route("/")
def home():
    return render_template("start.html")

@views.route("/map")
def map_page():
    return render_template("map.html")

@views.route("/about_us")
def about_us_page():
    return render_template("about_us.html")

@views.route("/login")
def login_page():
    return render_template("login.html")

@views.route("/register")
def register_page():
    return render_template("register.html")


@views.route("/user/register", methods=["POST"])
def register():
    req = request.get_data()
    data = json.loads(req)

    username = data["username"]
    password = data["password"]

    return db.add_user(username, password)

@views.route("/user/login", methods=["GET"])
def login():
    data = request.args.to_dict()
    username = data["username"]
    password = data["password"]

    a = db.check_user(username, password)
    return a

@views.route("/user/verify", methods=["GET"])
def verify_user():
    data = request.args.to_dict()
    username = data["username"]

    return db.verify_user_db(username)

@views.route("/tasks/add", methods=["POST"])
def accept_task():
    req = request.get_data()
    data = json.loads(req)

    title = data["title"]
    description = data["description"]
    id = data["id"]
    location = data["location"]

    return db.add_task(title, description, id, location)

@views.route("/tasks/get", methods=["GET"])
def return_tasks():
    return db.get_tasks()

@views.route("/tasks/remove", methods=["POST"])
def remove_task():
    req = request.get_data()
    data = json.loads(req)

    return db.remove_task_db(data["title"], data["uid"])