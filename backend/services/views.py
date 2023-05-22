from django.shortcuts import render, get_object_or_404, get_list_or_404
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter
from .models import ProvideService, RequestService
from .serializers import ProvideServiceSerializer, RequestServiceSerializer
from django.db.utils import DatabaseError

# Option A - "Ofrecer mis servicios como personal doméstico"
class ProvideServiceViewSet(viewsets.ModelViewSet):
    queryset = ProvideService.objects.all()
    serializer_class = ProvideServiceSerializer
    http_method_names = ['get', 'post', 'delete', 'put'] 

    # Authorization
    #authentication_classes = (TokenAuthentication,)
    #permission_classes = (IsAuthenticated,)

    # Filters. Option C - "Buscar personal doméstico"
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_fields = {
        # Búsqueda rápida
        'continent': ["exact"], 
        'country': ['exact', 'in'], 
        'state': ['exact', 'in'], 
        'service': ['exact', 'in'], 

        # Búsqueda personalizada 
        'workday' : ['exact'], 
        'schedule': ['exact'], 
        'payment': ['exact'],        
        'payment_amount': ['range'], 
        'salary_offered': ['exact'], 
        'currency': ['exact'], 
        'currency_other': ['exact'], 
        'benefits': ['exact'], 
        'availability': ['exact'], 
        'availability_date' : ['exact'],
    }
    ordering_fields = ['payment_amount', 'availability_date', 'created_at']

    # Post ad 
    @action(detail=False, methods=['post'])
    def post_ad(self, request):
        serializer = ProvideServiceSerializer(data=request.data)

        if serializer.is_valid():
            post = serializer.save()
            return Response({'message': 'OK', 'post_code': post.id})
        else:
            return Response(serializer.errors, status=400)
        
    # See my posts
    def retrieve(self, request, pk=None):
        queryset = self.queryset.filter(user=pk)
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)
    
    # Get post
    @action(detail=False, methods=['get'])
    def get_post(self, request, pk=None):
        try: 
            queryset = self.queryset.get(id=pk)
            serializer = self.serializer_class(queryset, many=False)
            return Response(serializer.data)
        except ProvideService.DoesNotExist:
            return Response({'message': 'Not found'}, status=404)
    
    # Enable post
    @action(detail=False, methods=['put'])
    def enable_post(self, request, pk=None):
        try:
            queryset = self.queryset.get(id=pk)
            queryset.enable = not queryset.enable
            queryset.save()
            if queryset.enable:
                return Response({'message': 'The post is now available'})
            else:
                return Response({'message': 'The post is now unavailable'})
        except ProvideService.DoesNotExist:
            return Response({'message': 'Not found'}, status=404)

    # Delete a post
    @action(detail=False, methods=['delete'])
    def delete_post(self, request, pk=None):
        try:
            queryset = self.queryset.get(id=pk)
            queryset.delete()
            return Response({"message": "Post deleted"})
        except ProvideService.DoesNotExist:
            return Response({'message': 'Not found'}, status=404)
        
        

# Option B - "Solicitar personal doméstico"
class RequestServiceViewSet(viewsets.ModelViewSet):
    queryset = RequestService.objects.all()
    serializer_class = RequestServiceSerializer    

    # Authorization
    #authentication_classes = (TokenAuthentication,)
    #permission_classes = (IsAuthenticated,)

    # Filters. Option D - Buscar Clientes
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_fields = {
        # Búsqueda rápida
        'continent': ["exact"], 
        'country': ['exact', 'in'], 
        'state': ['exact', 'in'], 
        'city': ['exact'], 
    #    'client_type': ['exact'], 
        'service': ['exact', 'in'], 

        # Búsqueda personalizada 
        'workday' : ['exact', 'in'], 
        'schedule': ['exact', 'in'], 
        'payment': ['exact'],        
        'payment_amount': ['range'], 
        'salary_offered': ['exact'], 
        'currency': ['exact'], 
        'currency_other': ['exact'], 
        'benefits': ['exact'], 
        'availability': ['exact'], 
        'availability_date' : ['exact'],
    }
    ordering_fields = ['payment_amount', 'availability_date', 'created_at']

    # Post ad
    @action(detail=False, methods=['post'])
    def post_ad(self, request):
        serializer = RequestServiceSerializer(data=request.data)

        if serializer.is_valid():
            post = serializer.save()
            return Response({'message': 'OK', 'post_code(id)': post.id})
        else:
            return Response(serializer.errors, status=400)
        
    # See my posts
    def retrieve(self, request, pk=None):
        queryset = self.queryset.filter(user=pk)
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    # Get post
    @action(detail=False, methods=['get'])
    def get_post(self, request, pk=None):
        try: 
            queryset = self.queryset.get(id=pk)
            serializer = self.serializer_class(queryset, many=False)
            return Response(serializer.data)
        except DatabaseError:
            return Response({'message': 'Not found'}, status=404)

    # Enable post
    @action(detail=False, methods=['put'])
    def enable_post(self, request, pk=None):
        try:
            queryset = self.queryset.get(id=pk)
            queryset.enable = not queryset.enable
            queryset.save()
            if queryset.enable:
                return Response({'message': 'The post is now available'})
            else:
                return Response({'message': 'The post is now unavailable'})
        except RequestService.DoesNotExist:
            return Response({'message': 'Not found'}, status=404)
         
    # Delete
    @action(detail=False, methods=['delete'])
    def delete_post(self, request, pk=None):
        try:
            queryset = self.queryset.get(id=pk)
            queryset.delete()
            return Response({"message": "Post deleted"})
        except RequestService.DoesNotExist:
            return Response({'message': 'Not found'}, status=404)
    





        
        
