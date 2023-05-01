from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    username = models.CharField(max_length=128, null=True)
    
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    
    first_name = models.CharField(max_length=128)
    last_name = models.CharField(max_length=128)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['password']


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
    