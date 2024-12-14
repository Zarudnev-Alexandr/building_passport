# Generated by Django 5.1.3 on 2024-12-04 18:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('buildings', '0007_alter_house_resource_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='house',
            name='cold_water_system_type',
            field=models.CharField(blank=True, choices=[('хозяйственно-питьевая', 'хозяйственно-питьевая'), ('противопожарная/производственная', 'противопожарная/производственная'), ('совмещенная', 'совмещенная')], max_length=255, null=True, verbose_name='Тип внутридомовой инженерной системы холодного водоснабжения'),
        ),
        migrations.AlterField(
            model_name='house',
            name='external_walls_type',
            field=models.CharField(blank=True, choices=[('несущие', 'несущие'), ('самонесущие', 'самонесущие'), ('ненесущие/фахверковые', 'ненесущие/фахверковые'), ('навесные', 'навесные')], max_length=255, null=True, verbose_name='Тип наружных стен'),
        ),
        migrations.AlterField(
            model_name='house',
            name='facade_insulation_type',
            field=models.CharField(blank=True, choices=[('навесные вентилируемые', 'навесные вентилируемые'), ('слоистой (колодцевой) кладки', 'слоистой (колодцевой) кладки'), ('штукатурные', 'штукатурные')], max_length=255, null=True, verbose_name='Тип наружного утепления фасада'),
        ),
        migrations.AlterField(
            model_name='house',
            name='floor_structure',
            field=models.CharField(blank=True, choices=[('сборная', 'сборная'), ('монолитная', 'монолитная'), ('сборно-монолитная', 'сборно-монолитная'), ('из дервянных балок', 'из дервянных балок'), ('из металлических балок', 'из металлических балок'), ('железобетонные', 'железобетонные')], max_length=255, null=True, verbose_name='Конструкция перекрытий'),
        ),
        migrations.AlterField(
            model_name='house',
            name='floor_type',
            field=models.CharField(blank=True, choices=[('балочные', 'балочные'), ('плитные', 'плитные'), ('безбалочные', 'безбалочные')], max_length=255, null=True, verbose_name='Тип перекрытий'),
        ),
        migrations.AlterField(
            model_name='house',
            name='foundation_material',
            field=models.CharField(blank=True, choices=[('бутовый', 'бутовый'), ('бетонный', 'бетонный'), ('бутобетонный', 'бутобетонный'), ('железобетонный', 'железобетонный')], max_length=255, null=True, verbose_name='Материал фундамента'),
        ),
        migrations.AlterField(
            model_name='house',
            name='foundation_type',
            field=models.CharField(blank=True, choices=[('монолитный', 'монолитный'), ('плавающий', 'плавающий'), ('ленточный', 'ленточный'), ('плитный', 'плитный'), ('свайный', 'свайный'), ('винтовые сваи', 'винтовые сваи'), ('столбчатый', 'столбчатый')], max_length=255, null=True, verbose_name='Тип фундамента'),
        ),
        migrations.AlterField(
            model_name='house',
            name='gas_system_type',
            field=models.CharField(blank=True, choices=[('централизованная', 'централизованная'), ('автономная', 'автономная')], max_length=255, null=True, verbose_name='Тип внутридомовой инженерной системы газоснабжения'),
        ),
        migrations.AlterField(
            model_name='house',
            name='hot_water_system_type',
            field=models.CharField(blank=True, choices=[('открытая', 'открытая'), ('закрытая', 'закрытая')], max_length=255, null=True, verbose_name='Тип внутридомовой инженерной системы горячего водоснабжения '),
        ),
        migrations.AlterField(
            model_name='house',
            name='internal_walls_type',
            field=models.CharField(blank=True, choices=[('несущие', 'несущие'), ('самонесущие', 'самонесущие'), ('навесные', 'навесные')], max_length=255, null=True, verbose_name='Тип внутренних стен'),
        ),
        migrations.AlterField(
            model_name='house',
            name='radiators_type',
            field=models.CharField(blank=True, choices=[('радиаторы', 'радиаторы'), ('конвекторы', 'конвекторы'), ('полотенцесушители', 'полотенцесушители'), ('стеновые панели', 'стеновые панели'), ('тёплые полы', 'тёплые полы'), ('инфракрасные излучатели', 'инфракрасные излучатели')], max_length=255, null=True, verbose_name='Тип отопительных приборов '),
        ),
        migrations.AlterField(
            model_name='house',
            name='roof_cover_type',
            field=models.CharField(blank=True, choices=[('листовые материалы', 'листовые материалы'), ('мягкие покрытия', 'мягкие покрытия'), ('штучная отделка', 'штучная отделка'), ('наливная', 'наливная')], max_length=255, null=True, verbose_name='Тип кровли'),
        ),
        migrations.AlterField(
            model_name='house',
            name='roof_shape',
            field=models.CharField(blank=True, choices=[('сборная', 'сборная'), ('монолитная', 'монолитная'), ('сборно-монолитная', 'сборно-монолитная'), ('из дервянных балок', 'из дервянных балок'), ('из металлических балок', 'из металлических балок'), ('железобетонные', 'железобетонные')], max_length=255, null=True, verbose_name='Конструкция перекрытий'),
        ),
        migrations.AlterField(
            model_name='house',
            name='wastewater_system_type',
            field=models.CharField(blank=True, choices=[('централизованная канализация', 'централизованная канализация'), ('выгребная яма', 'выгребная яма'), ('локальная канализация (септик)', 'локальная канализация (септик)')], max_length=255, null=True, verbose_name='Тип внутридомовой инженерной системы водоотведения '),
        ),
        migrations.AlterField(
            model_name='lift',
            name='lift_type',
            field=models.CharField(choices=[('пассажирский', 'пассажирский'), ('грузовой', 'грузовой')], default='пассажирский', max_length=200, verbose_name='Тип лифта'),
        ),
    ]
