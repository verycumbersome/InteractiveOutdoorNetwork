from django.conf.urls import url
from ION import views

urlpatterns = [
    url(r'^$', views.Main.as_view()),
    url(r'^timeline/', views.timeline)
]
# from django.conf.urls import include, url
# from django.contrib import admin
# from django.contrib.auth import views as auth_views
#
# from . import views
#
# urlpatterns = [
#     url(r'^$', views.index, name='index'),
#     url(r'^polls/', include('polls.urls')),
#     url(r'^login/$', auth_views.login, name='login'),
#     url(r'^logout/$', auth_views.logout, name='logout'),
#     url(r'^admin/', admin.site.urls),
# ]
