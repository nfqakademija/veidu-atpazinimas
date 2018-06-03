#!/usr/bin/env python
import base64
import re
from io import BytesIO

import face_recognition
import numpy as np
from PIL import Image
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
    image_file = request.files.get('image') or request.form.get('image')

    if type(image_file) is str:
        try:
            image_file = decode_image(image_file)
        except TypeError:
            image_file = None

    if not image_file:
        return "Image not found", 400

    picture = face_recognition.load_image_file(image_file)
    encoding = face_recognition.face_encodings(picture)

    encoding = encoding and encoding[0].tolist()

    return jsonify(encoding)


@app.route('/recognition', methods=['POST'])
def recognize_faces():
    image_file = request.files.get('image') or request.form.get('image')

    if type(image_file) is str:
        try:
            image_file = decode_image(image_file)
        except TypeError:
            image_file = None

    if not image_file:
        return "Image not found", 400

    face_encodings = json.loads(request.form['encodings'])

    image = face_recognition.load_image_file(image_file)
    face_locations = face_recognition.face_locations(image)
    encodings_in_image = face_recognition.face_encodings(image, face_locations)

    result = np.zeros(len(face_encodings), dtype=bool)
    unknown_faces = []

    for (top, right, bottom, left), encoding in zip(face_locations, encodings_in_image):
        matches = face_recognition.compare_faces(face_encodings, encoding)

        if True in matches:
            result[matches.index(True)] = True
        else:
            face_image = image[top:bottom, left:right]
            pil_image = Image.fromarray(face_image)

            unknown_faces.append({
                'face': encode_image(pil_image),
                'encoding': encoding.tolist()
            })

    return jsonify(recognized=result.tolist(), unknown=unknown_faces)


def decode_image(encoded_string: str) -> BytesIO:
    encoded_string = re.sub('^data:image/.+;base64,', '', encoded_string)
    image_string = base64.b64decode(encoded_string)

    return BytesIO(image_string)


def encode_image(image: Image) -> str:
    buffered = BytesIO()
    image.save(buffered, format='PNG')

    encoded_string = base64.b64encode(buffered.getvalue())

    return encoded_string.decode('ascii')


if __name__ == "__main__":
    app.run(host='0.0.0.0')
