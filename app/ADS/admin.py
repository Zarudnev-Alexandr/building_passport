from django.contrib import admin
from .models import Address, Seti, Executor, Specialist

@admin.register(Address)
class AddressAdmin(admin.ModelAdmin):
    list_display = ("id", "object_name", "address")
    search_fields = list_display
    list_per_page = 20

@admin.register(Seti)
class SetiAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "address",
        "type_choices",
        "applicant_type",
        "category_choices",
        "resource_choices",
        "avaria_choices",
        "description",
        "executor",
        "specialist",
        "status",
        "due_date_start",
        "due_date_end",
    )
    list_filter = (
        "type_choices",
        "applicant_type",
        "category_choices",
        "resource_choices",
        "avaria_choices",
        "status",
        "executor",
        "specialist",
    )
    search_fields = ("address__address", "description", "executor__name", "specialist__name")
    list_per_page = 20

    def get_queryset(self, request):
        queryset = super().get_queryset(request)
        queryset = queryset.select_related('address', 'executor', 'specialist')
        return queryset

    def save_model(self, request, obj, form, change):
        # Автоматическое определение типа обращения
        previous_applications_count = Seti.objects.filter(address=obj.address).count()
        if previous_applications_count > 0:
            obj.type_choices = 2  # Повторная
        else:
            obj.type_choices = 1  # Первичная
        super().save_model(request, obj, form, change)

@admin.register(Executor)
class ExecutorAdmin(admin.ModelAdmin):
    list_display = ("id", "name")
    search_fields = list_display
    list_per_page = 20

@admin.register(Specialist)
class SpecialistAdmin(admin.ModelAdmin):
    list_display = ("id", "name")
    search_fields = list_display
    list_per_page = 20