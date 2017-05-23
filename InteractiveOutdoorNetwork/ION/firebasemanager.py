import pyrebase
from django.conf import settings

config = settings.CONFIG

firebase = pyrebase.initialize_app(config)

auth = firebase.auth()
db = firebase.database()
storage = firebase.storage()

def Store(img):
    storage.child("images/image.jpg").put("hiking2.jpg")
