# -*- coding:utf-8 -*-
from django.conf.urls import url
from account import views

urlpatterns = [
    url(r'^$', views.login_view, name="loginview"),
    url(r'^reg_done/', views.regist, name="regist"),
    url(r'^sendcode/', views.sendcode, name="sendcode"),
#    url(r'^changepwd/', views.new_change_pwd, name='newchange'),
    url(r'^logindone/', views.Userlogin, name='login'),
    url(r'^judge/', views.is_reg, name="judge"),
    url(r'^logout/', views.log_out, name="logout"),
]
