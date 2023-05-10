from django.db import models

# Create your models here.
class Services(models.Model):

    # Choices
    EDUCATION_LEVEL_CHOICES = (
        ('PRI', 'Primaria'),
        ('TEC', 'Técnico Univeristario'), 
        ('BAC', 'Bachillerato'), 
        ('UNI', 'Universitario'), 
    )

    WORKDAY_CHOICES = (
        ('SEMANAL', 'Semanal'),
        ('QUINCENAL', 'Quincenal'), 
        ('MENSUAL', 'Mensual'), 
        ('INTERDIARIO', 'Interdiario'),
        ('MEDIO_TIEMPO', 'Medio tiempo'),
        ('FIN_SEMANA', 'Fin de Semana'),
        ('NOCHE', 'En la noche'),
        ('HORAS', 'Por horas'),
        ('OTRO', 'Otro')
    )

    SCHEDULE_CHOICES = (
        ('LUN', 'Lunes'), 
        ('MAR', 'Martes'),
        ('MIE', 'Miércoles'),
        ('JUE', 'Jueves'),
        ('VIE', 'Viernes'), 
        ('SAB', 'Sábado'),
        ('DOM', 'Domingo'),
        ('LUN_VIE', 'De Lunes a Viernes'),
        ('FIN', 'Fin de semana'),
        ('OTRO', 'Otros a considerar')
    )

    PAYMENT_CHOICES = (
        ('MONTO', 'Monto'),
        ('CONVENIR', 'A convenir')
    )

    CURRENCY_CHOICES = (
        ('USD', 'USD'), 
        ('EUR', 'EUR'), 
        ('OTRA', "Otra")
    )

    SALARY_OFFERED_CHOICES = (
        ('HORA', 'Por hora'),
        ('DIA' , 'Por dia'),
        ('SEMANAL', 'Semanal'),
        ('QUINCENAL', 'Quincenal'),
        ('MENSUAL', 'Mensual')
    )

    AVAILABILITY_CHOICES = (
        ('FECHA', 'Fecha de Inicio'),
        ('CONVENIR', 'A convenir')
    )

    ORIGIN_CHOICES = (
        ('NO', 'Me es indiferente'),
        ('SI', 'Quiero especificar la procedencia del cliente')
    )

    CLIENT_TYPE_CHOICES = (
        ('NAT', 'Natural'),
        ('EMP', 'Empresa'),
        ('NO', 'Me es indiferente si es persona natural o empresa')
    )

    DOCUMENTS_CHOICES = (
        ('PASAPORTE', 'Documento de identidad o pasaporte'),
        ('CURRICULUM', 'Currículum actualizado'),
        ('TITULOS', 'Títulos o certificados'), 
        ('REF_TRABAJO', 'Referencias comprobables de trabajo'), 
        ('REF_FAMILIAR', 'Referencias familiares indicando nombre y apellido, teléfono local, Teléfono móvil, correo electrónico (opcional), y dirección'), 
        ('CONST_RESIDENCIA', 'Constancia de residencia'), 
        ('CONST_ANTECEDENTES', 'Constancia de no poseer antecedentes penales'), 
        ('SALUD', 'Certificado de salud'), 
        ('OTRO', 'Otro documento')
    )

    PUBLICATION_CHOICES = (
        ('1', '1 mes'), 
        ('3', '3 meses'), 
        ('6', '6 meses'), 
        ('9', '9 meses'), 
        ('12', '12 meses')
    )

    # Fields
    # 1 - Basic data
    age = models.PositiveIntegerField(blank=False)
    have_children = models.BooleanField(blank=False)
    education_level = models.CharField(blank=False, max_length=3, choices=EDUCATION_LEVEL_CHOICES)

    # 2 - Place of Origin 
    country = models.TextField(blank=False)
    state = models.TextField(blank=False)
    city = models.TextField(blank=False)
    zone = models.TextField(blank=True)

    # 3 - Job description
    description = models.TextField(blank=False)

    # 4 - Availability to travel 
    travel = models.BooleanField(blank=False)
    travel_decription = models.TextField(blank=True)

    # 5 - Activities 
    activities = models.TextField(blank=False)

    # 6 - Working Conditions
    workday = models.CharField(blank=False, max_length=15, choices=WORKDAY_CHOICES)
    workday_other = models.TextField(blank=True)

    schedule = models.CharField(blank=False, max_length=7, choices=SCHEDULE_CHOICES)
    schedule_other = models.TextField(blank=True)
    
    # Salary
    payment = models.CharField(blank=False, max_length=8, choices=PAYMENT_CHOICES)
    payment_amount = models.DecimalField(max_digits=8, decimal_places=2)
    currency = models.CharField(blank=False, max_length=4, choices=CURRENCY_CHOICES)
    currency_other = models.TextField(blank=True)
    salary_offered = models.CharField(blank=False, max_length=9, choices=SALARY_OFFERED_CHOICES)

    benefits = models.BooleanField(blank=False)
    benefits_description = models.TextField(blank=True)

    # 7 - Availability to start 
    availability = models.CharField(blank=False, max_length=8, choices=AVAILABILITY_CHOICES)
    availability_date = models.DateField(blank=True)

    # 8 - Customers i want to work with
    origin = models.CharField(blank=False, max_length=2, choices=ORIGIN_CHOICES)
    origin_continent = models.TextField(blank=True)
    origin_country = models.TextField(blank=True)
    origin_state = models.TextField(blank=True)
    origin_city = models.TextField(blank=True)
    client_type = models.CharField(blank=True, max_length=3, choices=CLIENT_TYPE_CHOICES)
    
    # 9 - Documents 
    have_documentation = models.BooleanField(blank=False)
    documents = models.CharField(blank=True, max_length=18, choices=DOCUMENTS_CHOICES)
    documents_other = models.TextField(blank=True)

    # Billing information
    publication_time = models.CharField(blank=False, max_length=2, choices=PUBLICATION_CHOICES)
    publication_plan = models.CharField(blank=False, max_length=2, choices=PUBLICATION_CHOICES)
    billing_country = models.TextField(blank=False)
    billing_bank = models.TextField(blank=False)

    


    
   