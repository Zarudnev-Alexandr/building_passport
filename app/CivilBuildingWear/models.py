from django.db import models

from buildings.models import House


class CivilBuilding(models.Model):
    originalHouse = models.ForeignKey(House,
                                      on_delete=models.CASCADE,
                                      verbose_name="id оригинального здания")

    HouseType = models.IntegerField(
        default=0, verbose_name="Тип дома"
    )
    yearOperation = models.CharField(
        max_length=200, verbose_name="Год введения в эксплуатацию"
    )
    address = models.CharField(
        max_length=200, unique=True, verbose_name="Адрес"
    )
    houseArea = models.FloatField(
        default=0, verbose_name="Площадь дома"
    )
    floorCount = models.IntegerField(
        default=0, verbose_name="Количество этажей"
    )
    undergroundFloorCount = models.IntegerField(
        default=0, verbose_name="Количество подземных этажей"
    )
    BuildingArea = models.FloatField(
        default=0, verbose_name="Площадь здания"
    )
    ConstractionYear = models.IntegerField(
        default=0, verbose_name="Год постройки"
    )
    foundationChoice = (
        (1, "столбчатые деревянные с забиркой"),
        (2, "столбчатые,  каменные с кирпичным цоколем"),
        (3, "ленточные каменные"),
        (4, "ленточные крупноблочные"),
        (5, "свайные столбчатые каменные, бетонные и железобетонные"),
    )
    foundationType = models.IntegerField(
        default=0, choices=foundationChoice, verbose_name="Тип фундамента"
    )
    WallChoice = (
        (1, "деревянные, сборно-щитовые"),
        (2, "деревянные каркасные"),
        (3, "рубленные из бревен и брусчатые"),
        (4, "деревянные рубленные, каркасные и брусчатые с наружной облицовкой кирпичом"),
        (5, "кирпичные"),
        (6, "кирпичные с облицовкой керамическими блоками и плитками"),
        (7, "из мелких блоков, искусственных и естественных камней"),
        (8, "из крупноразмерных блоков и однослойных несущих панелей"),
        (9, "из слоистых железобетонных панелей"),
        (10, "из несущих панелей"),
    )
    wallType = models.IntegerField(
        default=0, choices=WallChoice, verbose_name="Тип стен"
    )
    FloorChoice = (
        (1, "деревянные неоштукатуренные"),
        (2, "из кирпичных сводов по стальным балкам"),
        (3, "из двухскорлупных железобетонных прокатных панелей"),
        (4, "из сборного железобетонного настила"),
        (5, "из сборных и монолитных сплошных плит"),
        (6, "монолитные и сборные железобетонные балки покрытий и перекрытий"),
    )
    floorType = models.IntegerField(
        default=0, choices=FloorChoice, verbose_name="Тип пола"
    )
    BalconyChoice = (
        (1, "сборные железобетонные детали лоджий"),
        (2, "балконы, козырьки, эркеры"),
    )
    balconyType = models.IntegerField(
        default=0, choices=BalconyChoice, verbose_name="Тип балкона"
    )
    RoofChoice = (
        (1, "деревянные"),
        (2, "железобетонные сборные (чердачные)"),
        (3, "совмещенные из сборных железобетонных слоистых панелей"),
    )
    roofType = models.IntegerField(
        default=0, choices=RoofChoice, verbose_name="Тип крыши"
    )
    roofingChoice = (
        (1, "рулонные"),
        (2, "мастичные"),
        (3, "стальные"),
        (4, "из асбестоцементных листов"),
        (5, "черепичные"),
        (6, "драночные"),
        (7, "тесовые"),
    )
    roofingType = models.IntegerField(
        default=0, choices=roofingChoice, verbose_name="Тип кровли"
    )
    AppointmentChose = (
        (1, 'Административное'),
        (2, 'Образовательное'),
        (3, 'Медицинское'),
        (4, 'Общежитие'),
    )
    appointment = models.IntegerField(
        default=0, choices=AppointmentChose, verbose_name="Назначение"
    )

    foundationVolume = models.IntegerField(
        default=0, verbose_name="Объем фундамента"
    )
    wallVolume = models.IntegerField(
        default=0, verbose_name="Объем стен"
    )
    floorVolume = models.IntegerField(
        default=0, verbose_name="Объем пола"
    )
    balconyVolume = models.IntegerField(
        default=0, verbose_name="Объем балкона"
    )
    roofVolume = models.IntegerField(
        default=0, verbose_name="Объем крыши"
    )
    roofingVolume = models.IntegerField(
        default=0, verbose_name="Объем кровли"
    )
    sewerageLength = models.IntegerField(
        default=0, verbose_name="Длина канализации"
    )
    chuteLength = models.IntegerField(
        default=0, verbose_name="Длина мусоропровода"
    )
    centralHeatingLength = models.IntegerField(
        default=0, verbose_name="Длина центрального отопления"
    )
    coldWaterSupplyLength = models.IntegerField(
        default=0, verbose_name="Длина холодного водоснабжения"
    )
    hotWaterSupplyLength = models.IntegerField(
        default=0, verbose_name="Длина горячего водоснабжения"
    )
    wiringLength = models.IntegerField(
        default=0, verbose_name="Длина проводки"
    )

    basement = models.BooleanField(default=False, verbose_name="Подвал")
    outbuilding = models.BooleanField(default=False, verbose_name="Пристройка")
    attic = models.BooleanField(default=False, verbose_name="Чердак")
    sewerage = models.BooleanField(default=False, verbose_name="Канализация")
    elevator = models.BooleanField(default=False, verbose_name="Лифт")
    GarbageChute = models.BooleanField(default=False, verbose_name="Мусоропровод")
    CentralHeating = models.BooleanField(default=False, verbose_name="Центральное отопление")
    CentralColdWatterSupply = models.BooleanField(default=False, verbose_name="Холодное водоснабжение")
    CentralHotWatterSupply = models.BooleanField(default=False, verbose_name="Горячее водоснабжение")
    ElectricalWiring = models.BooleanField(default=False, verbose_name="Electrical wiring")

    balconyCount = models.IntegerField(
        default=0, verbose_name="Количество балконов"
    )
    lodjiCount = models.IntegerField(
        default=0, verbose_name="Количество лоджий"
    )
    canopyCount = models.IntegerField(
        default=0, verbose_name="Количество навесов"
    )
    orielCount = models.IntegerField(
        default=0, verbose_name="Количество эркеров"
    )

    organizationMKD = models.CharField(
        max_length=200,
        verbose_name="Организация, осуществляющая управление МКД",
    )
    yearConstruction = models.CharField(
        max_length=200, verbose_name="Год постройки"
    )
    lifeStageChoice = (
        (1, "эксплуатация"),
        (2, "модернизация"),
        (3, "реконструкция"),
        (4, "капитальный ремонт"),
    )
    lifeStage = models.IntegerField(
        default=0,
        choices=lifeStageChoice,
        verbose_name="Стадия жизненного цикла",
    )
    yearReconstruction = models.CharField(
        max_length=200, verbose_name="Год проведения рекомнструкции"
    )
    NumberApartments = models.IntegerField(
        default=0, verbose_name="кол-во комнат в общежитии"
    )
    buildingVolume = models.IntegerField(
        default=0, verbose_name="Объем здания"
    )
    buildingWidth = models.IntegerField(
        default=0, verbose_name="Ширина здания"
    )
    buildingLength = models.IntegerField(
        default=0, verbose_name="Длинна здания"
    )
    WallHeight = models.FloatField(
        default=0, verbose_name="Высота стен"
    )
    FoundationWallsArea = models.FloatField(
        default=0, verbose_name="Площадь стен фундамента"
    )
    BalconyaArea = models.FloatField(
        default=0, verbose_name="Общая площадь балконов"
    )
    BuildingWallsArea = models.FloatField(
        default=0, verbose_name="Площадь стен здания"
    )
    LoadBearingArea = models.FloatField(
        default=0, verbose_name="Общая площадь несущих конструкций"
    )
    FloorArea = models.FloatField(
        default=0, verbose_name="Общая площадь перекрытия"
    )
    RoofArea = models.FloatField(
        default=0, verbose_name="Общая площадь крыши"
    )
    HotWaterSystem = models.FloatField(
        default=0, verbose_name="Система горячего водоснабжения"
    )
    CentralHeatingSystem = models.FloatField(
        default=0, verbose_name="Система центрального отопления"
    )
    ColdWaterSystem = models.FloatField(
        default=0, verbose_name="Система холодного водоснабжения"
    )
    SewageSystem = models.FloatField(
        default=0, verbose_name="Система канализаций"
    )
    ElectricalSystem = models.FloatField(
        default=0, verbose_name="Система электрооборудования"
    )
    TrashChutes = models.FloatField(
        default=0, verbose_name="Мусоропроводы"
    )
    comment = models.TextField(
        blank=True, null=True, verbose_name="Комментарий"
    )

    class Meta:
        verbose_name = "Расчетная информация о здании"
        verbose_name_plural = "Расчетная информация о зданиях"

    def __str__(self):
        return str(self.id)


class CivilBuildingDamage(models.Model):
    idHouse = models.ForeignKey(CivilBuilding, on_delete=models.CASCADE)
    position = models.TextField(max_length=100)
    data = models.DateField()
    HouseElementChoice = (
        (0, "фундамент"),
        (1, "стена"),
        (2, "пол"),
        (3, "балкон"),
        (4, "крыша"),
        (5, "кровля"),
        (6, "канализация"),
        (7, "мусоропровод"),
        (8, "центральное отопление"),
        (9, "холодное водоснабжение"),
        (10, "горячее водоснабжение"),
        (11, "электропроводка"),
    )
    Element = models.IntegerField(choices=HouseElementChoice)
    volume = models.FloatField()
    degreeOfDamage = models.IntegerField()

    class Meta:
        verbose_name = "Износ здания"
        verbose_name_plural = "Износ зданий"

    def __str__(self):
        return str(self.idHouse)


# Класс размера окон
class Window(models.Model):
    idHouse = models.ForeignKey(CivilBuilding, on_delete=models.CASCADE)
    position = models.TextField(max_length=100)
    height = models.IntegerField(null=False)
    width = models.IntegerField(null=False)
    count = models.IntegerField(default=0)

    class Meta:
        verbose_name = "Окно"
        verbose_name_plural = "Окна"

    def __str__(self):
        return str(self.idHouse) + " " + str(self.position) + " " + str(self.height) + "x" + str(self.width)


class Doors(models.Model):
    idHouse = models.ForeignKey(CivilBuilding, on_delete=models.CASCADE)
    position = models.TextField(max_length=100)
    height = models.IntegerField(null=False)
    width = models.IntegerField(null=False)
    count = models.IntegerField(default=0)

    class Meta:
        verbose_name = "Дверь"
        verbose_name_plural = "Двери"

    def __str__(self):
        return str(self.idHouse) + " " + str(self.position) + " " + str(self.height) + "x" + str(self.width)
