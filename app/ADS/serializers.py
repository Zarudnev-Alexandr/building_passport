from rest_framework import serializers
from .models import Address, Seti, Executor, Specialist, DispatcherFullName

class DispatcherFullNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = DispatcherFullName
        fields = '__all__'

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
    avaria_display = serializers.SerializerMethodField()
    status_display = serializers.SerializerMethodField()
    dispatcher_display = serializers.SerializerMethodField()

    address = AddressSerializer(read_only=True)
    executor = ExecutorSerializer(read_only=True)
    specialist = SpecialistSerializer(read_only=True)
    dispatcher_full_name = DispatcherFullNameSerializer(read_only=True)

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
            "avaria_display",
            "status",
            "status_display",
            "dispatcher_full_name",
            "dispatcher_display",
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
        """Возвращает текстовое значение выбора для поля type_choices"""
        return obj.get_type_choices_display()

    def get_applicant_type_display(self, obj):
        """Возвращает текстовое значение выбора для поля applicant_type"""
        return obj.get_applicant_type_display()

    def get_category_choices_display(self, obj):
        """Возвращает текстовое значение выбора для поля category_choices"""
        return obj.get_category_choices_display()

    def get_resource_choices_display(self, obj):
        """Возвращает текстовое значение выбора для поля resource_choices"""
        return obj.get_resource_choices_display()

    def get_avaria_display(self, obj):
        """Возвращает объект аварии в зависимости от ресурса"""
        if obj.resource_choices == 'Heat':
            return obj.get_heat_avaria_choices_display()
        elif obj.resource_choices == 'WaterSupply':
            return obj.get_water_avaria_choices_display()
        elif obj.resource_choices == 'Sewerage':
            return obj.get_sewerage_avaria_choices_display()
        elif obj.resource_choices == 'Improvement':
            return obj.get_improvement_avaria_choices_display()
        return None

    def get_status_display(self, obj):
        """Возвращает текстовое значение выбора для поля status"""
        return obj.get_status_display()

    def get_dispatcher_display(self, obj):
        """Возвращает ФИО диспетчера, если оно есть"""
        return obj.dispatcher_full_name.name if obj.dispatcher_full_name else None
