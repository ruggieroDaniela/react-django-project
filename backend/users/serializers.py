from rest_framework import serializers
from rest_framework.authtoken.models import Token
from django.contrib.auth import get_user_model
from django.db import IntegrityError
from rest_framework.exceptions import ValidationError

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        try: 
            user = User.objects.create(**validated_data)
            user.set_password(validated_data['password'])
            user.save()
            
            Token.objects.create(user=user)
            return user
        
        except IntegrityError as error:
            raise ValidationError from error
    
    class Meta:
        model = User
        fields = ('id', 'found_app_by', 'language', 'email', 'password', 'date_joined')
        extra_kwargs = {
            'password': {'write_only': True},
        }