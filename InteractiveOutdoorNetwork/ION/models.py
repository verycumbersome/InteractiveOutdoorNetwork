# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django_markdown.models import MarkdownField
from django.db import models
from django.utils import timezone
import firebasemanager

class BlogPost(models.Model):
    author = models.ForeignKey('auth.User')
    title = models.CharField(max_length=200)
    text = models.TextField(max_length=2500)
    created_date = models.DateTimeField(
            default=timezone.now)
    published_date = models.DateTimeField(
            blank=True, null=True)

    def publish(self):
        self.published_date = timezone.now()
        self.save()

    def __str__(self):
        return self.title

class GearPost(models.Model):
    author = models.ForeignKey('auth.User')
    title = models.CharField(max_length=200)
    description = models.TextField(max_length=1000)
    photo = models.ImageField(upload_to='gearimages/')
    created_date = models.DateTimeField(default=timezone.now)

    # print photo.name
    # firebasemanager.Store(photo)

    def __str__(self):
        return self.title
