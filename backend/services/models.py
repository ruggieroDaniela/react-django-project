from django.db import models
from multiselectfield import MultiSelectField
from django.core.exceptions import ValidationError
from users.models import User
from banks.models import Bank
import uuid

# Models
class Services(models.Model):
    # Choices
    STATUS_CHOICES = (
        ('ACT', 'ACTIVADA'), 
        ('PEN', 'PENDIENTE POR ACTIVAR')
    )

    SERVICE_CHOICES = (
        ('NIN', 'Niñero(a)'), 
        ('CUI', 'Cuidador(a) ocupacional'), 
        ('ENF', 'Enfermero(a)')
    )

    MODE_CHOICES = (
        ('PROVIDE', "Ofrecer un servicio"), 
        ('REQUEST', "Solicitar un servicio")
    )

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
    id = models.UUIDField(default=uuid.uuid4, unique=True, editable=False, primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    status = models.CharField(max_length=3, choices=STATUS_CHOICES, default='PEN')
    enable = models.BooleanField(default=False)
    mode = models.CharField(max_length=7)
    created_at = models.DateTimeField(auto_now_add=True)

    # Basic data
    service = models.CharField(max_length=3, choices=SERVICE_CHOICES)
    education_level = models.CharField(blank=False, max_length=3, choices=EDUCATION_LEVEL_CHOICES)

    # Place of Origin 
    continent = models.TextField(blank=False)
    country = models.TextField(blank=False)
    state = models.TextField(blank=False)
    city = models.TextField(blank=False)
    zone = models.TextField(blank=True)

    # Availability to travel 
    travel = models.BooleanField(blank=False)
    travel_decription = models.TextField(blank=True)

    # Activities 
    activities = models.TextField(blank=False)

    # Working Conditions
    workday = models.CharField(blank=False, max_length=15, choices=WORKDAY_CHOICES)
    workday_other = models.TextField(blank=True)

    schedule = MultiSelectField(choices=SCHEDULE_CHOICES, max_length=100)
    schedule_other = models.TextField(blank=True)
    
    # Salary
    payment = models.CharField(blank=False, max_length=8, choices=PAYMENT_CHOICES)
    payment_amount = models.FloatField(null=True, blank=True)
    currency = models.CharField(blank=True, null=True, max_length=4, choices=CURRENCY_CHOICES)
    currency_other = models.TextField(blank=True, null=True)
    salary_offered = models.CharField(blank=True, null=True,  max_length=9, choices=SALARY_OFFERED_CHOICES)

    benefits = models.IntegerField(blank=False)
    benefits_description = models.TextField(blank=True)

    # Availability to start 
    availability = models.CharField(blank=False, max_length=8, choices=AVAILABILITY_CHOICES)
    availability_date = models.DateField(null=True, blank=True)

    # Documents 
    have_documentation = models.BooleanField(blank=False)
    documents = MultiSelectField(blank=True, max_length=18, choices=DOCUMENTS_CHOICES)
    documents_other = models.TextField(blank=True)

    # Billing information
    publication_time = models.CharField(blank=False, max_length=2, choices=PUBLICATION_CHOICES)
    publication_plan = models.CharField(blank=False, max_length=2, choices=PUBLICATION_CHOICES)
    billing_country = models.TextField(blank=False)
    billing_bank = models.ForeignKey(Bank, on_delete=models.CASCADE)
    
    class Meta:
        abstract = True

# Option A - "Ofrecer mis servicios como personal doméstico"
class ProvideService(Services):
    def __init__(self, *args, **kargs):
        super().__init__(*args, **kargs)
        self.mode = "PROVIDE"

    ORIGIN_CHOICES = (
        ('NO', 'Me es indiferente'),
        ('SI', 'Quiero especificar la procedencia del cliente')
    )

    CLIENT_TYPE_CHOICES = (
        ('NAT', 'Natural'),
        ('EMP', 'Empresa'),
        ('NO', 'Me es indiferente si es persona natural o empresa')
    )

    # 1 - Basic data
    age = models.PositiveIntegerField(blank=False)
    have_children = models.BooleanField(blank=False)
    
    # 2 - Place of Origin 

    # 3 - Job description
    description = models.TextField(blank=False)

    # 4 - Availability to travel 
    # 5 - Activities 
    # 6 - Working Conditions    
    # 7 - Availability to start 

    # 8 - Customers i want to work with
    origin = models.CharField(blank=False, max_length=2, choices=ORIGIN_CHOICES)
    origin_continent = models.TextField(blank=True)
    origin_country = models.TextField(blank=True)
    origin_state = models.TextField(blank=True)
    origin_city = models.TextField(blank=True)
    client_type = models.CharField(blank=True, max_length=3, choices=CLIENT_TYPE_CHOICES)
    
    # 9 - Documents 
    # 14 - Billing information


# Option B - "Solicitar personal doméstico"
class RequestService(Services):
    def __init__(self, *args, **kargs):
        super().__init__(*args, **kargs)
        self.mode = "REQUEST"

    # Choices
    GENDER_CHOICES = (
        ('FEM', 'Femenino'), 
        ('MAS', 'Masculino'), 
        ('IDC', 'Me es indiferente su sexo')
    )
    
    CHILDREN_CHOICES = (
        ('NO', 'Sin hijos'), 
        ('SI', 'Con hijos'), 
        ('IDC', 'Me es indiferente si tiene hijos o no')
    )

    # 1 - Basic data
    gender = models.CharField(blank=False, max_length=3, choices=GENDER_CHOICES)
    age_required_from = models.PositiveIntegerField()
    age_required_to = models.PositiveIntegerField()
    children = models.CharField(blank=False, max_length=3, choices=CHILDREN_CHOICES)

    # 2 - Place of Origin 

    # 3 - About the person(people) taken care of (tco)
    number_tco = models.PositiveIntegerField(blank=False)
    age_tco = models.TextField(blank=False)
    gender_tco = models.TextField(blank=False)
    disabilities_tco = models.BooleanField(blank=False)
    disabilities_tco_decrip = models.TextField(blank=True)
    diseases_tco_descrip = models.TextField(blank=True)

    # 4 - Availability to travel 
    # 5 - Activities 
    # 6 - Working Conditions
    # 7 - Availability to start 
    # 8 - Documents
    # 12 - Billing Information