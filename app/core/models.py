from django.contrib.auth.models import User
from django.db import models

class Profile(models.Model):
    JOB_TITLE_CHOICES = {
        ("Оператор БД", "Оператор БД"),
    }
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, verbose_name="Пользователь"
    )
    first_name = models.CharField(
        max_length=255, blank=True, null=True, verbose_name="Имя"
    )
    last_name = models.CharField(
        max_length=255, blank=True, null=True, verbose_name="Фамилия"
    )

    manage_org = models.CharField(
        max_length=255,
        blank=True,
        null=True,
        verbose_name="Управляющая организация",
    )
    job_title = models.CharField(
        max_length=255,
        blank=True,
        null=True,
        verbose_name="Должность",
        choices=JOB_TITLE_CHOICES,
    )

    db_access = models.BooleanField(
        default=False,
        verbose_name="Доступ к 'Добавлению информации в БД'",
    )

    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user.username

    class Meta:
        verbose_name = "Профиль"
        verbose_name_plural = "Профили"

