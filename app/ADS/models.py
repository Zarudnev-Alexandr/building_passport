from django.db import models
from django.utils import timezone

class Address(models.Model):
    object_name = models.CharField(
        max_length=100,
        verbose_name="Объект"
    )
    address = models.CharField(
        max_length=200,
        verbose_name="Адрес"
    )

    def __str__(self):
        return f"{self.object_name} - {self.address}"

class Seti(models.Model):
    TYPE_CHOICES = [
        (1, 'Первичная'),
        (2, 'Повторная'),
    ]
    type_choices = models.IntegerField(
        default=1,
        choices=TYPE_CHOICES,
        verbose_name="Тип обращения"
    )

    APPLICANT_TYPE_CHOICES = [
        (1, 'Гражданин'),
        (2, 'Госорганы'),
        (3, 'Организация'),
    ]
    applicant_type = models.IntegerField(
        default=1,
        choices=APPLICANT_TYPE_CHOICES,
        verbose_name="Тип заявителя"
    )

    CATEGORY_CHOICES = [
        (1, 'Аварийная'),
        (2, 'Плановая'),
        (3, 'Консультация'),
    ]
    category_choices = models.IntegerField(
        default=1,
        choices=CATEGORY_CHOICES,
        verbose_name="Категория заявки"
    )

    RESOURCE_CHOICES = [
        (1, 'Тепло'),
        (2, 'Водоснабжение'),
        (3, 'Канализация'),
        (4, 'Благоустройство'),
    ]
    resource_choices = models.IntegerField(
        default=1,
        choices=RESOURCE_CHOICES,
        verbose_name="Ресурс"
    )

    HEAT_AVARIA = [
        (1, 'Котельная'),
        (2, 'ЦТП'),
        (3, 'Камера'),
        (4, 'Течь сети'),
    ]
    WATER_AVARIA = [
        (1, 'Течь сети'),
        (2, 'Колодец'),
        (3, 'Течь пожарного гидранта'),
        (4, 'Колонка'),
    ]
    SEWERAGE_AVARIA = [
        (1, 'Засор канализации'),
        (2, 'Течь сети'),
        (3, 'Течь колодца'),
        (4, 'Иное'),
    ]
    IMPROVEMENT_AVARIA = [
        (1, 'Разрушен колодец'),
        (2, 'Иное'),
    ]
    avaria_choices = models.IntegerField(
        choices=HEAT_AVARIA + WATER_AVARIA + SEWERAGE_AVARIA + IMPROVEMENT_AVARIA,
        verbose_name="Объект аварии"
    )

    STATUS_CHOICES = [
        (1, 'Новая'),
        (2, 'Передано на исполнение'),
        (3, 'В работе'),
        (4, 'Завершена'),
    ]
    status = models.IntegerField(
        default=1,
        choices=STATUS_CHOICES,
        verbose_name="Статус заявки"
    )

    address = models.ForeignKey(
        Address,
        on_delete=models.CASCADE,
        verbose_name="Адрес"
    )
    full_name = models.CharField(
        max_length=100,
        blank=True,
        null=True,
        verbose_name="ФИО заявителя"
    )
    telephone = models.CharField(
        max_length=20,
        blank=True,
        null=True,
        verbose_name="Телефон заявителя"
    )
    email = models.EmailField(
        max_length=100,
        blank=True,
        null=True,
        verbose_name="E-mail"
    )
    description = models.TextField(
        verbose_name="Примечание"
    )
    executor = models.ForeignKey(
        'Executor',
        on_delete=models.SET_NULL,
        null=True,
        verbose_name="Исполнитель"
    )
    specialist = models.ForeignKey(
        'Specialist',
        on_delete=models.SET_NULL,
        null=True,
        verbose_name="Специалист"
    )
    due_date_start = models.DateField(
        verbose_name="Дата начала исполнения"
    )
    due_date_end = models.DateField(
        verbose_name="Дата окончания исполнения"
    )

    def __str__(self):
        return str(self.id)


class Executor(models.Model):
    name = models.CharField(
        max_length=100,
        verbose_name="Исполнитель"
    )

    def __str__(self):
        return self.name

class Specialist(models.Model):
    name = models.CharField(
        max_length=100,
        verbose_name="Специалист"
    )

    def __str__(self):
        return self.name