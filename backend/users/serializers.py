from rest_framework import serializers
from rest_framework.authtoken.models import Token
from users.models import User

class UserSerializer(serializers.ModelSerializer):
        
    def create(self, validated_data):
        user = User.objects.create(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        
        Token.objects.create(user=user)
        return user
    
    class Meta:
        model = User
        fields = '__all__'
        extra_kwargs = {
            'password': {'write_only': True},
        }

class ChangePasswordSerializer(serializers.Serializer):
    new_password = serializers.CharField(required=True)
    confirm_password = serializers.CharField(required=True)