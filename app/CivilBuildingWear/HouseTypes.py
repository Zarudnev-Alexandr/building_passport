from dataclasses import dataclass
from enum import Enum

FoundationTypesDict = [
    {
        "EnTypeName": "WOODEN_PILLAR",
        "RusName": "столбчатые деревянные с забиркой",
        "id": 1,
    },
    {
        "EnTypeName": "STONE_PILLAR",
        "RusName": "столбчатые,  каменные с кирпичным цоколем",
        "id": 2,
    },
    {"EnTypeName": "STONE_STRIP", "RusName": "ленточные каменные", "id": 3},
    {
        "EnTypeName": "LARGE_BLOCK_STRIP",
        "RusName": "ленточные крупноблочные",
        "id": 4,
    },
    {
        "EnTypeName": "PILE_STONE",
        "RusName": "свайные столбчатые каменные, бетонные и железобетонные",
        "id": 5,
    },
]


class FoundationEnum(Enum):
    WOODEN_PILLAR = 1
    STONE_PILLAR = 2
    STONE_STRIP = 3
    LARGE_BLOCK_STRIP = 4
    PILE_STONE = 5


WallTypesDict = [
    {
        "EnTypeName": "WOODEN_PANEL",
        "RusName": "деревянные, сборно-щитовые",
        "id": 1,
    },
    {"EnTypeName": "WOODEN_FRAME", "RusName": "деревянные каркасные", "id": 2},
    {
        "EnTypeName": "LOG_AND_TIMBER",
        "RusName": "рубленные из бревен и брусчатые",
        "id": 3,
    },
    {
        "EnTypeName": "LOG_AND_TIMBER_BRICK",
        "RusName": "деревянные рубленные, каркасные и брусчатые с наружной облицовкой кирпичом",
        "id": 4,
    },
    {"EnTypeName": "BRICK", "RusName": "кирпичные", "id": 5},
    {
        "EnTypeName": "BRICK_CERAMIC",
        "RusName": "кирпичные с облицовкой керамическими блоками и плитками",
        "id": 6,
    },
    {
        "EnTypeName": "SMALL_BLOCK",
        "RusName": "из мелких блоков, искусственных и естественных камней",
        "id": 7,
    },
    {
        "EnTypeName": "LARGE_BLOCK",
        "RusName": "из крупноразмерных блоков и однослойных несущих панелей",
        "id": 8,
    },
    {
        "EnTypeName": "REINFORCED_CONCRETE_LAYERED",
        "RusName": "из слоистых железобетонных панелей",
        "id": 9,
    },
    {
        "EnTypeName": "REINFORCED_CONCRETE_BEARING",
        "RusName": "из несущих панелей",
        "id": 10,
    },
]


class WallEnum(Enum):  # Типы стен
    WOODEN_PANEL = 1
    WOODEN_FRAME = 2
    LOG_AND_TIMBER = 3
    LOG_AND_TIMBER_BRICK = 4
    BRICK = 5
    BRICK_CERAMIC = 6
    SMALL_BLOCK = 7
    LARGE_BLOCK = 8
    REINFORCED_CONCRETE_LAYERED = 9
    REINFORCED_CONCRETE_BEARING = 10


FloorTypesDict = [
    {
        "EnName": "WOODEN_UNPLASTERED",
        "RusName": "деревянные неоштукатуренные",
        "id": 1,
    },
    {
        "EnName": "BRICK_ARCH_STEEL_BEAM",
        "RusName": "из кирпичных сводов по стальным балкам",
        "id": 2,
    },
    {
        "EnName": "REINFORCED_CONCRETE_ROLLING_PANEL",
        "RusName": "из двухскорлупных железобетонных прокатных панелей",
        "id": 3,
    },
    {
        "EnName": "REINFORCED_CONCRETE_DECKING",
        "RusName": "из сборного железобетонного настила",
        "id": 4,
    },
    {
        "EnName": "REINFORCED_CONCRETE_SOLID_PLATE",
        "RusName": "из сборных и монолитных сплошных плит",
        "id": 5,
    },
    {
        "EnName": "REINFORCED_CONCRETE_BEAM_COVERING",
        "RusName": "монолитные и сборные железобетонные балки покрытий и перекрытий",
        "id": 6,
    },
]


class FloorEnum(Enum):  # Типы перекрытий
    WOODEN_UNPLASTERED = 1
    BRICK_ARCH_STEEL_BEAM = 2
    REINFORCED_CONCRETE_ROLLING_PANEL = 3
    REINFORCED_CONCRETE_DECKING = 4
    REINFORCED_CONCRETE_SOLID_PLATE = 5
    REINFORCED_CONCRETE_BEAM_COVERING = 6

WindowTypesDict = [
    {
        "EnName": "WINDOW_850_1150",
        "RusName": "850*1150",
        "id": 1,
    },
    {
        "EnName": "WINDOW_1150_1900",
        "RusName": "1150*1900",
        "id": 2,
    },
    {
        "EnName": "WINDOW_1300_2200",
        "RusName": "1300*2200",
        "id": 3,
    },
    {
        "EnName": "WINDOW_1450_1500",
        "RusName": "1450*1500",
        "id": 4,
    },
    {
        "EnName": "WINDOW_2400_2100",
        "RusName": "2400*2100",
        "id": 5,
    },
    {
        "EnName": "ADD",
        "RusName": "Добавить",
        "id": 6,
    },
]


class WindowsEnum(Enum):  # Типы ширины оконных проёмов
    WINDOW_850_1150 = 1
    WINDOW_1150_1900 = 2
    WINDOW_1300_2200 = 3
    WINDOW_1450_1500 = 4
    WINDOW_2400_2100 = 5
    ADD = 6


BalconyTypesDict = [
    {
        "EnTypeName": "REINFORCED_CONCRETE_LODGE_PARTS",
        "RusName": "сборные железобетонные детали лоджий",
        "id": 1,
    },
    {
        "EnTypeName": "BALCONY_CANOPY_BAY_WINDOW",
        "RusName": "балконы, козырьки, эркеры",
        "id": 2,
    },
]


class BalconyEnum(Enum):  # Типы лодж и балконов
    REINFORCED_CONCRETE_LODGE_PARTS = 1
    BALCONY_CANOPY_BAY_WINDOW = 2


RoofTypesDict = [
    {"EnTypeName": "WOODEN", "RusName": "деревянные", "id": 1},
    {
        "EnTypeName": "REINFORCED_CONCRETE_ASSEMBLED_ATTIC",
        "RusName": "железобетонные сборные (чердачные)",
        "id": 2,
    },
    {
        "EnTypeName": "COMBINED_REINFORCED_CONCRETE_LAYERED_PANELS",
        "RusName": "совмещенные из сборных железобетонных слоистых панелей",
        "id": 3,
    },
]


class RoofEnum(Enum):  # типы крыш
    WOODEN = 1
    REINFORCED_CONCRETE_ASSEMBLED_ATTIC = 2
    COMBINED_REINFORCED_CONCRETE_LAYERED_PANELS = 3


RoofingTypesDict = [
    {"EnName": "ROLLING", "RusName": "рулонные", "id": 1},
    {"EnName": "MASTIC", "RusName": "мастичные", "id": 2},
    {"EnName": "STEEL", "RusName": "стальные", "id": 3},
    {
        "EnName": "ASBESTOS_CEMENT_SHEET",
        "RusName": "из асбестоцементных листов",
        "id": 4,
    },
    {"EnName": "TILE", "RusName": "черепичные", "id": 5},
    {"EnName": "SHINGLE", "RusName": "драночные", "id": 6},
    {"EnName": "SHINGLE_WOODEN", "RusName": "тесовые", "id": 7},
]


class RoofingEnum(Enum):  # типы кровли
    ROLLING = 1
    MASTIC = 2
    STEEL = 3
    ASBESTOS_CEMENT_SHEET = 4
    TILE = 5
    SHINGLE = 6
    SHINGLE_WOODEN = 7


# класс содержащий информацию о здании
@dataclass
class HouseInformation:
    floorCount: int
    foundation: int
    wall: int
    floor: int
    balcony: int
    roof: int
    roofing: int


HouseElementDict = {
    "foundation": 0,
    "wall": 1,
    "floor": 2,
    "balcony": 3,
    "roof": 4,
    "roofing": 5,
    "sewerage": 6,
    "chute": 7,
    "centralHeating": 8,
    "coldWaterSupply": 9,
    "hotWaterSupply": 10,
    "wiring": 11,
    "window": 12,
}
engineeringsystems = {}


# перечисление типов элементов здания
class HouseElementEnum(Enum):
    foundation = 0
    wall = 1
    floor = 2
    balcony = 3
    roof = 4
    roofing = 5
    sewerage = 6
    chute = 7
    centralHeating = 8
    coldWaterSupply = 9
    hotWaterSupply = 10
    wiring = 11
    window = 12


# класс хранящий информацию о размерных характеристиках здания
@dataclass
class HouseSize:
    floorCount: int
    house_full_size: int
    foundationVolume: int
    wallVolume: int
    floorVolume: int
    balconyVolume: int
    roofVolume: int
    roofingVolume: int
    sewerageLength: int
    chuteLength: int
    centralHeatingLength: int
    coldWaterSupplyLength: int
    hotWaterSupplyLength: int
    wiringLength: int


def GetIdByRusName(element: HouseElementEnum, name: str) -> int:
    match element:
        case HouseElementEnum.foundation:
            for i in FoundationTypesDict:
                if i["RusName"] == name:
                    return i["id"]
        case HouseElementEnum.wall:
            for i in WallTypesDict:
                if i["RusName"] == name:
                    return i["id"]
        case HouseElementEnum.floor:
            for i in FloorTypesDict:
                if i["RusName"] == name:
                    return i["id"]
        case HouseElementEnum.balcony:
            for i in BalconyTypesDict:
                if i["RusName"] == name:
                    return i["id"]
        case HouseElementEnum.roof:
            for i in RoofTypesDict:
                if i["RusName"] == name:
                    return i["id"]
        case HouseElementEnum.roofing:
            for i in RoofingTypesDict:
                if i["RusName"] == name:
                    return i["id"]
        case HouseElementEnum.window:
            for i in WindowTypesDict:
                if i["RusName"] == name:
                    return i["id"]
        case _:
            return -1
    return -1


def GetIdByEnName(element: HouseElementEnum, name: str) -> int:
    match element:
        case HouseElementEnum.foundation:
            for i in FoundationTypesDict:
                if i["EnTypeName"] == name:
                    return i["id"]
        case HouseElementEnum.wall:
            for i in WallTypesDict:
                if i["EnTypeName"] == name:
                    return i["id"]
        case HouseElementEnum.floor:
            for i in FloorTypesDict:
                if i["EnTypeName"] == name:
                    return i["id"]
        case HouseElementEnum.balcony:
            for i in BalconyTypesDict:
                if i["EnTypeName"] == name:
                    return i["id"]
        case HouseElementEnum.roof:
            for i in RoofTypesDict:
                if i["EnTypeName"] == name:
                    return i["id"]
        case HouseElementEnum.roofing:
            for i in RoofingTypesDict:
                if i["EnTypeName"] == name:
                    return i["id"]
        case HouseElementEnum.window:
            for i in WindowTypesDict:
                if i["EnTypeName"] == name:
                    return i["id"]
        case _:
            return -1
    return -1


def GetRusNameByID(element: HouseElementEnum, id: int) -> str:
    match element:
        case HouseElementEnum.foundation:
            for i in FoundationTypesDict:
                if i["id"] == id:
                    return i["RusName"]
        case HouseElementEnum.wall:
            for i in WallTypesDict:
                if i["id"] == id:
                    return i["RusName"]
        case HouseElementEnum.floor:
            for i in FloorTypesDict:
                if i["id"] == id:
                    return i["RusName"]
        case HouseElementEnum.balcony:
            for i in BalconyTypesDict:
                if i["id"] == id:
                    return i["RusName"]
        case HouseElementEnum.roof:
            for i in RoofTypesDict:
                if i["id"] == id:
                    return i["RusName"]
        case HouseElementEnum.roofing:
            for i in RoofingTypesDict:
                if i["id"] == id:
                    return i["RusName"]
        case HouseElementEnum.window:
            for i in WindowTypesDict:
                if i["id"] == id:
                    return i["RusName"]
        case _:
            return "NotFound"
    return "NotFound"


def GetEnNameByID(element: HouseElementEnum, id: int) -> str:
    match element:
        case HouseElementEnum.foundation:
            for i in FoundationTypesDict:
                if i["id"] == id:
                    return i["EnTypeName"]
        case HouseElementEnum.wall:
            for i in WallTypesDict:
                if i["id"] == id:
                    return i["EnTypeName"]
        case HouseElementEnum.floor:
            for i in FloorTypesDict:
                if i["id"] == id:
                    return i["EnTypeName"]
        case HouseElementEnum.balcony:
            for i in BalconyTypesDict:
                if i["id"] == id:
                    return i["EnTypeName"]
        case HouseElementEnum.roof:
            for i in RoofTypesDict:
                if i["id"] == id:
                    return i["EnTypeName"]
        case HouseElementEnum.roofing:
            for i in RoofingTypesDict:
                if i["id"] == id:
                    return i["EnTypeName"]
        case HouseElementEnum.window:
            for i in WindowTypesDict:
                if i["id"] == id:
                    return i["EnTypeName"]
        case _:
            return "NotFound"
    return "NotFound"
