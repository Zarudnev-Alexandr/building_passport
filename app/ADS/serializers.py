from rest_framework import serializers
from .models import Address, Seti, Executor, Specialist

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'

class ExecutorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Executor
        fields = '__all__'

class SpecialistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Specialist
        fields = '__all__'

class SetiSerializer(serializers.ModelSerializer):
    type_choices_display = serializers.SerializerMethodField()
    applicant_type_display = serializers.SerializerMethodField()
    category_choices_display = serializers.SerializerMethodField()
    resource_choices_display = serializers.SerializerMethodField()
    avaria_choices_display = serializers.SerializerMethodField()
    status_display = serializers.SerializerMethodField()

    address = AddressSerializer(read_only=True)
    executor = ExecutorSerializer(read_only=True)
    specialist = SpecialistSerializer(read_only=True)

    class Meta:
        model = Seti
        fields = (
            "id",
            "type_choices",
            "type_choices_display",
            "applicant_type",
            "applicant_type_display",
            "category_choices",
            "category_choices_display",
            "resource_choices",
            "resource_choices_display",
            "avaria_choices",
            "avaria_choices_display",
            "status",
            "status_display",
            "address",
            "full_name",
            "telephone",
            "email",
            "description",
            "executor",
            "specialist",
            "due_date_start",
            "due_date_end",
        )

    def get_type_choices_display(self, obj):
        return obj.get_type_choices_display()

    def get_applicant_type_display(self, obj):
        return obj.get_applicant_type_display()

    def get_category_choices_display(self, obj):
        return obj.get_category_choices_display()

    def get_resource_choices_display(self, obj):
        return obj.get_resource_choices_display()

    def get_avaria_choices_display(self, obj):
        return obj.get_avaria_choices_display()

    def get_status_display(self, obj):
        return obj.get_status_display()
