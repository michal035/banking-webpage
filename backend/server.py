from flask import Flask, request, jsonify
import datetime
from flask_cors import CORS
import psycopg2
import json
import os


conn = psycopg2.connect(
    database=os.getenv("DATABASE_NAME"), user=os.getenv("DATABASE_USER"), password=os.getenv("POSTGRES_PASSWORD"), host='postgres', port='5432'
)

conn.autocommit = True
cursor = conn.cursor()


app = Flask(__name__)
CORS(app)


@app.route("/get/all", methods=["GET"])
def get():

    cursor.execute("SELECT * FROM accounts;")

    conn.commit()
    result = cursor.fetchall()

    return jsonify(result), 200


@app.route("/get/<username>/", methods=["GET"])
def get_u(username):

    return jsonify({"res": "ress"}), 200


@app.route('/create_user', methods=['POST'])
def create_user():
    return jsonify({'message': 'Failed to add user'}), 500


if __name__ == '__main__':
    app.run(app.run(host="0.0.0.0", port=5000))
