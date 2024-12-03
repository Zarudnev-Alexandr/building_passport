from rest_framework import routers

from buildings.views import BuildingsAPIViewSet, BuildingMinInfoAPIViewSet, LiftsAPIViewSet

router = routers.SimpleRouter()

router.register(
    r"api/buildings/building",
    BuildingsAPIViewSet,
    basename="building",
)

router.register(
    r"api/buildings/buildings-list",
    BuildingMinInfoAPIViewSet,
    basename="buildings-list",
)

router.register(
    r"api/buildings/lifts",
    LiftsAPIViewSet,
    basename="lifts",
)

urlpatterns = [*router.urls]