# Generated by Django 5.1.3 on 2024-12-02 21:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('buildings', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='house',
            options={'verbose_name': 'Тех. паспорт здания', 'verbose_name_plural': 'Тех. паспорта зданий'},
        ),
        migrations.RenameField(
            model_name='lift',
            old_name='house',
            new_name='house_id',
        ),
        migrations.AlterField(
            model_name='house',
            name='updated_at',
            field=models.DateTimeField(auto_now=True, verbose_name='Дата обновления дома'),
        ),
        migrations.AlterField(
            model_name='lift',
            name='entrance_number',
            field=models.IntegerField(blank=True, null=True, verbose_name='Номер подъезда, в котором расположен лифт (при наличии) '),
        ),
        migrations.AlterField(
            model_name='lift',
            name='lift_type',
            field=models.IntegerField(choices=[(1, 'пассажирский'), (2, 'грузовой')], default=0, verbose_name='Тип лифта'),
        ),
        migrations.AlterField(
            model_name='lift',
            name='physical_wear',
            field=models.FloatField(default=0, verbose_name='Физический износ, %'),
        ),
        migrations.AlterField(
            model_name='lift',
            name='updated_at',
            field=models.DateTimeField(auto_now=True, verbose_name='Дата обновления лифта'),
        ),
    ]
