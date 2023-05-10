from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Services
from .serializers import ServicesSerializer

# Create your views here.
class ServicesViewSet(viewsets.ModelViewSet):
    queryset = Services.objects.all()
    serializer_class = ServicesSerializer

    @action(detail=False, methods=['post'])
    def post_ad(self, request):
        serializer = ServicesSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'OK'})
        else:
            return Response(serializer.errors, status=400)