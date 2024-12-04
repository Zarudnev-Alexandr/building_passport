from django.contrib import admin

from .models import Profile

admin.site.site_header = "Новая прога для уника"
admin.site.site_title = "Панель администрирования"
admin.site.index_title = "Добро пожаловать!"


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ("pk", "first_name", "last_name", "manage_org")
    list_filter = ("manage_org",)
