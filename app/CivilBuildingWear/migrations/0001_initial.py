# Generated by Django 5.1.3 on 2025-04-09 14:16

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('buildings', '0010_alter_house_meter_state_alter_house_roof_shape'),
    ]

    operations = [
        migrations.CreateModel(
            name='CivilBuilding',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('HouseType', models.IntegerField(default=0, verbose_name='Тип дома')),
                ('yearOperation', models.CharField(max_length=200, verbose_name='Год введения в эксплуатацию')),
                ('address', models.CharField(max_length=200, unique=True, verbose_name='Адрес')),
                ('houseArea', models.FloatField(default=0, verbose_name='Площадь дома')),
                ('floorCount', models.IntegerField(default=0, verbose_name='Количество этажей')),
                ('undergroundFloorCount', models.IntegerField(default=0, verbose_name='Количество подземных этажей')),
                ('BuildingArea', models.FloatField(default=0, verbose_name='Площадь здания')),
                ('ConstractionYear', models.IntegerField(default=0, verbose_name='Год постройки')),
                ('foundationType', models.IntegerField(choices=[(1, 'столбчатые деревянные с забиркой'), (2, 'столбчатые,  каменные с кирпичным цоколем'), (3, 'ленточные каменные'), (4, 'ленточные крупноблочные'), (5, 'свайные столбчатые каменные, бетонные и железобетонные')], default=0, verbose_name='Тип фундамента')),
                ('wallType', models.IntegerField(choices=[(1, 'деревянные, сборно-щитовые'), (2, 'деревянные каркасные'), (3, 'рубленные из бревен и брусчатые'), (4, 'деревянные рубленные, каркасные и брусчатые с наружной облицовкой кирпичом'), (5, 'кирпичные'), (6, 'кирпичные с облицовкой керамическими блоками и плитками'), (7, 'из мелких блоков, искусственных и естественных камней'), (8, 'из крупноразмерных блоков и однослойных несущих панелей'), (9, 'из слоистых железобетонных панелей'), (10, 'из несущих панелей')], default=0, verbose_name='Тип стен')),
                ('floorType', models.IntegerField(choices=[(1, 'деревянные неоштукатуренные'), (2, 'из кирпичных сводов по стальным балкам'), (3, 'из двухскорлупных железобетонных прокатных панелей'), (4, 'из сборного железобетонного настила'), (5, 'из сборных и монолитных сплошных плит'), (6, 'монолитные и сборные железобетонные балки покрытий и перекрытий')], default=0, verbose_name='Тип пола')),
                ('balconyType', models.IntegerField(choices=[(1, 'сборные железобетонные детали лоджий'), (2, 'балконы, козырьки, эркеры')], default=0, verbose_name='Тип балкона')),
                ('roofType', models.IntegerField(choices=[(1, 'деревянные'), (2, 'железобетонные сборные (чердачные)'), (3, 'совмещенные из сборных железобетонных слоистых панелей')], default=0, verbose_name='Тип крыши')),
                ('roofingType', models.IntegerField(choices=[(1, 'рулонные'), (2, 'мастичные'), (3, 'стальные'), (4, 'из асбестоцементных листов'), (5, 'черепичные'), (6, 'драночные'), (7, 'тесовые')], default=0, verbose_name='Тип кровли')),
                ('appointment', models.IntegerField(choices=[(1, 'Административное'), (2, 'Образовательное'), (3, 'Медицинское'), (4, 'Общежитие')], default=0, verbose_name='Назначение')),
                ('foundationVolume', models.IntegerField(default=0, verbose_name='Объем фундамента')),
                ('wallVolume', models.IntegerField(default=0, verbose_name='Объем стен')),
                ('floorVolume', models.IntegerField(default=0, verbose_name='Объем пола')),
                ('balconyVolume', models.IntegerField(default=0, verbose_name='Объем балкона')),
                ('roofVolume', models.IntegerField(default=0, verbose_name='Объем крыши')),
                ('roofingVolume', models.IntegerField(default=0, verbose_name='Объем кровли')),
                ('sewerageLength', models.IntegerField(default=0, verbose_name='Длина канализации')),
                ('chuteLength', models.IntegerField(default=0, verbose_name='Длина мусоропровода')),
                ('centralHeatingLength', models.IntegerField(default=0, verbose_name='Длина центрального отопления')),
                ('coldWaterSupplyLength', models.IntegerField(default=0, verbose_name='Длина холодного водоснабжения')),
                ('hotWaterSupplyLength', models.IntegerField(default=0, verbose_name='Длина горячего водоснабжения')),
                ('wiringLength', models.IntegerField(default=0, verbose_name='Длина проводки')),
                ('basement', models.BooleanField(default=False, verbose_name='Подвал')),
                ('outbuilding', models.BooleanField(default=False, verbose_name='Пристройка')),
                ('attic', models.BooleanField(default=False, verbose_name='Чердак')),
                ('sewerage', models.BooleanField(default=False, verbose_name='Канализация')),
                ('elevator', models.BooleanField(default=False, verbose_name='Лифт')),
                ('GarbageChute', models.BooleanField(default=False, verbose_name='Мусоропровод')),
                ('CentralHeating', models.BooleanField(default=False, verbose_name='Центральное отопление')),
                ('CentralColdWatterSupply', models.BooleanField(default=False, verbose_name='Холодное водоснабжение')),
                ('CentralHotWatterSupply', models.BooleanField(default=False, verbose_name='Горячее водоснабжение')),
                ('ElectricalWiring', models.BooleanField(default=False, verbose_name='Electrical wiring')),
                ('balconyCount', models.IntegerField(default=0, verbose_name='Количество балконов')),
                ('lodjiCount', models.IntegerField(default=0, verbose_name='Количество лоджий')),
                ('canopyCount', models.IntegerField(default=0, verbose_name='Количество навесов')),
                ('orielCount', models.IntegerField(default=0, verbose_name='Количество эркеров')),
                ('organizationMKD', models.CharField(max_length=200, verbose_name='Организация, осуществляющая управление МКД')),
                ('yearConstruction', models.CharField(max_length=200, verbose_name='Год постройки')),
                ('lifeStage', models.IntegerField(choices=[(1, 'эксплуатация'), (2, 'модернизация'), (3, 'реконструкция'), (4, 'капитальный ремонт')], default=0, verbose_name='Стадия жизненного цикла')),
                ('yearReconstruction', models.CharField(max_length=200, verbose_name='Год проведения рекомнструкции')),
                ('NumberApartments', models.IntegerField(default=0, verbose_name='кол-во комнат в общежитии')),
                ('buildingVolume', models.IntegerField(default=0, verbose_name='Объем здания')),
                ('buildingWidth', models.IntegerField(default=0, verbose_name='Ширина здания')),
                ('buildingLength', models.IntegerField(default=0, verbose_name='Длинна здания')),
                ('WallHeight', models.FloatField(default=0, verbose_name='Высота стен')),
                ('FoundationWallsArea', models.FloatField(default=0, verbose_name='Площадь стен фундамента')),
                ('BalconyaArea', models.FloatField(default=0, verbose_name='Общая площадь балконов')),
                ('BuildingWallsArea', models.FloatField(default=0, verbose_name='Площадь стен здания')),
                ('LoadBearingArea', models.FloatField(default=0, verbose_name='Общая площадь несущих конструкций')),
                ('FloorArea', models.FloatField(default=0, verbose_name='Общая площадь перекрытия')),
                ('RoofArea', models.FloatField(default=0, verbose_name='Общая площадь крыши')),
                ('HotWaterSystem', models.FloatField(default=0, verbose_name='Система горячего водоснабжения')),
                ('CentralHeatingSystem', models.FloatField(default=0, verbose_name='Система центрального отопления')),
                ('ColdWaterSystem', models.FloatField(default=0, verbose_name='Система холодного водоснабжения')),
                ('SewageSystem', models.FloatField(default=0, verbose_name='Система канализаций')),
                ('ElectricalSystem', models.FloatField(default=0, verbose_name='Система электрооборудования')),
                ('TrashChutes', models.FloatField(default=0, verbose_name='Мусоропроводы')),
                ('comment', models.TextField(blank=True, null=True, verbose_name='Комментарий')),
                ('originalHouse', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='buildings.house')),
            ],
        ),
        migrations.CreateModel(
            name='CivilBuildingDamage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('position', models.TextField(max_length=100)),
                ('data', models.DateField()),
                ('Element', models.IntegerField(choices=[(0, 'фундамент'), (1, 'стена'), (2, 'пол'), (3, 'балкон'), (4, 'крыша'), (5, 'кровля'), (6, 'канализация'), (7, 'мусоропровод'), (8, 'центральное отопление'), (9, 'холодное водоснабжение'), (10, 'горячее водоснабжение'), (11, 'электропроводка')])),
                ('volume', models.FloatField()),
                ('degreeOfDamage', models.IntegerField()),
                ('idHouse', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='CivilBuildingWear.civilbuilding')),
            ],
        ),
        migrations.CreateModel(
            name='Doors',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('position', models.TextField(max_length=100)),
                ('height', models.IntegerField()),
                ('width', models.IntegerField()),
                ('count', models.IntegerField(default=0)),
                ('idHouse', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='CivilBuildingWear.civilbuilding')),
            ],
        ),
        migrations.CreateModel(
            name='Window',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('position', models.TextField(max_length=100)),
                ('height', models.IntegerField()),
                ('width', models.IntegerField()),
                ('count', models.IntegerField(default=0)),
                ('idHouse', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='CivilBuildingWear.civilbuilding')),
            ],
        ),
    ]
