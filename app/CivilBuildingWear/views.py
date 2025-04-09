import rest_framework.exceptions
from core.models import Profile
from core.permissions import IsAdminOrReadOnly
from django.http import HttpResponse
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import generics, mixins, status, viewsets
from rest_framework.decorators import action, api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from . import HouseTypes, Iznos, models, serializers


class View:
    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        if self.action == "destroy":
            permission_classes = [IsAdminOrReadOnly]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def dispatch(self, request, *args, **kwargs):
        try:
            req = self.initialize_request(request, *args, **kwargs)
            profile_info = Profile.objects.get(user=req.user.id)
            if not profile_info.wear_access:
                raise PermissionError("No access")
            return super(View, self).dispatch(request, *args, **kwargs)
        except rest_framework.exceptions.AuthenticationFailed as ea:
            return HttpResponse(str(ea), status=status.HTTP_403_FORBIDDEN)
        except PermissionError as e:
            return HttpResponse({str(e)}, status=status.HTTP_403_FORBIDDEN)
        except Profile.DoesNotExist:
            return HttpResponse("Profile not found", status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return HttpResponse(str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class HouseView(
    View,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet,
):
    serializer_class = serializers.CivilBuildingSerializer
    permission_classes = [IsAdminOrReadOnly]

    def get_queryset(self):
        queryset = models.CivilBuilding.objects.all()
        return queryset

    @action(
        detail=False,
        url_name="house_by_address",
        url_path="houseByAddress/(?P<address>[^/.]+)",
        pagination_class=None,
    )
    def house_by_address(self, request, address):
        """
        Возвращает дом по адресу
        """
        try:
            houseSerializer = serializers.CivilBuildingSerializer(
                models.CivilBuilding.objects.filter(address=address), many=True
            )
            return Response(houseSerializer.data)
        except serializers.ValidationError as e:
            return Response(
                {"error": "Invalid data", "detail": str(e)},
                status=status.HTTP_400_BAD_REQUEST,
            )
        except models.CivilBuilding.DoesNotExist:
            return Response(
                {
                    "error": "House not found",
                    "detail": f"No house with address {address}",
                },
                status=status.HTTP_404_NOT_FOUND,
            )
        except Exception as e:
            return Response(
                {"error": "Internal server error", "detail": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    @action(
        detail=False,
        url_name="find_house_id_by_address",
        url_path="findHouseIdByAddress/(?P<address>[^/.]+)",
        pagination_class=None,
    )
    def find_house_id_by_address(self, request, address):
        """
        Возвращает идентификатор дома по адресу.
        """
        try:
            data = models.CivilBuilding.objects.get(address=address)
            return Response({"id": data.id})
        except models.CivilBuilding.DoesNotExist:
            return Response(
                {"error": "House not found"}, status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                {"error": f"Internal server error: {e}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    @action(
        detail=False,
        url_name="get_all_addresses",
        url_path="getAllAddresses",
        pagination_class=None,
    )
    def get_all_addresses(self, request):
        """
        Возвращает список всех адресов домов в базе данных.
        """
        try:
            data = models.CivilBuilding.objects.all()
            rez = {}
            for i in data:
                rez[i.id] = i.address
            return Response(rez)
        except Exception as e:
            return Response({"error": str(e)}, status=500)


    @action(
        detail=False,
        url_name="house_element_wear",
        url_path="houseElementWear/(?P<input_id>[^/.]+)/(?P<element_type>[^/.]+)",
        pagination_class=None,
    )
    def house_element_wear(self, request, element_type, input_id):
        """
        Возвращает износ по элементам
        """
        try:
            input_id = int(input_id)
            element_type = int(element_type)
            house_id = input_id
            damages_data = models.CivilBuildingDamage.objects.filter(idHouse=house_id)
            windows = models.Window.objects.filter(id=house_id)
            windows_area = 0
            for window in windows:
                windows_area += (window.height * window.width)*window.count
            doors = models.Doors.objects.filter(id=house_id)
            doors_area = 0
            for door in doors:
                doors_area += (door.height * door.width) * door.count
            match element_type:
                case 0:
                    number = Iznos.CalcSummWearFoundation(
                        models.CivilBuilding.objects.get(id=house_id).foundationVolume,
                        damages_data,
                    )
                    return Response({"rez": number})
                case 1:
                    volume = models.CivilBuilding.objects.get(id=house_id).wallVolume - windows_area - doors_area
                    if volume < 0:
                        raise ValueError("Площадь стен меньше 0")
                    number = Iznos.CalcSummWearWall(
                        volume,
                        damages_data,
                    )
                    return Response({"rez": number})
                case 2:
                    number = Iznos.CalcSummWearFloor(
                        models.CivilBuilding.objects.get(id=house_id).floorVolume,
                        damages_data,
                    )
                    return Response({"rez": number})
                case 3:
                    number = Iznos.CalcSummWearBalcony(
                        models.CivilBuilding.objects.get(id=house_id).balconyVolume,
                        damages_data,
                    )
                    return Response({"rez": number})
                case 4:
                    number = Iznos.CalcSummWearRoof(
                        models.CivilBuilding.objects.get(id=house_id).roofVolume,
                        damages_data,
                    )
                    return Response({"rez": number})
                case 5:
                    number = Iznos.CalcSummWearRoofing(
                        models.CivilBuilding.objects.get(id=house_id).roofingVolume,
                        damages_data,
                    )
                    return Response({"rez": number})
                case 6:
                    number = Iznos.calc_summ_wear_engineering_systems(
                        models.CivilBuilding.objects.get(id=house_id).sewerageLength,
                        damages_data,
                        6,
                    )
                    return Response({"rez": number})
                case 7:
                    number = Iznos.calc_summ_wear_engineering_systems(
                        models.CivilBuilding.objects.get(id=house_id).chuteLength,
                        damages_data,
                        7,
                    )
                    return Response({"rez": number})
                case 8:
                    number = Iznos.calc_summ_wear_engineering_systems(
                        models.CivilBuilding.objects.get(
                            id=house_id
                        ).centralHeatingLength,
                        damages_data,
                        8,
                    )
                    return Response({"rez": number})
                case 9:
                    number = Iznos.calc_summ_wear_engineering_systems(
                        models.CivilBuilding.objects.get(
                            id=house_id
                        ).coldWaterSupplyLength,
                        damages_data,
                        9,
                    )
                    return Response({"rez": number})
                case 10:
                    number = Iznos.calc_summ_wear_engineering_systems(
                        models.CivilBuilding.objects.get(
                            id=house_id
                        ).hotWaterSupplyLength,
                        damages_data,
                        10,
                    )
                    return Response({"rez": number})
                case 11:
                    number = Iznos.calc_summ_wear_engineering_systems(
                        models.CivilBuilding.objects.get(id=house_id).wiringLength,
                        damages_data,
                        11,
                    )
                    return Response({"rez": number})
                case _:
                    return Response(
                        {"rez": "Ошибка типа элемента"}, status=500
                    )
        except models.CivilBuilding.DoesNotExist:
            return Response(
                {"error": "House not found"}, status=status.HTTP_404_NOT_FOUND
            )
        except ValueError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(
                {"error": "Internal server error " + str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class DamageView(
    View,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    viewsets.GenericViewSet,
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
):
    serializer_class = serializers.CivilBuildingDamageSerializer
    permission_classes = [IsAdminOrReadOnly]

    def get_queryset(self):
        queryset = models.CivilBuildingDamage.objects.all()
        return queryset

    @action(
        detail=False,
        url_name="damages-by-house",
        url_path=r"damagesByHouseID/(?P<input_id>[^/.]+)",
        pagination_class=None,
    )
    def damages_by_house(self, request, input_id):
        """
        Возвращает список повреждений дома по его ID.
        """
        try:
            input_id = int(input_id)
            damage_serializer = serializers.CivilBuildingDamageSerializer(
                models.CivilBuildingDamage.objects.filter(idHouse=input_id), many=True
            )
            return Response(damage_serializer.data)
        except serializers.ValidationError as e:
            return Response(
                {"error": "Invalid data", "detail": str(e)},
                status=status.HTTP_400_BAD_REQUEST,
            )
        except models.CivilBuildingDamage.DoesNotExist:
            return Response(
                {
                    "error": "Damages not found",
                    "detail": f"No damages with HouseId {input_id}",
                },
                status=status.HTTP_404_NOT_FOUND,
            )
        except Exception as e:
            return Response(
                {"error": "Internal server error", "detail": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    @action(
        detail=False,
        url_name="damage_by_element",
        url_path="damageByElement/(?P<input_id>[^/.]+)/(?P<element_type>[^/.]+)",
        pagination_class=None,
    )
    def damage_by_element(self, request, input_id, element_type):
        """
        Возвращает список повреждений дома по заданному ID и типу элемента.
        """
        try:
            input_id = int(input_id)
            damageSerializer = serializers.CivilBuildingDamageSerializer(
                models.CivilBuildingDamage.objects.filter(
                    idHouse=input_id, Element=element_type
                ),
                many=True,
            )
            return Response(damageSerializer.data)
        except serializers.ValidationError as e:
            return Response(
                {"error": "Invalid data", "detail": str(e)},
                status=status.HTTP_400_BAD_REQUEST,
            )
        except models.CivilBuildingDamage.DoesNotExist:
            return Response(
                {
                    "error": "Damages not found",
                    "detail": f"No damages with HouseId {input_id} and Element {HouseTypes.HouseElementEnum(element_type)}",
                },
                status=status.HTTP_404_NOT_FOUND,
            )
        except Exception as e:
            return Response(
                {"error": "Internal server error", "detail": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class WindowView(
    View,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    viewsets.GenericViewSet,
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
):
    serializer_class = serializers.CivilBuildingWindowSerializer
    permission_classes = [IsAdminOrReadOnly]

    def get_queryset(self):
        queryset = models.CivilBuildingDamage.objects.all()
        return queryset

class DoorsView(
    View,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    viewsets.GenericViewSet,
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
):
    serializer_class = serializers.CivilBuildingDoorsSerializer
    permission_classes = [IsAdminOrReadOnly]

    def get_queryset(self):
        queryset = models.CivilBuildingDamage.objects.all()
        return queryset

def check_authorize(request):
    try:
        profile_info = Profile.objects.get(user=request.user.id)
    except Exception as e:
        raise PermissionError("No access")
    return profile_info.wear_access


# region TypeDecodeViewMethodsAndOther


@swagger_auto_schema(method="GET")
@api_view(["GET"])
def house_element_type_decode_by_id(request, elem_name, input_id):
    """
    Получить названия типов по названию типа элемента и ID типа в перечислении
    """
    try:
        check_authorize(request)
        return Response(
            {
                "RusName": HouseTypes.GetRusNameByID(
                    HouseTypes.HouseElementEnum(
                        HouseTypes.HouseElementDict[elem_name.lower()]
                    ),
                    input_id,
                ),
                "EnName": HouseTypes.GetEnNameByID(
                    HouseTypes.HouseElementEnum(
                        HouseTypes.HouseElementDict[elem_name.lower()]
                    ),
                    input_id,
                ),
            }
        )
    except PermissionError as pe:
        return Response({"error": str(pe)}, status=status.HTTP_403_FORBIDDEN)
    except KeyError as ke:
        return Response(
            {"error": f"Invalid element name: {elem_name}"},
            status=status.HTTP_400_BAD_REQUEST,
        )
    except Exception as e:
        return Response(
            {"error": "Internal server error"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@swagger_auto_schema(method="GET")
@api_view(["GET"])
def house_element_type_decode_by_name(request, elem_name, name):
    """
    Получить ID типов по названию типа элемента и названию типа в перечислении
    """
    try:
        check_authorize(request)
        rez = HouseTypes.GetIdByRusName(
            HouseTypes.HouseElementEnum(
                HouseTypes.HouseElementDict[elem_name.lower()]
            ),
            name,
        )
        if rez == -1:
            rez = HouseTypes.GetIdByEnName(
                HouseTypes.HouseElementEnum(
                    HouseTypes.HouseElementDict[elem_name.lower()]
                ),
                name,
            )

        return Response({"ID": rez})
    except PermissionError as pe:
        return Response({"error": str(pe)}, status=status.HTTP_403_FORBIDDEN)
    except KeyError as ke:
        return Response(
            {"error": f"Invalid element name: {elem_name}"},
            status=status.HTTP_400_BAD_REQUEST,
        )
    except Exception as e:
        return Response(
            {"error": "Internal server error"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


# endregion
