from django.db import models

class Bank(models.Model):
    name = models.CharField(max_length = 256)
    account = models.CharField(max_length = 256)
    swift_code = models.CharField(max_length = 256)
    country = models.CharField(max_length = 256)
    
    REQUIRED_FIELDS = ['name', 'account', 'swift_code', 'country']