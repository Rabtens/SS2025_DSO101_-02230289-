from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello():
    return "Hello from a simple Dockerized Flask app!"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
# To run this Flask app, you can use the following command:
# docker run -p 5000:5000 <your_image_name>
# Make sure to replace <your_image_name> with the actual name of your Docker image.
# This will map port 5000 of the container to port 5000 of your host machine.
# You can then access the app by navigating to http://localhost:5000 in your web browser.
# This is a simple Flask application that returns a greeting message.
# It is designed to be run inside a Docker container.
# The app listens on all interfaces 