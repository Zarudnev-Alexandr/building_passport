from rest_framework import routers

from .views import BuildingsAPIViewSet

router = routers.SimpleRouter()

router.register(
    r"api/buildings/get-all-buildings",
    BuildingsAPIViewSet,
    basename="buildings",
)
