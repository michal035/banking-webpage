from flask import Flask, request, jsonify
import datetime
from flask_cors import CORS
import psycopg2
from configparser import ConfigParser
import json

#Just a mock up - needs to be redone

"""
config = ConfigParser()
config.read("config.ini")

conn = psycopg2.connect(
    database=config["database"]["database_n"], user=config["database"]["user"], password=config["database"]["password"], host='127.0.0.1', port='5432'
)"""

conn.autocommit = True
cursor = conn.cursor()


app = Flask(__name__)
CORS(app)


@app.route("/get/all", methods=["GET"])
def get():

    if (parameter1 := request.args.get('num')):
        cursor.execute(
            f"SELECT * FROM  users ORDER BY RANDOM() LIMIT {parameter1};")
    else:
        cursor.execute(f"SELECT * FROM  users ORDER BY RANDOM() LIMIT 10;")

    conn.commit()
    result = cursor.fetchall()

    return jsonify(result), 200


@app.route("/get/<username>/", methods=["GET"])
def get_u(username):
    cursor.execute(
        f"SELECT * FROM  users WHERE first_name = '{username}' LIMIT 10;")
    conn.commit()
    result = cursor.fetchall()

    return jsonify(result), 200


@app.route('/create_user', methods=['POST'])
def create_user():

    try:
        data = request.get_json()

        first_name = data.get('first_name')
        last_name = data.get('last_name')
        age = data.get('age')

        if first_name == None or last_name == None or age == None:
            return jsonify({'message': "Insufficient user information"}), 401

        cursor.execute(
            f"INSERT INTO users (first_name, last_name, age) VALUES ('{first_name}', '{last_name}', {age});")
        conn.commit()

        return jsonify({'message': 'User created successfully'}), 201

    except:
        return jsonify({'message': 'Failed to add user'}), 500


if __name__ == '__main__':
    app.run()
