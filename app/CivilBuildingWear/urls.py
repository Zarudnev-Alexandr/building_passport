from django.contrib import admin
from django.urls import path
from rest_framework import routers
from . import views

router = routers.SimpleRouter()
router.register(r"api/CivilWear/House", views.HouseView, basename="House")
router.register(r"api/CivilWear/Damage", views.DamageView, basename="Damage")
router.register(r"api/CivilWear/Window", views.WindowView, basename="Window")
router.register(r"api/CivilWear/Doors", views.DoorsView, basename="Doors")

urlpatterns = [
    path(
        "api/CivilWear/house/ElementTypeDecode/ByID/<str:elem_name>/<int:input_id>",
        views.house_element_type_decode_by_id,
    ),
    path(
        "api/CivilWear/house/ElementTypeDecode/ByName/<str:elem_name>/<str:name>",
        views.house_element_type_decode_by_name,
    ),
]

urlpatterns += router.urls
