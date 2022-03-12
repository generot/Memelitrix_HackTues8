from flask import Blueprint, render_template, request
import server.db as db
import json

views = Blueprint("views", "views")

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

@views.route("/user/profile")
def profile():
    return render_template("profile.html")

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

@views.route("/user/fetchAll", methods=["GET"])
def fetch_all_users():
    return db.fetch_users()

@views.route("/tasks/add", methods=["POST"])
def accept_task():
    req = request.get_data()
    data = json.loads(req)

    title = data["title"]
    description = data["description"]
    uid = data["uid"]
    location = data["location"]
    reward = data["reward"]
    taken_by = data["taken_by"]

    return db.add_task(title, description, uid, location, reward, taken_by)

@views.route("/tasks/get", methods=["GET"])
def return_tasks():
    return db.get_tasks()

@views.route("/tasks/accept", methods=["POST"])
def accept_task_user():
    req = request.get_data()
    data = json.loads(req)

    task_id = data["id"]
    uid = data["uid"]

    return db.accept_task_db(task_id, uid)

@views.route("/tasks/filter", methods=["GET"])
def return_filtered_tasks():
    data = request.args.to_dict()
    uid = data["uid"]

    return db.get_tasks({ "taken_by": uid })

@views.route("/tasks/remove", methods=["POST"])
def remove_task():
    req = request.get_data()
    data = json.loads(req)

    return db.remove_task_db(data["title"], data["uid"])

@views.route("/tasks/abandon", methods=["POST"])
def abandon_task():
    req = request.get_data()
    data = json.loads(req)

    return db.abandon_task(data["title"])

@views.route("/tasks/complete", methods=["POST"])
def complete_task():
    req = request.get_data()
    data = json.loads(req)

    return db.complete_task(data["title"])