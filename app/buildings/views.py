import rest_framework
from django.http import HttpResponse
from rest_framework import mixins, viewsets, status
from rest_framework.permissions import IsAuthenticated

from buildings.models import House, Lift
from buildings.serializers import BuildingsListSerializer, BuildingsDetailSerializer, LiftsListSerializer, \
    LiftsDetailSerializer
from core.models import Profile
from core.permissions import IsAdminOrReadOnly


class AllViewSet(
    mixins.RetrieveModelMixin,
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet,
):
    """
    Basic view model
    """

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        if self.action == "destroy":
            permission_classes = [IsAdminOrReadOnly]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def operator(self, request, *args, **kwargs):
        try:
            req = self.initialize_request(request, *args, **kwargs)
            profile_info = Profile.objects.get(user=req.user.id)
            if not profile_info.db_access:
                raise PermissionError("No access")
            return super(MinViewSet, self).dispatch(request, *args, **kwargs)
        except rest_framework.exceptions.AuthenticationFailed as ea:
            return HttpResponse(str(ea), status=status.HTTP_403_FORBIDDEN)
        except PermissionError as e:
            return HttpResponse({str(e)}, status=status.HTTP_403_FORBIDDEN)
        except Profile.DoesNotExist:
            return HttpResponse("Profile not found", status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return HttpResponse(str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class MinViewSet(
    mixins.ListModelMixin,
    viewsets.GenericViewSet,
):
    """
    Basic view model
    """

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        if self.action == "destroy":
            permission_classes = [IsAdminOrReadOnly]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def operator(self, request, *args, **kwargs):
        try:
            req = self.initialize_request(request, *args, **kwargs)
            profile_info = Profile.objects.get(user=req.user.id)
            if not profile_info.db_access:
                raise PermissionError("No access")
            return super(MinViewSet, self).dispatch(request, *args, **kwargs)
        except rest_framework.exceptions.AuthenticationFailed as ea:
            return HttpResponse(str(ea), status=status.HTTP_403_FORBIDDEN)
        except PermissionError as e:
            return HttpResponse({str(e)}, status=status.HTTP_403_FORBIDDEN)
        except Profile.DoesNotExist:
            return HttpResponse("Profile not found", status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return HttpResponse(str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class LiftsViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet,

):
    """
    Basic view model
    """

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        if self.action == "destroy":
            permission_classes = [IsAdminOrReadOnly]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def operator(self, request, *args, **kwargs):
        try:
            req = self.initialize_request(request, *args, **kwargs)
            profile_info = Profile.objects.get(user=req.user.id)
            if not profile_info.db_access:
                raise PermissionError("No access")
            return super(MinViewSet, self).dispatch(request, *args, **kwargs)
        except rest_framework.exceptions.AuthenticationFailed as ea:
            return HttpResponse(str(ea), status=status.HTTP_403_FORBIDDEN)
        except PermissionError as e:
            return HttpResponse({str(e)}, status=status.HTTP_403_FORBIDDEN)
        except Profile.DoesNotExist:
            return HttpResponse("Profile not found", status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return HttpResponse(str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class BuildingsAPIViewSet(AllViewSet):
    queryset = House.objects.prefetch_related("lift").all()

    def get_serializer_class(self):
        if self.action == "list":
            return BuildingsListSerializer
        return BuildingsDetailSerializer


class BuildingMinInfoAPIViewSet(MinViewSet):
    queryset = House.objects.only("id", "address")

    def get_serializer_class(self):
        if self.action == "list":
            return BuildingsListSerializer
        return BuildingsDetailSerializer



class LiftsAPIViewSet(LiftsViewSet):
    queryset = Lift.objects.select_related("house").all()

    def get_serializer_class(self):
        if self.action == "list":
            return LiftsListSerializer
        return LiftsDetailSerializer
