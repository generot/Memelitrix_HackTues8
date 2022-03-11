from email import message
import json
import os
from flask import Flask, request, jsonify, render_template

temp_dir = os.path.abspath("../client/html")
stat_dir = os.path.abspath("../client/static")

app = Flask(__name__, template_folder=temp_dir, static_folder=stat_dir)

@app.route("/")
def root():
    return render_template("index.html")

#IMPORTANT: The client-side code has to be uploaded 
#to the server before making GET requests, zaradi
#shibanija CORS.
@app.route("/testGet")
def get_smth():
    return {
        "name": "Gejcho",
        "age": "12",
        "message": "success"
    }

@app.route("/testPost", methods=["POST"])
def post_smth():
    req = request.get_data(as_text=True)
    dc = json.loads(req)

    print(dc)

    return "OK"

app.run()