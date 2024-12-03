from rest_framework import mixins, viewsets
from rest_framework.permissions import IsAuthenticated

from app.buildings.models import House
from app.core.permissions import IsAdminOrReadOnly


class BaseViewSet(
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


class BuildingsAPIViewSet(BaseViewSet):
    queryset = House.objects.all()

