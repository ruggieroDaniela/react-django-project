from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings  
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token 
    
class User(AbstractUser):
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    login_email = models.EmailField(unique=True)
    
    USERNAME_FIELD = "login_email"

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)
        
#class User2(models.Model):
#    name = models.CharField(max_length=70)
#    last_name = models.CharField(max_length=70)
#    dni = models.CharField(max_length=70)
#    contact_email = models.EmailField()
#    country = models.CharField(max_length=70)
#    cellphone_number = models.CharField(max_length=20, blank=True)
#    house_number = models.CharField(max_length=20, blank=True)

#    language = models.CharField(max_length=6)
#    contact_email = models.EmailField()
#    password = models.CharField(max_length=70)
#    mail_frecuency = models.CharField(max_length=70)

#    client_code = models.CharField(max_length=50)

#    day = models.IntegerField()
#    month = models.IntegerField()
#    year = models.IntegerField()
    