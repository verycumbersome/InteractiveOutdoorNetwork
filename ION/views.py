# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render, redirect
from django.views.generic import TemplateView
from django.contrib.auth import login
from django.contrib.auth.models import User
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from .forms import SellGearForm, UserCreate, IOPimagesForm
from .models import BlogPost, GearPost, PhotoPost


class Main(TemplateView):
    def get(self, request, **kwargs):
        return render(request, 'index.html', context=None)


def timeline(request):
    return render(request, 'timeline.html', {})


def activities(request):
    return render(request, 'activities/activities.html')


def iopimages(request):
    photos = PhotoPost.objects.order_by('created_date').reverse()
    page = request.GET.get('page', 1)

    paginator = Paginator(photos, 6)
    try:
        photo_list = paginator.page(page)
    except PageNotAnInteger:
        photo_list = paginator.page(1)
    except EmptyPage:
        photo_list = paginator.page(paginator.num_pages)

    return render(request, 'IOPimages/iopimages.html', {'photo_list': photo_list})


def iopimagespost(request):
    if request.method == "POST":
        form = IOPimagesForm(request.POST, request.FILES)
        if form.is_valid():
            post = form.save(commit=False)
            post.user = request.user
            post.save()

            return redirect('/iopimages/', pk=post.pk)
    else:
        form = IOPimagesForm()

        return render(request, 'IOPimages/iopimages_post.html', {'form': form})


def blog(request):
    posts = BlogPost.objects.order_by('created_date').reverse()

    page = request.GET.get('page', 1)

    paginator = Paginator(posts, 3)
    try:
        blog_posts = paginator.page(page)
    except PageNotAnInteger:
        blog_posts = paginator.page(1)
    except EmptyPage:
        blog_posts = paginator.page(paginator.num_pages)

    return render(request, 'blog.html', {
        'blog_posts': blog_posts
    })


def blogpost(request, post):
    if BlogPost.objects.filter(id=post):
        blogpost = BlogPost.objects.filter(id=post).get()
    else:
        return render(request, '404.html', {'blogpost': blogpost})

    return render(request, 'blog/post.html', {'blogpost': blogpost})


def geartrade(request):
    gear_posts = GearPost.objects.order_by('created_date').reverse()

    cur_user = None
    if request.user.is_authenticated():
        cur_user = str(request.user.username)

    page = request.GET.get('page', 1)

    paginator = Paginator(gear_posts, 6)
    try:
        gearposts = paginator.page(page)
    except PageNotAnInteger:
        gearposts = paginator.page(1)
    except EmptyPage:
        gearposts = paginator.page(paginator.num_pages)

    return render(request, 'geartrade/gearbuy.html', {'gearposts': gearposts, 'currentuser': cur_user})


def gearsell(request):
    if request.method == "POST":
        form = SellGearForm(request.POST, request.FILES)
        if form.is_valid():
            post = form.save(commit=False)
            post.user = request.user
            post.save()

            return redirect('/geartrade/buy', pk=post.pk)
    else:
        form = SellGearForm()

    return render(request, 'geartrade/gearsell.html', {'form': form})


def gearitem(request, item):
    if GearPost.objects.filter(id=item):
        gearitem = GearPost.objects.filter(id=item).get()
    else:
        # print 'item not found'

    return render(request, 'geartrade/gearitem.html', {'gearitem': gearitem})


def signup(request):
    if request.method == "POST":
        userForm = UserCreate(request.POST)
        if userForm.is_valid():
            newUser = User.objects.create_user(**userForm.cleaned_data)
            login(request, newUser)

            return redirect('/')
    else:
        userForm = UserCreate()

    return render(request, 'registration/signup.html', {'form': userForm})
