from django.db import models
from django.contrib.auth.models import AbstractUser
import datetime
 
class User(AbstractUser):
    LENGUAGE_CHOICES = [
        ('es', "Spanish"),
        ('en', "English"),
    ]
    
    def get_date_joined():
        return {"day": datetime.date.today().day, "month": datetime.date.today().month, "year": datetime.date.today().year}
    
    username = models.CharField(max_length=128, null=True)
        
    #Step 1
    found_app_by = models.CharField(max_length=256)
    
    #Step 2
    first_name = models.CharField(max_length=128)
    last_name = models.CharField(max_length=128)

    #Step 3
    language = models.CharField(max_length=2, choices=LENGUAGE_CHOICES)
    
    #Step 4 - Credentials
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    
    #Metadata
    client_code = models.CharField(max_length=50, default='')
    date_joined = models.JSONField(default=get_date_joined)
    
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


#    contact_email = models.EmailField()
#    password = models.CharField(max_length=70)
#    mail_frecuency = models.CharField(max_length=70)