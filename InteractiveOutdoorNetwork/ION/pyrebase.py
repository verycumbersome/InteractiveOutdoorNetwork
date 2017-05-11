import pyrebase
from django.conf import settings

config = settings.CONFIG

firebase = pyrebase.initialize_app(config)
