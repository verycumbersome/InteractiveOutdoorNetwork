from django import forms

from .models import GearPost

class SellGearForm(forms.ModelForm):

    class Meta:
        model = GearPost
        fields = ('title', 'description',)
