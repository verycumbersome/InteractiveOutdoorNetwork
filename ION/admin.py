# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from .models import BlogPost, GearPost, PhotoPost

admin.site.register(BlogPost)
admin.site.register(GearPost)
admin.site.register(PhotoPost)
