from django.contrib import admin
from .models import Address, Seti, Executor, Specialist, DispatcherFullName


@admin.register(Address)
class AddressAdmin(admin.ModelAdmin):
    list_display = ("id", "object_name", "address")
    search_fields = ("object_name", "address")
    list_per_page = 20


@admin.register(Seti)
class SetiAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "address",
        "get_type_display",
        "get_applicant_type_display",
        "get_category_display",
        "get_resource_display",
        "get_avaria_display",
        "description",
        "executor",
        "specialist",
        "get_status_display",
        "due_date_start",
        "due_date_end",
        "dispatcher_full_name",
    )
    list_filter = (
        "type_choices",
        "applicant_type",
        "category_choices",
        "resource_choices",
        "status",
        "executor",
        "specialist",
    )
    search_fields = ("address__address", "description", "executor__name", "specialist__name")
    list_per_page = 20

    def get_queryset(self, request):
        queryset = super().get_queryset(request)
        return queryset.select_related("address", "executor", "specialist")

    def save_model(self, request, obj, form, change):
        """Автоматическое определение типа обращения"""
        obj.type_choices = "Repeated" if Seti.objects.filter(address=obj.address).exists() else "Primary"
        super().save_model(request, obj, form, change)

    def get_type_display(self, obj):
        return obj.get_type_display()

    get_type_display.short_description = "Тип обращения"

    def get_applicant_type_display(self, obj):
        return obj.get_applicant_type_display()

    get_applicant_type_display.short_description = "Тип заявителя"

    def get_category_display(self, obj):
        return obj.get_category_display()

    get_category_display.short_description = "Категория заявки"

    def get_resource_display(self, obj):
        return obj.get_resource_display()

    get_resource_display.short_description = "Ресурс"

    def get_status_display(self, obj):
        return obj.get_status_display()

    get_status_display.short_description = "Статус"

    def get_avaria_display(self, obj):
        """Определение, какой тип аварии отображать в зависимости от ресурса"""
        avaria_dict = {
            "Heat": dict(Seti.HEAT_AVARIA),
            "WaterSupply": dict(Seti.WATER_AVARIA),
            "Sewerage": dict(Seti.SEWERAGE_AVARIA),
            "Improvement": dict(Seti.IMPROVEMENT_AVARIA),
        }
        return avaria_dict.get(obj.resource_choices, {}).get(getattr(obj, f"{obj.resource_choices.lower()}_avaria_choices", ""), "—")

    get_avaria_display.short_description = "Объект аварии"


@admin.register(Executor)
class ExecutorAdmin(admin.ModelAdmin):
    list_display = ("id", "name")
    search_fields = ("name",)
    list_per_page = 20


@admin.register(Specialist)
class SpecialistAdmin(admin.ModelAdmin):
    list_display = ("id", "name")
    search_fields = ("name",)
    list_per_page = 20


@admin.register(DispatcherFullName)
class DispatcherFullNameAdmin(admin.ModelAdmin):
    list_display = ("id", "name")
    search_fields = ("name",)
    list_per_page = 20
