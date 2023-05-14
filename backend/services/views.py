from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .models import ProvideService, RequestService
from .serializers import ProvideServiceSerializer, RequestServiceSerializer

# Option A - "Ofrecer mis servicios como personal doméstico"
class ProvideServiceViewSet(viewsets.ModelViewSet):
    queryset = ProvideService.objects.all()
    serializer_class = ProvideServiceSerializer

#    authentication_classes = (TokenAuthentication,)
#    permission_classes = (IsAuthenticated,)

    @action(detail=False, methods=['post'])
    def post_ad(self, request):
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


# Option B - "Solicitar personal doméstico"
class RequestServiceViewSet(viewsets.ModelViewSet):
    queryset = RequestService.objects.all()
    serializer_class = RequestServiceSerializer    

    #    authentication_classes = (TokenAuthentication,)
    #    permission_classes = (IsAuthenticated,)

    @action(detail=False, methods=['post'])
    def post_ad(self, request):
        serializer = RequestServiceSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'OK', 'data': request.data})
        else:
            return Response(serializer.errors, status=400)
    