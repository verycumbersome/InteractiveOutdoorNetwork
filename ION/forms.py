from django import forms
from django.contrib.auth.models import User

from .models import GearPost, PhotoPost


class SellGearForm(forms.ModelForm):
    class Meta:
        model = GearPost
        fields = ('title', 'description', 'photo', 'price')


class IOPimagesForm(forms.ModelForm):
    class Meta:
        model = PhotoPost
        fields = ('title', 'photo')


class UserCreate(forms.ModelForm):
    class Meta:
        model = User
        fields = ('username', 'email', 'password')
