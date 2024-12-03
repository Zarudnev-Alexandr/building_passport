from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from . import views

app_name = "core"

urlpatterns = [
    path("api/user/profile/", views.getProfile, name="Профиль пользователя"),
    path(
        "api/user/token/",
        views.MyTokenObtainPairView.as_view(),
        name="Выдача токена",
    ),
    path(
        "api/user/token/refresh/",
        TokenRefreshView.as_view(),
        name="Обновление токена",
    ),
]
