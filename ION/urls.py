from django.conf.urls import url, include
# from django.contrib.auth import views as auth_views
from django.contrib import admin
from ION import views

urlpatterns = [
    url(r'^$', views.Main.as_view(), name='home'),
    url(r'^timeline/', views.timeline, name='timeline'),
    url(r'^signup/', views.signup, name='signup'),
    url(r'^activities/', views.activities, name='activities'),
    url(r'^iopimages/', views.iopimages, name='iopimages'),
    url(r'^iopimages/sell', views.iopimagespost, name='iopimages'),
    url(r'^geartrade/buy', views.geartrade, name='gearbuy'),
    url(r'^geartrade/sell$', views.gearsell, name='gearsell'),
    url(r'^geartrade/item/(?P<item>[0-9]+)$', views.gearitem, name='gearitem'),
    url(r'^blog/$', views.blog, name='blog'),
    url(r'^blog/post/(?P<post>[0-9]+)$', views.blogpost, name='blogpost'),

]
