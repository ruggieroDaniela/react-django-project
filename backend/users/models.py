from django.db import models
from django.contrib.auth.models import AbstractUser
import datetime
 
class User(AbstractUser):
    USER_CHOICES = [
        ('natural', "Natural"),
        ('enterprise', "Enterprise"),        
    ]
    
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
    type_user = models.CharField(max_length=10, choices=USER_CHOICES)
    
    #--Common
    country = models.CharField(max_length=128)
    
    #--Natural
    first_name = models.CharField(max_length=128, null=True)
    last_name = models.CharField(max_length=128, null=True)
    dni = models.CharField(max_length=128, null=True) 
    contact_email = models.EmailField(null=True)
    cellphone = models.CharField(max_length=128, null=True)
    telephone = models.CharField(max_length=128, null=True)
    
    #--Enterprise
    company_name = models.CharField(max_length=128, null=True)
    rif = models.CharField(max_length=128, null=True) 
    city = models.CharField(max_length=128, null=True)
    address = models.CharField(max_length=128, null=True)
    representant_name = models.CharField(max_length=128, null=True)
    representant_email = models.EmailField(null=True)
    representant_cellphone = models.CharField(max_length=128, null=True)
    representant_telephone = models.CharField(max_length=128, null=True)
    
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