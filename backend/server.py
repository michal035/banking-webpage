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


@app.route("/login", methods=["GET"])
def get_user_information():

    data = request.get_json()
    name = data.get('username')

    cursor.execute(f"""SELECT account_id, owner,balance,interest_rate FROM accounts 
                   where owner = {name};""")
    conn.commit()

    user_data = cursor.fetchall()
    user_id = user_data[0][0]

    cursor.execute(f"""SELECT tr.amount FROM transactions tr
                   where account_id = {user_id};""")
    conn.commit()

    transaction_data = cursor.fetchall()

    return jsonify({"user_data": user_data, "transaction_history": transaction_data}), 200


if __name__ == '__main__':
    app.run(app.run(host="0.0.0.0", port=5000))
