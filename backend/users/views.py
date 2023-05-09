from rest_framework import viewsets, status
from users.models import User
from users.serializers import UserSerializer
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.db import IntegrityError
from django.db.utils import DatabaseError

def get_token_key(user):
    token, _ = Token.objects.get_or_create(user=user)
    return 'Token ' + token.key

def get_user_data(data):
    if(data['type_user'] == 'natural'):
        user = {key: data[key] 
                for key in ['id', 'first_name', 'last_name', 'dni', 'contact_email', 'country',
                            'cellphone', 'telephone', 'language', 'client_code'
                    ]
                }    
    elif(data['type_user'] == 'enterprise'):
        user = {key: data[key] 
                for key in ['id', 'company_name', 'rif', 'country', 'city', 'address',
                            'representant_name', 'representant_cellphone', 'representant_telephone', 
                            'language', 'client_code'
                    ]
                }   
    return user
    
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
    def get_permissions(self):
        if self.action == 'create':
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]

        return [permission() for permission in permission_classes]
    
    def create(self, request, *args, **kwargs):
        try: 
            response = super().create(request, *args, **kwargs)
            id = response.data["id"]
            user = User.objects.get(id=id)
            return Response({'token': get_token_key(user), 'user_id': id}, status=201)
        except DatabaseError:
            content = {'error': 'There is already a user with this email'}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)
        
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        data = serializer.data
        user = get_user_data(data)
        
        return Response(user)
    
class CustomAuthToken(ObtainAuthToken):
    
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        return Response({'token': get_token_key(user), 'user_id': user.pk })