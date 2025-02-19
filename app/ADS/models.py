from django.db import models

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
        ('Primary', 'Первичная'),
        ('Repeated', 'Повторная'),
    ]
    type_choices = models.CharField(
        max_length=10,
        default='Primary',
        choices=TYPE_CHOICES,
        verbose_name="Тип обращения"
    )

    APPLICANT_TYPE_CHOICES = [
        ('Citizen', 'Гражданин'),
        ('Government', 'Госорганы'),
        ('Organization', 'Организация'),
    ]
    applicant_type = models.CharField(
        max_length=15,
        default='Citizen',
        choices=APPLICANT_TYPE_CHOICES,
        verbose_name="Тип заявителя"
    )

    CATEGORY_CHOICES = [
        ('Emergency', 'Аварийная'),
        ('Planned', 'Плановая'),
        ('Consultation', 'Консультация'),
    ]
    category_choices = models.CharField(
        max_length=12,
        default='Emergency',
        choices=CATEGORY_CHOICES,
        verbose_name="Категория заявки"
    )

    RESOURCE_CHOICES = [
        ('Heat', 'Тепло'),
        ('WaterSupply', 'Водоснабжение'),
        ('Sewerage', 'Канализация'),
        ('Improvement', 'Благоустройство'),
    ]
    resource_choices = models.CharField(
        max_length=15,
        default='Heat',
        choices=RESOURCE_CHOICES,
        verbose_name="Ресурс"
    )

    HEAT_AVARIA = [
        ('Boiler', 'Котельная'),
        ('CTP', 'ЦТП'),
        ('Chamber', 'Камера'),
        ('HeatLeak', 'Течь сети'),
    ]

    heat_avaria_choices = models.CharField(
        max_length=20,
        default='Boiler',
        choices=HEAT_AVARIA,
        verbose_name="Объект аварии тепла"
    )

    WATER_AVARIA = [
        ('WaterLeak', 'Течь сети'),
        ('Well', 'Колодец'),
        ('HydrantLeak', 'Течь пожарного гидранта'),
        ('Column', 'Колонка'),
    ]

    water_avaria_choices = models.CharField(
        max_length=20,
        default='WaterLeak',
        choices=WATER_AVARIA,
        verbose_name="Объект аварии воды"
    )

    SEWERAGE_AVARIA = [
        ('SewerClog', 'Засор канализации'),
        ('SewerLeak', 'Течь сети'),
        ('WellLeak', 'Течь колодца'),
        ('Other', 'Иное'),
    ]

    sewerage_avaria_choices = models.CharField(
        max_length=20,
        default='SewerClog',
        choices=SEWERAGE_AVARIA,
        verbose_name="Объект аварии канализации"
    )

    IMPROVEMENT_AVARIA = [
        ('DestroyedWell', 'Разрушен колодец'),
        ('Other', 'Иное'),
    ]

    improvement_avaria_choices = models.CharField(
        max_length=20,
        default='DestroyedWell',
        choices=IMPROVEMENT_AVARIA,
        verbose_name="Объект аварии"
    )

    STATUS_CHOICES = [
        ('New', 'Новая'),
        ('Transferred', 'Передано на исполнение'),
        ('InProgress', 'В работе'),
        ('Completed', 'Завершена'),
    ]
    status = models.CharField(
        max_length=15,
        default='New',
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

    dispatcher_full_name = models.ForeignKey(
        'DispatcherFullName',
        on_delete=models.SET_NULL,
        null=True,
        verbose_name="ФИО диспетчера"
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


class DispatcherFullName(models.Model):
    name = models.CharField(
        max_length=100,
        verbose_name='ФИО диспетчера'
    )

    def __str__(self):
        return self.name
