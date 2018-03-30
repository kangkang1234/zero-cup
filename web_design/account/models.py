# -*-coding:utf-8 -*-
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes import fields
from django.db import models
from django.db.models import signals
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from others.models import Message


#上传路径
def get_upload_to(instance, filename):

    user = instance.album.author.username
    name = instance.album.name
    return user + '/' + name + '/' + filename

# 用户
class Acco(AbstractUser):
    #个人简介
    intro = models.CharField(max_length=128, default="这个人很懒，什么都没留下。", blank=True, verbose_name="intro")
    #签到次数
    nums = models.IntegerField(default=0, blank=True, verbose_name="chack_in_nums")
    #最后一次签到时间
    last_time = models.DateTimeField(auto_now=True, verbose_name="last_time")
    #用户创建时间
    create_time = models.DateTimeField(auto_now_add=True, verbose_name="create_time")
    #好友
    friends = models.ManyToManyField('self', blank=True, related_name='friends')
    #头像
    headimg = models.FileField(upload_to=get_upload_to, default='moren.jpg')

    class Meta:
        db_table = 'loginuser'
        verbose_name_plural = 'user'
        ordering = ['-date_joined']

    def __str__(self):
        return self.get_username()


# 消息通知
class Notice(models.Model):
    sender = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='notice_sender')  # 发送者
    receiver = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='notice_receiver')  # 接收者
    content_type = models.ForeignKey(ContentType)
    object_id = models.PositiveIntegerField()
    event = fields.GenericForeignKey('content_type', 'object_id')
    status = models.BooleanField(default=False)  # 是否阅读
    type = models.IntegerField()  # 通知类型 0:评论 1:好友或系统消息 2:好友申请
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'notice'
        ordering = ['-created_at']
        verbose_name_plural = 'notice'

    def __str__(self):
        return "%s的事件: %s" % (self.sender, self.description())

    def description(self):
        if self.event:
            return self.event.description()
        return "No Event"

    def reading(self):
        if not self.status:
            self.status = True


# 好友申请
class Application(models.Model):
    sender = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='appli_sender')  # 发送者
    receiver = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='appli_receiver')  # 接收者
    status = models.IntegerField(default=0)  # 申请状态 0:未查看 1:同意 2:不同意
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def description(self):
        return '%s 申请加好友' % self.sender

    class Meta:
        db_table = 'application'
        verbose_name_plural = '好友申请'


def application_save(sender, instance, signal, *args, **kwargs):
    entity = instance
    if str(entity.created_at)[:19] == str(entity.updated_at)[:19]:
        event = Notice(sender=entity.sender, receiver=entity.receiver, event=entity, type=2)
        event.save()


def message_save(sender, instance, signal, *args, **kwargs):
    entity = instance
    if str(entity.created_at)[:19] == str(entity.updated_at)[:19]:
        event = Notice(sender=entity.sender, receiver=entity.receiver, event=entity, type=1)
        event.save()


signals.post_save.connect(message_save, sender=Message)
signals.post_save.connect(application_save, sender=Application)













