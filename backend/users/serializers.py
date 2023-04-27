from rest_framework import serializers, viewsets
from users.models import User
 
 
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'name' , 'last_name', 'email')