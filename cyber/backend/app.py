from flask import Flask, request, jsonify
from flask_cors import CORS
import re

app = Flask(__name__)
CORS(app)  # Allow requests from any origin

def evaluate_strength(password):
    score = 0
    if len(password) >= 8:
        score += 1
    if re.search(r"[A-Z]", password):
        score += 1
    if re.search(r"[0-9]", password):
        score += 1
    if re.search(r"[^A-Za-z0-9]", password):
        score += 1

    if score <= 1:
        return "Weak"
    elif score == 2:
        return "Medium"
    else:
        return "Strong"

@app.route('/check-strength', methods=['POST'])
def check_strength():
    data = request.get_json()
    password = data.get("password", "")
    strength = evaluate_strength(password)
    return jsonify({"strength": strength})

if __name__ == '__main__':
    app.run(debug=True)
