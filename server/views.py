from flask import Blueprint, render_template, request
import db
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
    print(a)

    return a

@views.route("/profile/<id>")
def jobs_page():
    tasks = get_tasks()
    return render_template("profile.html", tasks = [1, 2, 3, 4, 5], jobs = [1, 2, 3])

@views.route("/ads/add")
def accept_task():
    req = request.get_data()
    data = json.loads(req)

    title = data["title"]
    description = data["description"]
    username = data["username"]
    location = data["location"]

    return add_ad(title, description, username, location)

@views.route("/ads")
def asdf():
    pass