from django.contrib import admin
from .models import Album, Images, Story
# Register your models here.
admin.site.register(Album)
admin.site.register(Images)
admin.site.register(Story)
# admin.site.register(Category)