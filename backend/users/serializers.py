from rest_framework import serializers
from rest_framework.authtoken.models import Token
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        user = User.objects.create(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        
        Token.objects.create(user=user)
        return user
    
    class Meta:
        model = User
        fields = ('id', 'email', 'password', 'first_name', 'last_name', )
        #extra_kwargs = {
        #    'password': {'write_only': True},
        #}