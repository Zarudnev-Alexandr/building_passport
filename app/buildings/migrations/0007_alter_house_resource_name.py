# Generated by Django 5.1.3 on 2024-12-04 17:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('buildings', '0006_house_wastewater_system_material_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='house',
            name='resource_name',
            field=models.CharField(blank=True, choices=[('ХВС', 'ХВС'), ('ГВС', 'ГВС'), ('Тепло', 'Тепло'), ('ГАЗ', 'ГАЗ'), ('Электро', 'Электро')], max_length=200, null=True, verbose_name='Наименование коммунального ресурса, для измерения объемов поставки которого используется общедомовой прибор учета'),
        ),
    ]
