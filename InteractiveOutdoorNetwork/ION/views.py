# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.views.generic import TemplateView
from django.http import HttpResponse
from django.template import loader

class Main(TemplateView):
    def get(self, request, **kwargs):
        return render(request, 'index.html', context=None)

    # def index(request):
    #     template = loader.get_template('base.html')
    #     return HttpResponse(template.render())

def timeline(request):
    return render(request, 'timeline.html', {})
