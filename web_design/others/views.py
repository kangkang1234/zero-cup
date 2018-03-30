# -*- coding:utf-8 -*-
from django.shortcuts import render, reverse, get_object_or_404
from .models import Images, Story, Album, Message
from django.http import HttpResponse, Http404, HttpResponseRedirect, JsonResponse
# Create your views here.
from django.contrib.auth.decorators import login_required
from account.models import Acco, Notice, Application
from django.utils import timezone
from django.forms.models import model_to_dict
import json
# import datetime


def show_story(request):
    storyid = request.POST['blogId']
    print(storyid)
    now_story = Story.objects.get(id=storyid)
    data = info(now_story.author)
    data[2] = ""
    return JsonResponse(data=data, safe=False)


def info(user):
    images = Images.objects.filter(author=user).order_by('-created')[:2]
    stories = Story.objects.filter(author=user).order_by('-pub_date')[:2]
    friend_story = find_new_dynamics(user.username)
    friend_sto = []
    for i in friend_story:
        friend_sto.append({'id': i.id, 'title': i.title, 'passage': i.content})
    myblog = []
    for i in stories:
        myblog.append({'title': i.title, 'passage': i.content})
    img = []
    for x in images:
        img.append('/media/' + str(x.img))
    data = []
    data.append({'nickName': user.username})
    data.append({'sidebarImg': img})
    data.append({'allBlog': friend_sto})
    data.append({'myBlog': myblog})
    return data

def GetInfo(request):
    if request.method == 'GET':
        now_username = request.user.username
        user = Acco.objects.get(username=now_username)

	#    print(user.first_name)
	#    albums = Album.objects.filter(author=user)
        data = info(user)
	 #   data.append(signin(now_username))
	#    print(json.dumps(data))
	#    return JsonResponse(data=data, safe=False)
        return HttpResponse(json.dumps(data), content_type="application/json")

def home(request):
    user = request.user
    return render(request, 'other/index.html')


# 签到
#@login_required
def signin(request):
    username = request.user.username
    acco = Acco.objects.get(username=username)
    now_time = timezone.now().day  #当前时间
    last_time = acco.last_time.day  #最后一次登录时间
    t1 = acco.create_time.strftime("%Y-%m-%d %H:%I:%S") #用户创建时间
    t2 = acco.last_time.strftime("%Y-%m-%d %H:%I:%S")   #上一次登录时间
   # print(t1, t2)
    if (now_time - last_time) >= 2:   #如果上一次登录时间与当前时间相隔了一天
        acco.nums = 0
        acco.save()
    elif (now_time - last_time) > 1:  #如果当前时间是上次登录时间的下一天
        acco.nums += 1
        acco.save()
    elif t1 == t2:    #如果用户是第一次登录
        acco.nums += 1
        acco.save()
    #return HttpResponse(json.dumps(acco.nums), content_type="application/json")
    print(acco.nums)
    return HttpResponse(json.dumps(acco.nums), content_type="application/json")


# 最新动态
def find_new_dynamics(username):
    friends = Acco.objects.get(username=username).friends.all()
    stories = {}
    new_stories = []
    for friend in friends:
        story = Story.objects.filter(author=friend)
        for x in story:
            stories[x.pub_date] = x
    new = sorted(stories.items(), reverse=True)
    for i in range(len(new)):
        new_stories.append(new[i][1])
    return new_stories



