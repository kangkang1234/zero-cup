# -*- coding:utf-8 -*-
from django.conf.urls import url
from others import views
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    url(r'^home/$', views.home, name="home"),
    url(r'^home/signin/', views.signin, name="signin"),
    url(r'^home/getinfo/', views.GetInfo, name="getinfo"),
    url(r'^home/getstory/$', views.show_story, name="show_story"),
] 
