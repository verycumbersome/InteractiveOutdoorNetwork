from django import forms
from django.contrib.auth.models import User

from .models import GearPost


class SellGearForm(forms.ModelForm):

    class Meta:
        model = GearPost
        fields = ('title', 'description', 'photo', 'price')

class UserCreate(forms.ModelForm):
    class Meta:
        model = User
        fields = ('username', 'email', 'password')
