# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render, redirect
from django.views.generic import TemplateView
from django.http import HttpResponse
from django.template import loader
from django.contrib.auth import login
from django.contrib.auth.models import User
from django.utils import timezone

from .forms import SellGearForm, UserCreate
from .models import BlogPost, GearPost

class Main(TemplateView):
    def get(self, request, **kwargs):
        return render(request, 'index.html', context=None)

def timeline(request):
    return render(request, 'timeline.html', {})

def blog(request):
    posts = BlogPost.objects.order_by('created_date').reverse()
    return render(request, 'blog.html', {
        'posts':posts
    })

def geartrade(request):
    gearposts = GearPost.objects.order_by('created_date')
    return render(request, 'geartrade/gearbuy.html', {
        'gearposts':gearposts
    })

def gearsell(request):
    if request.method == "POST":
        form = SellGearForm(request.POST)
        if form.is_valid():
            post = form.save(commit=False)
            post.author = request.user
            post.save()
            return redirect('/geartrade/buy', pk=post.pk)
    else:
        form = SellGearForm()
    return render(request, 'geartrade/gearsell.html', {'form': form})

# def login(request):
#     form = PostForm()
#     return render(request, 'timeline.html', {'form': form})

def signup(request):
    if request.method == "POST":
        userForm = UserCreate(request.POST)
        if userForm.is_valid():
            newUser = User.objects.create_user(**userForm.cleaned_data)
            login(request, newUser)

            return redirect('/')
    else:
        userForm = UserCreate()

    return render(request, 'signup.html', {'form': userForm})
