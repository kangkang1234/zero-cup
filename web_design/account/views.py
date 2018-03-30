# -*- coding:utf-8 -*-
from django.shortcuts import render, reverse, get_object_or_404
from django.http import HttpResponse, Http404
from django.http import HttpResponseRedirect
from .models import Acco
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from .message import send_sms
from django.utils import timezone
# Create your views here.
import random
import uuid
import json


# 发送验证码
def sendcode(request):
    chars = '0123456789'
    code = ''
    for i in range(0, 6):
        code += chars[random.randrange(0, len(chars))]

    request.session['verifycode'] = code
    request.session.set_expiry(300)
    try:
       # coded = request.session.get('verifycode')
        phonenumber = request.POST['tel']
        business_id = uuid.uuid1()
        params = {"code": code, "prodect": "用户注册"}
        params = json.dumps(params)
        send_sms(business_id, phonenumber, "洛斯罗瑞安", "SMS_107095085", params)
        return HttpResponse(json.dumps("1"), content_type='application/json')
    except:
        return HttpResponse(json.dumps("0"), content_type='application/json')


# 注册
def regist(request):
    username = request.POST['tel']
    password = request.POST['password']
    vcode = request.POST['idCode']
    try:
        verify_code = request.session['verifycode']
    except:
        return HttpResponse("验证码已失效，请重新发送")

    if vcode == verify_code:
        user = Acco.objects.create_user(username=username, password=password, first_name=username)
        user.save()
        #login(request, user)
        del request.session['verifycode']
        #return HttpResponseRedirect(reverse("user:loginview"))
        return HttpResponse(json.dumps("1"), content_type='application/json')
    else:
        return HttpResponse(json.dumps("0"), content_type='application/json')


# 判断用户名是否已注册
def is_reg(request):
    username = request.POST['tel']
    user = Acco.objects.filter(username=username)
    if user:
        return HttpResponse(json.dumps("1"), content_type='application/json')
    else:
        return HttpResponse("未存在")


# 账号密码登录
def Userlogin(request):
    username = request.POST['username']
    password = request.POST['password']
    users = Acco.objects.filter(username=username)
    if users:
        user = authenticate(username=username, password=password)
        if user:
            login(request, user)
            return HttpResponse(json.dumps("1"), content_type='application/json')
        else:
            return HttpResponse(json.dumps("0"), content_type="application/json")
    else:
        return HttpResponse(json.dumps("err"), content_type="application/json")


# 登录界面
def login_view(request):
    return render(request, 'account/home.html')


# 新注册用户更改默认密码
# @login_required
# def new_change_pwd(request):
#     if request.method == "POST":
#         user = request.user
#         username = user.username
#         password = request.POST['password']
#         try:
#             users = Acco.objects.get(username=username)
#             users.set_password(password)
#             users.save()
#             user = authenticate(username=username, password=password)
#             login(request, user)
#             return HttpResponseRedirect(reverse("others:home"))
#         except Acco.DoesNotExist:
#             raise Http404
#     else:
#         return render(request, 'account/changepwd.html')


# 老用户更改密码
# @login_required
# def change_pwd(request):
#     password = request.POST['password']
#     vcode = request.POST['vcode']
#     verify_code = request.session.get('verifycode')
#     if vcode == verify_code:
#         user = Acco.objects.get(username=request.user.username)
#         user.set_password(password)
#         user.save()
#         login(request, user)
#         return HttpResponse("修改成功")
#     else:
#         return HttpResponse("验证码错误")


# 更改个人信息
# @login_required
# def change_info(request):
#     username = request.user.username
#     acco = get_object_or_404(Acco, username=username)
#
#     intro = acco.intro
#     if request.method == "POST":
#         new_intro = request.POST['intro']
#         acco.intro = new_intro
#         acco.save()
#         return HttpResponse("修改成功")
#     else:
#         return render(request, '', {'intro': intro})
#

# 登出
@login_required
def log_out(request):
    logout(request)
    return HttpResponseRedirect(reverse("user:loginview"))
