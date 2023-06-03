from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator
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
    
    dni_regex = '^(([A-Z]-)[0-9]{1,3}\.?[0-9]{1,3}\.?[0-9]{1,3})$|^([A-Z]{1,3}[0-9]{6,7})$'
     
    def get_date_joined():
        return {"day": datetime.date.today().day, "month": datetime.date.today().month, "year": datetime.date.today().year}
    
    username = models.CharField(max_length=128, null=True)
        
    #Step 1
    found_app_by = models.JSONField(null=True)
    
    #Step 2
    type_user = models.CharField(max_length=10, choices=USER_CHOICES)
    
    #--Common
    country = models.CharField(max_length=128)
    
    #--Natural
    first_name = models.CharField(max_length=128, null=True)
    last_name = models.CharField(max_length=128, null=True)
    dni = models.CharField(
        max_length=128, 
        null=True, 
        validators=[
            RegexValidator(
                regex=dni_regex, 
                message='El campo debe ser una cédula de identidad o número de pasaporte',
                code='dni_invalido'
            )
        ]
    ) 
    
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
    
    #Step 5
    want_inform = models.BooleanField()
    frecuency_to_inform = models.CharField(max_length=128, null=True)
    services_interest = models.JSONField(null=True)
    email_to_inform = models.CharField(max_length=256, null=True)
    social_media_to_inform = models.JSONField(null=True)
    phone_to_inform = models.CharField(max_length=24, null=True)
    other_to_inform = models.CharField(max_length=256, null=True)
    facebook_to_inform = models.CharField(max_length=256, null=True)
    
    #Step 6
    bank_origin = models.CharField(max_length=128)
    bank_country = models.CharField(max_length=128)
    
    #Metadata
    client_code = models.CharField(max_length=50, default='')
    date_joined = models.JSONField(default=get_date_joined)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['password']