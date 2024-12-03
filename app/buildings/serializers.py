from rest_framework import serializers

from buildings.models import House, Lift


class BuildingsListSerializer(serializers.ModelSerializer):
    class Meta:
        model = House
        fields = ("id", "address")

class BuildingsDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = House
        fields = "__all__"


class LiftsListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lift
        fields = ("id", "factory_number", "lift_type")

class LiftsDetailSerializer(serializers.ModelSerializer):
    house_address = serializers.CharField(source="house.address", read_only=True)

    class Meta:
        model = Lift
        fields = "__all__"