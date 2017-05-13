# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
# from django_markdown.admin import MarkdownModelAdmin
from .models import BlogPost
from .models import GearPost

admin.site.register(BlogPost)
admin.site.register(GearPost)
