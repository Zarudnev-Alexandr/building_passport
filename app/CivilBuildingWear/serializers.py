from rest_framework import serializers

from . import models


class CivilBuildingSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CivilBuilding
        fields = "__all__"


class CivilBuildingDamageSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CivilBuildingDamage
        fields = "__all__"

class CivilBuildingWindowSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Window
        fields = "__all__"
class CivilBuildingDoorsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Doors
        fields = "__all__"