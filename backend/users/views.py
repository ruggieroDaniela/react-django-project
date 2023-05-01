from rest_framework import viewsets
from users.models import User
from users.serializers import UserSerializer
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

def get_token_response(user):
    token, _ = Token.objects.get_or_create(user=user)
    response = {"Token": str(token)}
    return response

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        user = User.objects.get(id=response.data["id"])
        return Response(get_token_response(user), status=201)