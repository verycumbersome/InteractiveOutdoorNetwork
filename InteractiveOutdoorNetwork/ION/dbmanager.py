import pyrebase
from django.conf import settings

config = settings.CONFIG

firebase = pyrebase.initialize_app(config)

def Store(img):
    storageRef = firebase.storage()
    storageRef.child("images/image.jpg").put(img.name)
