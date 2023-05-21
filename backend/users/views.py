from email.message import EmailMessage
import smtplib
from django.http import HttpResponse, JsonResponse
from rest_framework import viewsets, status
from backend.settings import EMAIL_HOST, EMAIL_HOST_PASSWORD, EMAIL_HOST_USER
from users.models import User
from users.serializers import UserSerializer
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.db.utils import DatabaseError
from rest_framework.decorators import action
from rest_framework.views import APIView

def get_token_key(user):
    token, _ = Token.objects.get_or_create(user=user)
    return 'Token ' + token.key

def get_hash(email):
    return abs(hash(email)) % (10 ** 9)

def get_user_data(data):
    common = ['language', 'want_inform', 'frecuency_to_inform', 'services_interest', 'email_to_inform', 'social_media_to_inform', 
              'phone_to_inform', 'other_to_inform', 'facebook_to_inform', 'bank_origin', 'bank_country', 'client_code']
    
    if(data['type_user'] == 'natural'):
        fields = ['id', 'first_name', 'last_name', 'dni', 'contact_email', 'country', 'cellphone', 'telephone'] + common
        user = {key: data[key] for key in fields}
            
    elif(data['type_user'] == 'enterprise'):
        fields = ['id', 'company_name', 'rif', 'country', 'city', 'address', 'representant_name', 'representant_cellphone', 'representant_telephone'] + common
        user = {key: data[key] for key in fields}
        
    return user

def send_password_email(user):
    receiver = "proyectoati2.2023@gmail.com" # cambiar a -> user.email
    message ='<b>Su usuario es:</b> {}.'.format(user.email) + \
            '<br>' + \
            'Adicionalmente, acabamos de recibir una solicitud para restablecer la contraseña de {}.'.format(user.email) + \
            '<br>' + \
            '<h4>Restablecer contraseña</h4>' + \
            'Haga clic aquí para restablecer su contraseña.' + \
            '<br>' + \
            'Si el enlace no funciona, copia y pega el siguiente enlace en la barra del navegador.' + \
            '<br>' + \
            '<h4>Enlace:</h4>' + \
            '[ENLACE]'

    email = EmailMessage()
    email["From"] = EMAIL_HOST_USER
    email["To"] = receiver
    email["Subject"] = "Cambio de contraseña"
    email.set_content(message, subtype="html")

    smtp = smtplib.SMTP_SSL(EMAIL_HOST)
    smtp.login(EMAIL_HOST_USER, EMAIL_HOST_PASSWORD)
    smtp.sendmail(EMAIL_HOST_USER, receiver, email.as_string())
    smtp.quit()
    return
    
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
    def get_permissions(self):
        if self.action == 'create' or 'unique_email':
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
        passed_token = request.META.get('HTTP_AUTHORIZATION')
        correct_token = get_token_key(instance)
        
        if correct_token == passed_token: 
            serializer = self.get_serializer(instance)
            data = serializer.data
            user = get_user_data(data)
            return Response(user)
        
        else:
            content = {'error': 'Invalid Token'}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)
        
    
    @action(detail=False, methods=['post'])
    def unique_email(self, request):
        email = request.data['email']
        userExists = User.objects.filter(email=email)
        if userExists: 
            return Response({'error': 'Email already exists' }, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'client_code': get_hash(email) }, status=status.HTTP_200_OK)

class CustomAuthToken(ObtainAuthToken):
    
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
    
        if serializer.is_valid():
            user = serializer.validated_data['user']
            return Response({'token': get_token_key(user), 'user_id': user.pk })
        else:
            userExists = User.objects.filter(email=request.data['username'])
            if userExists: 
                return Response({'error': 'Wrong password' }, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({'error': 'Email does not exist' }, status=status.HTTP_400_BAD_REQUEST)
            
class ForgotPasswordView(APIView):

    def post(self, request):
        id = request.data.get('id')
        email = request.data.get('email')

        try:
            user = User.objects.get(email=email, rif=id)

            send_password_email(user)

            return Response({'message': 'Acabamos de enviar tu usuario y un link para restablecer tu contraseña, al correo: {}'.format(user.email)}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'error': 'No se encontró un usuario con la identificación y correo electrónico proporcionados.'}, status=status.HTTP_404_NOT_FOUND)