from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from django.db.models import Count
from django.shortcuts import get_object_or_404
from .models import Address, Seti, Executor, Specialist, DispatcherFullName
from .serializers import (
    AddressSerializer, SetiSerializer, ExecutorSerializer,
    SpecialistSerializer, DispatcherFullNameSerializer
)


class AddressViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer


class SetiViewSet(viewsets.ModelViewSet):
    queryset = Seti.objects.select_related('address').all()  # Оптимизация запроса
    serializer_class = SetiSerializer

    def get_queryset(self):
        """
        Фильтрация по адресу (если передан параметр address_id).
        """
        queryset = Seti.objects.select_related('address').all()  # Оптимизация запроса
        address_id = self.request.query_params.get('address_id')
        if address_id:
            queryset = queryset.filter(address__id=address_id)
        return queryset

    @action(detail=True, methods=['get'])
    def previous_requests(self, request, pk=None):
        """
        Получение последних трех заявок по адресу.
        """
        address = get_object_or_404(Address, pk=pk)
        queryset = Seti.objects.filter(
            address=address
        ).order_by('-due_date_start')[:3]
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def request_statistics(self, request):
        """
        Получение статистики заявок по адресу за текущий год.
        """
        address_id = request.query_params.get('address_id')
        if address_id:
            statistics = Seti.objects.filter(
                address__id=address_id,
                due_date_start__year=timezone.now().year
            ).values('category_choices').annotate(count=Count('id'))

            return Response(statistics)
        return Response({"error": "address_id не указан"}, status=status.HTTP_400_BAD_REQUEST)

    def create(self, request, *args, **kwargs):
        """
        Автоматическое определение типа обращения
        (первичная/повторная) перед сохранением.
        """
        address_id = request.data.get('address')
        if not address_id:
            return Response(
                {"error": "Поле address обязательно"},
                status=status.HTTP_400_BAD_REQUEST
            )

        previous_applications_count = Seti.objects.filter(address_id=address_id).count()

        request.data['type_choices'] = 2 if previous_applications_count > 0 else 1

        return super().create(request, *args, **kwargs)

    def notify_admin(self, address_id):
        """
        Уведомление технического администратора после сохранения заявки.
        (Реализуйте по вашему сценарию: email, сообщение в Telegram и т.д.)
        """
        # Пример заглушки, замените на логику уведомления
        print(f"Уведомление: Новая заявка по адресу {address_id}")

    def perform_create(self, serializer):
        """
        Дополнительные действия после сохранения.
        """
        instance = serializer.save()
        # Дополнительная логика после сохранения, если требуется

    def perform_update(self, serializer):
        """
        Дополнительные действия после обновления.
        """
        instance = serializer.save()
        # Дополнительная логика после обновления, если требуется


class ExecutorViewSet(viewsets.ModelViewSet):
    """
    Теперь доступно редактирование списка исполнителей.
    """
    queryset = Executor.objects.all()
    serializer_class = ExecutorSerializer


class SpecialistViewSet(viewsets.ModelViewSet):
    queryset = Specialist.objects.all()
    serializer_class = SpecialistSerializer


class DispatcherFullNameViewSet(viewsets.ModelViewSet):
    """
    Представление для получения данных о диспетчерах.
    """
    queryset = DispatcherFullName.objects.all()
    serializer_class = DispatcherFullNameSerializer
