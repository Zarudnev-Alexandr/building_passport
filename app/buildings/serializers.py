from rest_framework import serializers

from buildings.models import House, Lift


class LiftSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lift
        fields = "__all__"


class BuildingsListSerializer(serializers.ModelSerializer):
    class Meta:
        model = House
        fields = ("id", "address")


class BuildingsDetailSerializer(serializers.ModelSerializer):
    lifts = serializers.SerializerMethodField()

    class Meta:
        model = House
        fields = "__all__"

    def get_lifts(self, obj):
        lifts = obj.lift.all()
        return LiftSerializer(lifts, many=True).data


class LiftsListSerializer(serializers.ModelSerializer):
    house_api_url = serializers.SerializerMethodField()

    class Meta:
        model = Lift
        fields = ("id", "factory_number", "lift_type", "house_api_url", "house")

    def get_house_api_url(self, obj):
        request = self.context.get('request')
        if obj.house_id:
            return request.build_absolute_uri(f'/api/buildings/building/{obj.house_id}/')
        return None


class LiftsDetailSerializer(serializers.ModelSerializer):
    house_address = serializers.CharField(source="house.address", read_only=True)
    house_api_url = serializers.SerializerMethodField()

    class Meta:
        model = Lift
        fields = "__all__"

    def get_house_api_url(self, obj):
        request = self.context.get('request')
        if obj.house_id:
            return request.build_absolute_uri(f'/api/buildings/building/{obj.house_id}/')
        return None
