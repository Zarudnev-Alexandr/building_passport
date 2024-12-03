from django.contrib import admin

from .models import *


@admin.register(House)
class HouseAdmin(admin.ModelAdmin):
    list_display = (
        "pk",
        "address",
        "manage_org",
        "created_at",
        "updated_at",
    )
    search_fields = list_display


@admin.register(Lift)
class LiftAdmin(admin.ModelAdmin):
    list_display = (
        "pk",
        "house_address",
        "entrance_number",
        "lift_type",
        "factory_number",
        "inventory_number",
        "load_capacity",
        "commissioning_year",
        "normative_lifetime",
        "physical_wear",
        "last_major_repair_year",
        "created_at",
        "updated_at"
    )
    search_fields = (
        "factory_number",
        "inventory_number",
        "house__address"
    )

    def house_address(self, obj):
        return obj.house.address

    house_address.short_description = "Адрес дома"