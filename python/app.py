#!/usr/bin/env python
import base64
from io import BytesIO

import face_recognition
import numpy as np
from flask import Flask, jsonify, request, json

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

app = Flask(__name__)


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/')
def index():
    return jsonify(test='test')


@app.route('/encoding', methods=['POST'])
def calculate_encoding():
    image = decode_image(request.form['file'])

    if not image:
        return '', 400

    picture = face_recognition.load_image_file(image)
    encoding = face_recognition.face_encodings(picture)[0].tolist()

    if not encoding:
        return '', 400

    return jsonify(encoding)


@app.route('/recognition', methods=['POST'])
def recognize_faces():
    face_encodings = json.loads(request.form['encodings'])

    if not face_encodings:
        return 'No encodings', 400

    image = decode_image(request.form['file'])

    if not image:
        return 'No file', 400

    picture = face_recognition.load_image_file(image)
    encodings_in_image = face_recognition.face_encodings(picture)

    result = np.zeros(len(face_encodings), dtype=bool)

    for encoding in encodings_in_image:
        matches = face_recognition.compare_faces(face_encodings, encoding)

        if True in matches:
            result[matches.index(True)] = True

    return jsonify(result.tolist())


def decode_image(encoded_string):
    # encoded_string = re.sub('^data:image/.+;base64,', '', encoded_string)
    image_string = base64.b64decode(encoded_string)

    return BytesIO(image_string)


if __name__ == "__main__":
    app.run(host='0.0.0.0')
