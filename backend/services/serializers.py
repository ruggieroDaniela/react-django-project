from rest_framework import serializers, fields
from .models import Services, ProvideService, RequestService

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

class ServicesSerializer(serializers.ModelSerializer):
    schedule = fields.MultipleChoiceField(choices=SCHEDULE_CHOICES)
    documents = fields.MultipleChoiceField(choices=DOCUMENTS_CHOICES)

    def validate(self, data):
        if data['travel'] == True and not data.get('travel_decription'):
            raise serializers.ValidationError('Por favor, especifique si está dispuesta(o) a viajar')
        
        if data['workday'] == 'OTRO' and not data.get('workday_other'):
            raise serializers.ValidationError("Por favor, especifique otra salida de su jornada laboral")
        
        if 'OTRO' in data['schedule'] and not data.get('schedule_other'):
            raise serializers.ValidationError("Por favor, especifique otros horarios a considerar")

        if data['payment'] == 'MONTO' and not data.get('payment_amount'):
            raise serializers.ValidationError("Por favor, especifique el monto deseado")
        
        if data['payment'] == 'MONTO' and not data.get('currency'):
            raise serializers.ValidationError("Por favor, especifique la moneda")
        
        if data['payment'] == 'MONTO' and not data.get('salary_offered'):
            raise serializers.ValidationError("Por favor, especifique el salario")
        
        if data['payment'] == 'CONVENIR' and ( data.get('currency') or data.get('currency_other') or data.get('salary_offered') or data.get('payment_amount') ) : 
            raise serializers.ValidationError("Error, no debe especificar el salario deseado")

 

        
        if data['benefits'] == 1 and not data.get('benefits_description'):
            raise serializers.ValidationError("Por favor, especifique otro beneficio laboral")
        
        if data['availability'] == 'FECHA' and not data.get('availability_date'):
            raise serializers.ValidationError("Por favor, seleccione la fecha de inicio")

        if data['have_documentation'] == True and not data.get('documents'):
            raise serializers.ValidationError("Por favor, seleccione uno o más documentos de su preferencia")

        if data['documents'] == 'OTRO' and data.get('have_documentation') == True and not data.get('documents_other'):
            raise serializers.ValidationError("Por favor, especifique otro documento")
        
        return data

    class Meta:
        model = Services
        fields = '__all__' 

# Option A - 'Ofrecer mis servicios como personal doméstico'
class ProvideServiceSerializer(ServicesSerializer):
    def validate(self, data):
        data = super().validate(data)
        
        if data['origin'] == 'SI' and not ( data.get('origin_continent') and data.get('origin_country') and data.get('origin_state') and data.get('origin_city') ):
            raise serializers.ValidationError("Por favor, especifique la procedencia del cliente")
        return data
    
    class Meta:
        model = ProvideService
        fields = ['id', 'user', 'service', 'enable', 'created_at' , 'age', 'have_children', 'education_level', 'continent', 'country', 'state', 'city', 'zone', 'description', 'travel', 'travel_decription', 'activities', 'workday', 'workday_other', 'schedule', 'schedule_other', 'payment', 'payment_amount', 'currency', 'currency_other', 'salary_offered', 'benefits', 'benefits_description', 'availability', 'availability_date', 'origin', 'origin_continent', 'origin_country', 'origin_state', 'origin_city', 'client_type', 'have_documentation', 'documents', 'documents_other', 'publication_time', 'publication_plan', 'billing_country', 'billing_bank']

# Option B - 'Solicitar personal doméstico' 
class RequestServiceSerializer(ServicesSerializer):
    def validate(self, data):
        data =  super().validate(data)
        return data
    
    class Meta: 
        model = RequestService
        fields = ['id', 'user' , 'service', 'enable', 'created_at', 'gender', 'age_requirement', 'age_required_from', 'age_required_to', 'children', 'education_level', 'continent', 'country', 'state', 'city', 'zone', 'number_tco', 'age_tco', 'gender_tco', 'disabilities_tco', 'disabilities_tco_decrip', 'diseases_tco_descrip', 'travel', 'travel_decription', 'activities', 'workday', 'workday_other', 'schedule', 'schedule_other', 'payment', 'payment_amount', 'currency', 'currency_other', 'salary_offered', 'benefits', 'benefits_description', 'availability', 'availability_date', 'have_documentation', 'documents', 'documents_other',  'publication_time', 'publication_plan', 'billing_country', 'billing_bank']
