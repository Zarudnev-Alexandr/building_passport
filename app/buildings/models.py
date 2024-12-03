from django.db import models


class House(models.Model):
    """Технический паспорт здания"""
    date_of_passport_generation = models.DateField(
        auto_now_add=True,
        editable=False,
        verbose_name="Дата формирования электронного паспорта "
    )
    address = models.CharField(
        max_length=200,
        unique=True,
        verbose_name="Адрес здания"
    )
    cadastre_number = models.FloatField(
        default=0,
        null=True,
        blank=True,
        verbose_name="Кадастровый номер (инвентарный или условный номер)"
    )
    purpose_of_building = models.CharField(
        max_length=200,
        null=True,
        blank=True,
        verbose_name="Назначение здания"
    )
    year_operation = models.IntegerField(
        null=True,
        blank=True,
        verbose_name="Год ввода в эксплуатацию"
    )
    year_construction = models.IntegerField(
        null=True,
        blank=True,
        verbose_name="Год постройки"
    )
    life_cycle_stage = models.CharField(
        max_length=200,
        null=True,
        blank=True,
        verbose_name="Стадия жизненного цикла"
    )
    year_reconstruction = models.IntegerField(
        null=True,
        blank=True,
        verbose_name="Год проведения реконструкции"
    )
    floorCount = models.IntegerField(
        null=True,
        blank=True,
        verbose_name="Количество этажей"
    )
    underground_floor_count = models.IntegerField(
        null=True,
        blank=True,
        verbose_name="Количество подземных этажей"
    )
    number_entrances = models.IntegerField(
        null=True,
        blank=True,
        verbose_name="Количество подъездов"
    )
    # entrances_low_mobile = models.BooleanField(
    #     default=False, verbose_name="Наличие приспособлений в подъездах в здании для нужд маломобильных групп населения"
    # )
    number_elevators = models.IntegerField(
        null=True,
        blank=True,
        verbose_name="Количество лифтов"
    )
    number_working_rooms = models.IntegerField(
        null=True,
        blank=True,
        verbose_name="Количество рабочих помещений (кабинетов, аудиторий)"
    )
    number_auxiliary_rooms = models.IntegerField(
        null=True,
        blank=True,
        verbose_name="Количество вспомогательных помещений , в т.ч. общего пользования"
    )
    total_area_working_premises = models.FloatField(
        null=True,
        blank=True,
        verbose_name="Общая площадь рабочих помещений, кв.м")
    total_area_auxiliary_premises_except_common_areas = models.FloatField(
        null=True,
        blank=True,
        verbose_name="Общая площадь "
                     "вспомогательных помещений, "
                     "за исключением помещений общего "
                     "пользования, кв.м ")
    total_area_common_areas_building = models.FloatField(
        null=True,
        blank=True,
        verbose_name="Общая площадь помещений общего "
                     "пользования в здании, кв.м ")
    balcony_count = models.IntegerField(
        null=True,
        blank=True,
        verbose_name="Количество балконов"
    )
    lodji_count = models.IntegerField(
        null=True,
        blank=True,
        verbose_name="Количество лоджий"
    )
    # status_cultural_heritage_site = models.BooleanField(
    #     default=False, verbose_name="Наличие статуса объекта культурного наследия"
    # )
    # recognizing_building_emergency = models.CharField(
    #     max_length=1000, verbose_name="Основание признания здания аварийным"
    # )
    # emergency_document = models.CharField(
    #     max_length=200, verbose_name="Номер, дата документа, содержащего решение о признании здания аварийным"
    # )
    # energy_efficiency_class = models.CharField(
    #     max_length=200, verbose_name="Класс энергетической эффективности"
    # )
    # date_energy_survey = models.DateField(
    #     null=True,
    #     verbose_name="Дата проведения энергетического обследования"
    # )
    foundation_choice = (
        (1, "монолитный"),
        (2, "плавающий"),
        (3, "ленточный"),
        (4, "плитный"),
        (5, "свайный"),
        (6, "винтовые сваи"),
        (7, "столбчатый"),
    )
    foundation_type = models.IntegerField(
        null=True,
        blank=True,
        choices=foundation_choice,
        verbose_name="Тип фундамента"
    )
    foundation_material_choice = (
        (1, "бутовый"),
        (2, "бетонный"),
        (3, "бутобетонный"),
        (4, "железобетонный"),
    )
    foundation_material = models.IntegerField(
        null=True,
        blank=True,
        choices=foundation_material_choice, verbose_name="Материал фундамента"
    )
    paving_area = models.FloatField(
        null=True,
        blank=True,
        verbose_name="Площадь отмостки, КВ.м"
    )
    foundation_wear = models.FloatField(
        null=True,
        blank=True,
        verbose_name="Физический износ, %"
    )
    foundation_last_repair_year = models.DateField(
        null=True,
        blank=True,
        verbose_name="Год проведения последнего капитального ремонта "
    )
    internal_walls_type_choice = (
        (1, "несущие"),
        (2, "самонесущие"),
        (3, "навесные"),
    )
    internal_walls_type = models.IntegerField(
        null=True,
        blank=True,
        choices=internal_walls_type_choice,
        verbose_name="Тип внутренних стен"
    )
    internal_walls_material = models.CharField(
        null=True,
        blank=True,
        max_length=200,
        verbose_name="Материал внутренних стен"
    )
    internal_walls_wear = models.FloatField(
        null=True,
        blank=True,
        verbose_name="Физический износ, %"
    )
    external_walls_type_choice = (
        (1, "несущие"),
        (2, "самонесущие"),
        (3, "ненесущие/фахверковые"),
        (4, "навесные"),
    )
    external_walls_type = models.IntegerField(
        null=True,
        blank=True,
        choices=external_walls_type_choice,
        verbose_name="Тип наружных стен"
    )
    external_walls_material = models.CharField(
        null=True,
        blank=True,
        max_length=200,
        verbose_name="Материал наружных стен"
    )
    facade_insulation_type_choice = (
        (1, "навесные вентилируемые"),
        (2, "слоистой (колодцевой) кладки"),
        (3, "штукатурные"),
    )
    facade_insulation_type = models.IntegerField(
        null=True,
        blank=True,
        choices=facade_insulation_type_choice,
        verbose_name="Тип наружного утепления фасада"
    )
    facade_cladding_material = models.CharField(
        null=True,
        blank=True,
        max_length=200,
        verbose_name="Тип наружного утепления фасада"
    )
    external_walls_wear = models.FloatField(
        null=True,
        blank=True,
        verbose_name="Физический износ, наружных стен, %"
    )
    facade_last_repair_year = models.DateField(
        null=True,
        blank=True,
        verbose_name="Год проведения последнего капитального ремонта"
    )
    floor_type_choice = (
        (1, "балочные"),
        (2, "плитные"),
        (3, "безбалочные"),
    )
    floor_type = models.IntegerField(
        null=True,
        blank=True,
        choices=floor_type_choice,
        verbose_name="Тип перекрытий"
    )
    floor_structure_choice = (
        (1, "сборная"),
        (2, "монолитная"),
        (3, "сборно-монолитная"),
        (4, "из дервянных балок"),
        (5, "из металлических балок"),
        (6, "железобетонные"),
    )
    floor_structure = models.IntegerField(
        null=True,
        blank=True,
        choices=floor_structure_choice,
        verbose_name="Конструкция перекрытий "
    )
    floor_wear = models.FloatField(
        null=True,
        blank=True,
        verbose_name="Физический износ, %"
    )
    roof_shape_choice = (
        (1, "односкатная"),
        (2, "двускатная"),
        (3, "четырехскатная"),
        (4, "многоскатная"),
        (5, "плоская"),
    )
    roof_shape = models.IntegerField(
        null=True,
        blank=True,
        choices=floor_structure_choice,
        verbose_name="Конструкция перекрытий "
    )
    roof_structure_type = models.CharField(
        null=True,
        blank=True,
        max_length=200,
        verbose_name="Вид несущей части"
    )
    roof_structure_wear = models.FloatField(
        null=True,
        blank=True,
        verbose_name="Физический износ, %"
    )
    roof_last_repair_year = models.DateField(
        null=True,
        blank=True,
        verbose_name="Год проведения последнего капитального ремонта"
    )
    attic_insulation = models.CharField(
        null=True,
        blank=True,
        max_length=200,
        verbose_name="Утепляющие слои чердачных перекрытий"
    )
    roof_cover_type_choice = (
        (1, "листовые материалы"),
        (2, "мягкие покрытия"),
        (3, "штучная отделка"),
        (4, "наливная"),
    )
    roof_cover_type = models.IntegerField(
        null=True,
        blank=True,
        choices=roof_cover_type_choice,
        verbose_name="Тип кровли"
    )
    roof_cover_wear = models.FloatField(
        null=True,
        blank=True,
        verbose_name="Физический износ, %"
    )
    roof_cover_last_repair_year = models.DateField(
        null=True,
        blank=True,
        verbose_name="Год проведения последнего капитального ремонта"
    )
    windows_wear = models.FloatField(
        null=True,
        blank=True,
        verbose_name="Физический износ, %"
    )
    windows_material = models.CharField(
        null=True,
        blank=True,
        max_length=200,
        verbose_name="Материал окон"
    )
    doors_wear = models.FloatField(
        null=True,
        blank=True,
        verbose_name="Физический износ, %"
    )
    common_area_wear = models.FloatField(
        null=True,
        blank=True,
        verbose_name="Физический износ, %"
    )
    element_name = models.CharField(
        null=True,
        blank=True,
        max_length=200,
        verbose_name="Наименование конструктивного элемента"
    )
    element_wear = models.FloatField(
        null=True,
        blank=True,
        verbose_name="Физический износ, %"
    )
    element_last_repair_year = models.DateField(
        null=True,
        blank=True,
        verbose_name="Год проведения последнего капитального ремонта"
    )
    heating_wear = models.FloatField(
        null=True,
        blank=True,
        verbose_name="Физический износ, %"
    )
    heating_last_repair_year = models.DateField(
        null=True,
        blank=True,
        verbose_name="Год проведения последнего капитального ремонта"
    )
    heating_system_type = models.CharField(
        null=True,
        blank=True,
        max_length=200,
        verbose_name="Тип внутридомовой системы отопления"
    )
    heat_source_type = models.CharField(
        null=True,
        blank=True,
        max_length=200,
        verbose_name="Тип теплоисточника или теплоносителя внутридомовой системы отопления"
    )
    heating_inlets_count = models.IntegerField(
        null=True,
        blank=True,
        verbose_name="Количество вводов системы отопления в здание (количество точек поставки)"
    )
    network_wear = models.FloatField(
        null=True,
        blank=True,
        verbose_name="Физический износ, %"
    )
    network_material = models.CharField(
        null=True,
        blank=True,
        max_length=200,
        verbose_name="Материал сети"
    )
    network_insulation_material = models.CharField(
        null=True,
        blank=True,
        max_length=200,
        verbose_name="Материал теплоизоляции сети"
    )
    risers_wear = models.FloatField(
        null=True,
        blank=True,
        verbose_name="Физический износ, %"
    )
    valves_wear = models.FloatField(
        null=True,
        blank=True,
        verbose_name="Физический износ, %"
    )
    radiators_wear = models.FloatField(
        null=True,
        blank=True,
        verbose_name="Физический износ, %"
    )
    radiators_type_choice = (
        (1, "радиаторы"),
        (2, "конвекторы"),
        (3, "полотенцесушители"),
        (4, "стеновые панели"),
        (4, "тёплые полы"),
        (4, "инфракрасные излучатели"),
    )
    radiators_type = models.IntegerField(
        null=True,
        blank=True,
        choices=radiators_type_choice,
        verbose_name="Тип отопительных приборов "
    )
    stoves_wear = models.FloatField(
        null=True,
        blank=True,
        verbose_name="Физический износ, %"
    )
    stoves_last_repair_year = models.DateField(
        null=True,
        blank=True,
        verbose_name="Год проведения последнего капитального ремонта"
    )
    cold_water_wear = models.FloatField(
        null=True,
        blank=True,
        verbose_name="Физический износ, %"
    )
    cold_water_last_repair_year = models.DateField(
        null=True,
        blank=True,
        verbose_name="Год проведения последнего капитального ремонта"
    )
    cold_water_system_type_choice = (
        (1, "хозяйственно-питьевая"),
        (2, "противопожарная/производственная"),
        (3, "совмещенная"),
    )
    cold_water_system_type = models.IntegerField(
        null=True,
        blank=True,
        choices=cold_water_system_type_choice,
        verbose_name="Тип внутридомовой инженерной системы холодного водоснабжения"
    )
    cold_water_inlets_count = models.IntegerField(
        null=True,
        blank=True,
        verbose_name="Количество вводов внутридомовой инженерной системы холодного водоснабжения в здание (количество точек поставки)"
    )
    cold_water_network_wear = models.FloatField(
        null=True,
        blank=True,
        verbose_name="Физический износ, %"
    )
    cold_water_network_material = models.CharField(
        null=True,
        blank=True,
        max_length=200,
        verbose_name="Материал сети"
    )
    only_cold_water_network_wear = models.FloatField(
        null=True,
        blank=True,
        verbose_name="Физический износ, %"
    )
    only_cold_water_network_material = models.CharField(
        null=True,
        blank=True,
        max_length=200,
        verbose_name="Материал сети"
    )
    only_cold_water_risers_wear = models.FloatField(
        null=True,
        blank=True,
        verbose_name="Физический износ, %"
    )
    only_cold_water_risers_material = models.CharField(
        null=True,
        blank=True,
        max_length=200,
        verbose_name="Материал теплоизоляции сети"
    )
    only_cold_water_valves_wear = models.FloatField(
        null=True,
        blank=True,
        verbose_name="Физический износ, %"
    )
    hot_water_wear = models.FloatField(
        null=True,
        blank=True,
        verbose_name="Физический износ, %"
    )
    hot_water_last_repair_year = models.DateField(
        null=True,
        blank=True,
        verbose_name="Год проведения последнего капитального ремонта"
    )
    hot_water_system_type_choice = (
        (1, "открытая"),
        (2, "закрытая"),
    )
    hot_water_system_type = models.IntegerField(
        null=True,
        blank=True,
        choices=hot_water_system_type_choice,
        verbose_name="Тип внутридомовой инженерной системы горячего водоснабжения "
    )
    hot_water_inlets_count = models.IntegerField(
        null=True,
        blank=True,
        verbose_name="Количество вводов внутридомовой инженерной системы горячего водоснабжения в здание (количество точек поставки)  "
    )
    hot_water_network_wear = models.FloatField(
        null=True,
        blank=True,
        verbose_name="Физический износ, %"
    )
    only_hot_water_network_material = models.CharField(
        null=True,
        blank=True,
        max_length=200,
        verbose_name="Материал сети"
    )
    only_hot_water_network_network_insulation_material = models.CharField(
        null=True,
        blank=True,
        max_length=200,
        verbose_name="Материал теплоизоляции сети"
    )
    only_hot_water_risers_wear = models.FloatField(
        null=True,
        blank=True,
        verbose_name="Физический износ, %"
    )
    only_hot_water_risers_material = models.CharField(
        null=True,
        blank=True,
        max_length=200,
        verbose_name="Материал теплоизоляции сети"
    )
    only_hot_water_valves_wear = models.FloatField(
        null=True,
        blank=True,
        verbose_name="Физический износ, %"
    )
    wastewater_wear = models.FloatField(
        null=True,
        blank=True,
        verbose_name="Физический износ, %"
    )
    wastewater_last_repair_year = models.DateField(
        null=True,
        blank=True,
        verbose_name="Год проведения последнего капитального ремонта"
    )
    wastewater_system_type_choice = (
        (1, "централизованная канализация"),
        (2, "выгребная яма"),
        (3, "локальная канализация (септик)"),
    )
    wastewater_system_type = models.IntegerField(
        null=True,
        blank=True,
        choices=wastewater_system_type_choice,
        verbose_name="Тип внутридомовой инженерной системы водоотведения "
    )
    gas_last_repair_year = models.DateField(
        null=True,
        blank=True,
        verbose_name="Год проведения последнего капитального ремонта"
    )
    gas_system_type_choice = (
        (1, "централизованная"),
        (2, "автономная"),
    )
    gas_system_type = models.IntegerField(
        null=True,
        blank=True,
        choices=gas_system_type_choice,
        verbose_name="Тип внутридомовой инженерной системы газоснабжения"
    )
    gas_inlets_count = models.IntegerField(
        null=True,
        blank=True,
        verbose_name="Количество вводов внутридомовой инженерной системы газоснабжения в здание (количество точек поставки)"
    )
    electricity_wear = models.FloatField(
        null=True,
        blank=True,
        verbose_name="Физический износ, %"
    )
    electricity_last_repair_year = models.DateField(
        null=True,
        blank=True,
        verbose_name="Год проведения последнего капитального ремонта"
    )
    electricity_inlets_count = models.IntegerField(
        null=True,
        blank=True,
        verbose_name="Количество вводов внутридомовой инженерной системы электроснабжения в здание(количество точек поставки)  "
    )
    balconies_wear = models.FloatField(
        null=True,
        blank=True,
        verbose_name="Физический износ, %"
    )
    resource_name = models.CharField(
        null=True,
        blank=True,
        max_length=200,
        verbose_name="Наименование коммунального ресурса, для измерения объемов "
                     "поставки которого используется общедомовой прибор учета "
    )
    meter_brand = models.CharField(
        null=True,
        blank=True,
        max_length=200,
        verbose_name="Марка прибора учета"
    )
    serial_number = models.CharField(
        null=True,
        blank=True,
        max_length=200,
        verbose_name="Заводской номер (серийный)"
    )
    unit = models.CharField(
        null=True,
        blank=True,
        max_length=200,
        verbose_name="Единица измерения"
    )
    commissioning_date = models.DateField(
        null=True,
        blank=True,
        verbose_name="Дата ввода в эксплуатацию"
    )
    meter_state = models.CharField(
        null=True,
        blank=True,
        max_length=200,
        verbose_name="Состояние"
    )
    verification_interval = models.CharField(
        null=True,
        blank=True,
        max_length=200,
        verbose_name="Межповерочный интервал "
    )
    planned_verification_date = models.DateField(
        null=True,
        blank=True,
        verbose_name="Плановая дата поверки "
    )
    tariff_zone_type = models.CharField(
        null=True,
        blank=True,
        max_length=200,
        verbose_name="Вид прибора учета в зависимости от тарифных зон суток "
    )
    remote_reading_cold_water = models.BooleanField(
        default=False, verbose_name="Наличие возможности дистанционного снятия показаний прибора учета холодной воды "
    )
    remote_reading_hot_water = models.BooleanField(
        default=False, verbose_name="Наличие возможности дистанционного снятия показаний прибора учета горячей воды "
    )
    remote_reading_thermal_energy = models.BooleanField(
        default=False,
        verbose_name="Наличие возможности дистанционного снятия показаний прибора учета тепловой энергии  "
    )
    remote_reading_gas = models.BooleanField(
        default=False, verbose_name="Наличие возможности дистанционного снятия показаний прибора учета газа "
    )
    remote_reading_electricity = models.BooleanField(
        default=False,
        verbose_name="Наличие возможности дистанционного снятия показаний прибора учета электрической энергии  "
    )
    created_at = models.DateTimeField(
        auto_now_add=True, editable=False, verbose_name="Дата добавления дома"
    )
    updated_at = models.DateTimeField(auto_now=True, editable=False, verbose_name="Дата обновления дома")

    def __str__(self):
        return f"{self.pk} / {self.address}"

    class Meta:
        verbose_name = "Тех. паспорт здания"
        verbose_name_plural = "Тех. паспорта зданий"


class Lift(models.Model):
    """Лифт"""
    house = models.ForeignKey(
        House,
        on_delete=models.CASCADE,
        related_name="lift",
        verbose_name="id дома"
    )
    entrance_number = models.IntegerField(
        null=True,
        blank=True,
        verbose_name="Номер подъезда, в котором расположен лифт (при наличии) "
    )
    lift_type_choice = (
        (1, "пассажирский"),
        (2, "грузовой"),
    )
    lift_type = models.IntegerField(
        default=0, choices=lift_type_choice,
        verbose_name="Тип лифта"
    )
    factory_number = models.CharField(
        max_length=200,
        unique=True,
        null=True,
        blank=True,
        verbose_name="Заводской номер"
    )
    inventory_number = models.CharField(
        max_length=200,
        unique=True,
        null=True,
        blank=True,
        verbose_name="Инвентарный номер"
    )
    load_capacity = models.IntegerField(
        verbose_name="Грузоподъемность, кг",
        null=True,
        blank=True,
    )
    commissioning_year = models.IntegerField(
        verbose_name="Год ввода в эксплуатацию",
        null=True,
        blank=True,
    )
    normative_lifetime = models.IntegerField(
        verbose_name="Нормативный срок службы",
        null=True,
        blank=True,
    )
    physical_wear = models.FloatField(
        default=0,
        verbose_name="Физический износ, %",
        null=True,
        blank=True,
    )
    last_major_repair_year = models.IntegerField(
        null=True,
        blank=True,
        verbose_name="Год последнего капитального ремонта"
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        editable=False,
        verbose_name="Дата добавления лифта"
    )
    updated_at = models.DateTimeField(auto_now=True,
                                      editable=False,
                                      verbose_name="Дата обновления лифта")

    class Meta:
        verbose_name = "Лифт"
        verbose_name_plural = "Лифты"

    def __str__(self):
        return f"Лифт №{self.factory_number} - {self.house.address}"
