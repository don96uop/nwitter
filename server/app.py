from flask import Flask

from movies import crawl

app = Flask(__name__) # __main__ 이거나 아니거나

@app.route("/api")
def hello_world():
    return crawl()
