## Volunteer app using :

1. AWS DynamodB, Amplify
2. React
3. Flask API 

# Create virtual environment :
-> python3 -m venv env

## After creating the environment, activate it by running :
#### For mac/unix users: 
-> source env/bin/activate

## Installing Flask
#### Now that you have your environment up and running, you can go ahead and install Flask

-> pip install flask

#### The next thing is to register the script in an environment file.

-> pip install python-dotenv

#### After successful installation, create the .flaskenv file in the backend directory created above.

-> touch .flaskenv

#### Please note that the preceding . is very important. If you name your file just flaskenv, any environment variable you'll put in it won't be read.

#### Now put your environment variables in the .flaskenv file:

-> FLASK_APP=base.py
-> FLASK_ENV=development

#### base.py
#### Create a new file base.py in the backend directory where the .flaskenv directory is also located.

-> touch base.py

#### Inside the base.py script create a simple API that returns your name and info about you:

from flask import Flask

api = Flask(__name__)

@api.route('/profile')
def my_profile():
    response_body = {
        "name": "Nagato",
        "about" :"Hello! I'm a full stack developer that loves python and javascript"
    }

    return response_body

## The backend has been successfully set up, you can test this by running your application.

-> flask run