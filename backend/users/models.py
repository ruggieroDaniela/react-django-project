from django.db import models

class User(models.Model):
    name = models.CharField(max_length=70, blank=False)
    last_name = models.CharField(max_length=70, blank=False)
    email = models.EmailField(blank=False)