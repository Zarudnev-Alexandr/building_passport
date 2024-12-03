from django.contrib import admin
from django.urls import path, include
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions

schema_view = get_schema_view(
    openapi.Info(
        title="Новая прога для зданий",
        default_version="v1",
        description="Интеграция с сервисами для передачи данных из БД",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="razerfuuu@mail.ru"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)



urlpatterns = [
    path('admin/', admin.site.urls),
    path("", include("buildings.urls"), name="Здания"),
    path("", include("core.urls"), name="Авторизация"),

    path(
        "swagger/",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="Swagger API UI",
    ),

]
