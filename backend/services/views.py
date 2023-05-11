from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .models import Services
from .serializers import ServicesSerializer

# Create your views here.
class ServicesViewSet(viewsets.ModelViewSet):
    queryset = Services.objects.all()
    serializer_class = ServicesSerializer

    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    @action(detail=False, methods=['post'])
    def post_ad(self, request):
        serializer = ServicesSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'OK'})
        else:
            return Response(serializer.errors, status=400)