# Generated by Django 5.1.3 on 2024-12-02 22:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('buildings', '0002_alter_house_options_rename_house_lift_house_id_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='lift',
            old_name='house_id',
            new_name='house',
        ),
        migrations.AlterField(
            model_name='lift',
            name='commissioning_year',
            field=models.IntegerField(blank=True, null=True, verbose_name='Год ввода в эксплуатацию'),
        ),
        migrations.AlterField(
            model_name='lift',
            name='factory_number',
            field=models.CharField(blank=True, max_length=200, null=True, unique=True, verbose_name='Заводской номер'),
        ),
        migrations.AlterField(
            model_name='lift',
            name='inventory_number',
            field=models.CharField(blank=True, max_length=200, null=True, unique=True, verbose_name='Инвентарный номер'),
        ),
        migrations.AlterField(
            model_name='lift',
            name='load_capacity',
            field=models.IntegerField(blank=True, null=True, verbose_name='Грузоподъемность, кг'),
        ),
        migrations.AlterField(
            model_name='lift',
            name='normative_lifetime',
            field=models.IntegerField(blank=True, null=True, verbose_name='Нормативный срок службы'),
        ),
        migrations.AlterField(
            model_name='lift',
            name='physical_wear',
            field=models.FloatField(blank=True, default=0, null=True, verbose_name='Физический износ, %'),
        ),
    ]
