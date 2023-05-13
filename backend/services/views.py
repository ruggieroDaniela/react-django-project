from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .models import Services, ProvideService
from .serializers import ServicesSerializer, ProvideServiceSerializer

# Create your views here.
class ServicesViewSet(viewsets.ModelViewSet):
    queryset = ProvideService.objects.all()
    serializer_class = ProvideServiceSerializer

#    authentication_classes = (TokenAuthentication,)
#    permission_classes = (IsAuthenticated,)

    # Option A - "Ofrecer mis servicios como personal doméstico" 
    @action(detail=False, methods=['post'])
    def post_ad_provide(self, request):
        serializer = ProvideServiceSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'OK', 'data': request.data})
        else:
            return Response(serializer.errors, status=400)

    @action(detail=False, methods=['post'])
    def delete_all(self, request):
        ProvideService.objects.all().delete()
        return Response({'message': 'All Services objects have been deleted'})