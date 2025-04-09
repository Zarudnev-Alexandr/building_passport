from dataclasses import dataclass
import CivilBuildingWear.HouseTypes as HouseTypes

# класс где описывается поврежденный участок здания
# position-место повреждения описанное работником,
# Element-тип повреждённого элемента импорт из HouseTypes
# volume- площадь повреждения
# degreeOfDamage-уровень повреждения по оценке работника


class WeightsError(Exception):
    pass


@dataclass
class Damage:
    position: str
    data: str
    Element: HouseTypes.HouseElementEnum
    volume: float
    degreeOfDamage: int


# region SummWearByElement
# Суммарный износ фундамента


def CalcSummWearFoundation(houseElementSize, houseElementDamages):
    rez = 0
    for i in houseElementDamages:
        if (
            HouseTypes.HouseElementEnum(i.Element)
            == HouseTypes.HouseElementEnum.foundation
        ):
            rez += calc_relative_wear(houseElementSize, i)
    return rez


# Суммарный износ стен


def CalcSummWearWall(houseElementSize, houseElementDamages):
    rez = 0
    for i in houseElementDamages:
        if (
            HouseTypes.HouseElementEnum(i.Element)
            == HouseTypes.HouseElementEnum.wall
        ):
            rez += calc_relative_wear(houseElementSize, i)
    return rez


# Суммарный износ перекрытий


def CalcSummWearFloor(houseElementSize, houseElementDamages):
    rez = 0
    for i in houseElementDamages:
        if (
            HouseTypes.HouseElementEnum(i.Element)
            == HouseTypes.HouseElementEnum.floor
        ):
            rez += calc_relative_wear(houseElementSize, i)
    return rez


# Суммарный износ балконов


def CalcSummWearBalcony(houseElementSize, houseElementDamages):
    rez = 0
    for i in houseElementDamages:
        if (
            HouseTypes.HouseElementEnum(i.Element)
            == HouseTypes.HouseElementEnum.balcony
        ):
            rez += calc_relative_wear(houseElementSize, i)
    return rez


# Суммарный износ крыши


def CalcSummWearRoof(houseElementSize, houseElementDamages):
    rez = 0
    for i in houseElementDamages:
        if (
            HouseTypes.HouseElementEnum(i.Element)
            == HouseTypes.HouseElementEnum.roof
        ):
            rez += calc_relative_wear(houseElementSize, i)
    return rez


# Суммарный износ кровли


def CalcSummWearRoofing(houseElementSize, houseElementDamages):
    rez = 0
    for i in houseElementDamages:
        if (
            HouseTypes.HouseElementEnum(i.Element)
            == HouseTypes.HouseElementEnum.roofing
        ):
            rez += calc_relative_wear(houseElementSize, i)
    return rez


def calc_summ_wear_engineering_systems(
    houseElementSize, houseElementDamages, element_type
):
    rez = 0
    match element_type:
        case 6:
            for i in houseElementDamages:
                if (
                    HouseTypes.HouseElementEnum(i.Element)
                    == HouseTypes.HouseElementEnum.sewerage
                ):
                    rez += calc_relative_wear_engineering_systems(
                        houseElementSize, i
                    )
        case 7:
            for i in houseElementDamages:
                if (
                    HouseTypes.HouseElementEnum(i.Element)
                    == HouseTypes.HouseElementEnum.chute
                ):
                    rez += calc_relative_wear_engineering_systems(
                        houseElementSize, i
                    )
        case 8:
            for i in houseElementDamages:
                if (
                    HouseTypes.HouseElementEnum(i.Element)
                    == HouseTypes.HouseElementEnum.centralHeating
                ):
                    rez += calc_relative_wear_engineering_systems(
                        houseElementSize, i
                    )
        case 9:
            for i in houseElementDamages:
                if (
                    HouseTypes.HouseElementEnum(i.Element)
                    == HouseTypes.HouseElementEnum.coldWaterSupply
                ):
                    rez += calc_relative_wear_engineering_systems(
                        houseElementSize, i
                    )
        case 10:
            for i in houseElementDamages:
                if (
                    HouseTypes.HouseElementEnum(i.Element)
                    == HouseTypes.HouseElementEnum.hotWaterSupply
                ):
                    rez += calc_relative_wear_engineering_systems(
                        houseElementSize, i
                    )
        case 11:
            for i in houseElementDamages:
                if (
                    HouseTypes.HouseElementEnum(i.Element)
                    == HouseTypes.HouseElementEnum.wiring
                ):
                    rez += calc_relative_wear_engineering_systems(
                        houseElementSize, i
                    )
    return rez


# endregion

# region RelativeWear
# относительный урон конкретного участка к всей площади фундамента


def calc_relative_wear(houseElementSize, damage):
    return (damage.volume / houseElementSize) * damage.degreeOfDamage


def calc_relative_wear_engineering_systems(houseElementSize, damage):
    return (damage.volume / houseElementSize) * damage.degreeOfDamage


# endregion
