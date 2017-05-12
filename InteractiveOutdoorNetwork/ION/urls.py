from django.conf.urls import url
from ION import views

urlpatterns = [
    url(r'^$', views.Main.as_view(), name='home'),
    url(r'^timeline/', views.timeline, name='timeline'),
    url(r'^login/', views.login, name='login'),
    url(r'^blog/', views.blog, name='blog'),
    url(r'^geartrade/buy', views.geartrade, name='gearbuy'),
    url(r'^geartrade/sell$', views.gearsell, name='gearsell'),
]
