#!/usr/bin/env python
import face_recognition as face
from flask import Flask, jsonify, request

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

app = Flask(__name__)


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/encoding', methods=['POST'])
def calculate_encoding():
    file = get_file(request)

    if not file:
        return 400

    picture = face.load_image_file(file)
    encoding = face.face_encodings(picture)[0].tolist()

    return jsonify(encoding), 200 if encoding else 400


@app.route('/recognition', methods=['POST'])
def recognize_faces():
    face_encodings = request.json

    if not face_encodings:
        return 400

    file = get_file(request)

    if not file:
        return 400

    image = face_recognition.load_image_file(file)
    encodings_in_image = face_recognition.face_encodings(image)

    match_results = face.compare_faces(face_encodings, encodings_in_image)

    return jsonify(match_results), 200 if match_results else 400


def get_file(req: request):
    if 'file' not in req.files:
        return None

    file = req.files['file']

    if file.filename == '':
        return None

    if file and allowed_file(file.filename):
        return file


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
