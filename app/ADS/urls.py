from django.urls import path
from rest_framework import routers
from .views import (
    AddressViewSet, SetiViewSet, ExecutorViewSet,
    SpecialistViewSet, DispatcherFullNameViewSet
)

router = routers.SimpleRouter()

# Адреса
router.register(
    r"api/ADS/addresses",
    AddressViewSet,
    basename="address"
)

# Заявки (Seti)
router.register(
    r"api/ADS/requests",
    SetiViewSet,
    basename="request"
)

# Исполнители
router.register(
    r"api/ADS/executors",
    ExecutorViewSet,
    basename="executor"
)

# Специалисты
router.register(
    r"api/ADS/specialists",
    SpecialistViewSet,
    basename="specialist"
)

# Диспетчер
router.register(
    r"api/ADS/dispatchers",
    DispatcherFullNameViewSet,
    basename="dispatcher"
)

urlpatterns = [
    # Получение последних трех заявок по адресу
    path(
        "api/ADS/requests/check_previous_applications/",
        SetiViewSet.as_view({'get': 'check_previous_applications'}),
        name="check-previous-applications"
    ),

    # Получение статистики заявок по адресу за текущий год
    path(
        "api/ADS/requests/request_statistics/",
        SetiViewSet.as_view({'get': 'request_statistics'}),
        name="request-statistics"
    ),
]

urlpatterns += router.urls
