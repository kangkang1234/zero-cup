from django.contrib import admin
from .models import Acco
# Register your models here.


class AccoAdmin(admin.ModelAdmin):
    list_display = ['username', ]


admin.site.register(Acco, AccoAdmin)