from rest_framework import serializers
from users.models import User
from rest_framework.authtoken.models import Token
 
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'login_email']