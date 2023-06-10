from rest_framework import viewsets
from banks.models import Bank
from banks.serializers import BankSerializer

class BankViewSet(viewsets.ModelViewSet):
    queryset = Bank.objects.all()
    serializer_class = BankSerializer