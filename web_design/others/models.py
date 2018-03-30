# -*-coding:utf-8 -*-
from django.db import models
from django.conf import settings
from django.utils import timezone
from django.shortcuts import reverse

#相册
class Album(models.Model):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="album")
    name = models.CharField(max_length=32)
    created = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse('others:album_det', kwargs={'pk': self.pk})


#上传路径
def get_upload_to(instance, filename):

    user = instance.author.username
 #   name = instance.album.name
    return user + '/' + filename


#照片墙照片
class Images(models.Model):
#    album = models.ForeignKey(Album, verbose_name="user_img")
    author = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="image", null=True)
    img = models.FileField(upload_to=get_upload_to, null=True)
    created = models.DateTimeField(default=timezone.now)
    #
    # def __str__(self):
    #     return self

    # def get_upload_to(instance, filename):
    #     user = instance.album.auther.username
    #     name = instance.album.name
    #     return settings.MEDIA_ROOT + '/' + user + '/' + name + '/' + filename


# #标签分类
# class Category(models.Model):
#     owner = models.ForeignKey(User, verbose_name="Owner", null=True)
#     name = models.CharField(max_length=8)
#
#     def __str__(self):
#         return self.name


#故事
class Story(models.Model):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="user_story")
    title = models.CharField(max_length=16, blank=False, verbose_name="story_title")
    content = models.TextField(max_length=500, blank=False, verbose_name="story_content")
    pub_date = models.DateTimeField(auto_now=True)
#    category = models.ForeignKey(Category, verbose_name="tag", null=True)


    def get_absolute_url(self):
        return reverse('others:story_det', kwargs={'pk': self.pk})

    def __str__(self):
        return self.title


#消息
class Message(models.Model):
    sender = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="message_sender")
    receiver = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="message_receiver")
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def description(self):
        if self.sender.is_staff:
            return '系统消息！'
        else:
            return '来自%s的新消息' % self.sender.username

    class Meta:
        db_table = 'message'
        verbose_name_plural = 'message'
