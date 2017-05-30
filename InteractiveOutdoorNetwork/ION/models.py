# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django_markdown.models import MarkdownField
from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

import uuid
import firebasemanager

class BlogPost(models.Model):
    author = models.ForeignKey('auth.User')
    title = models.CharField(max_length=200)
    text = models.TextField(max_length=2500)
    created_date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.title

class GearPost(models.Model):
    user = models.OneToOneField(User)
    title = models.CharField(max_length=50)
    description = models.TextField(max_length=1000)
    photo = models.ImageField(upload_to='gearimages/', default='/ION/static/images/imgnotfound.png')
    price = models.IntegerField(default=0)
    created_date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.title

    def delete(self, *args, **kwargs):
        os.rmdir(os.path.join(settings.MEDIA_ROOT, self.docfile.name))
        super(Document,self).delete(*args,**kwargs)

class PhotoPost(models.Model):
    title = models.CharField(max_length=50)
    photo = models.ImageField(upload_to='IOPimages/')
    created_date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.title
