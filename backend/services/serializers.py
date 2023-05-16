from rest_framework import serializers
from .models import Services, ProvideService, RequestService


class ServicesSerializer(serializers.ModelSerializer):

    def validate(self, data):
        if data['travel'] == True and not data.get('travel_decription'):
            raise serializers.ValidationError('Por favor, especifique si está dispuesta(o) a viajar')
        
        if data['workday'] == 'OTRO' and not data.get('workday_other'):
            raise serializers.ValidationError("Por favor, especifique otra salida de su jornada laboral")
        
        if data['schedule'] == 'OTRO' and not data.get('schedule_other'):
            raise serializers.ValidationError("Por favor, especifique otros horarios a considerar")

        if data['payment'] == 'MONTO' and not data.get('payment_amount'):
            raise serializers.ValidationError("Por favor, especifique el monto deseado")
        
        if data['currency'] == 'OTRA' and not data.get('currency_other'):
            raise serializers.ValidationError("Por favor, especifique la moneda")
        
        if data['benefits'] == True and not data.get('benefits_description'):
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
        fields = [ 'user', 'service', 'age', 'have_children', 'education_level', 'country', 'state', 'city', 'zone', 'description', 'travel', 'travel_decription', 'activities', 'workday', 'workday_other', 'schedule', 'schedule_other', 'payment', 'payment_amount', 'currency', 'currency_other', 'salary_offered', 'benefits', 'benefits_description', 'availability', 'availability_date', 'origin', 'origin_continent', 'origin_country', 'origin_state', 'origin_city', 'client_type', 'have_documentation', 'documents', 'documents_other', 'publication_time', 'publication_plan', 'billing_country', 'billing_bank']

# Option B - 'Solicitar personal doméstico' 
class RequestServiceSerializer(ServicesSerializer):
    def validate(self, data):
        data =  super().validate(data)

        if data['service'] == 'NIN' and not ( data['age_required_from'] >= 0 and data['age_required_to'] <=12 ):
            raise serializers.ValidationError("Edad no permitida, debe ser entre 0 y 12 años")

        if data['service'] == 'CUI' and not ( data['age_required_from'] >= 13 and data['age_required_to'] >= 13):
            raise serializers.ValidationError("Edad no permitida, debe ser mayor de 13 años")

        if data['disabilities_tco'] == True and not data.get('disabilities_tco_decrip'):
            raise serializers.ValidationError("Por favor, indique las enfermedades que presentan")

        return data
    
    class Meta: 
        model = RequestService
        fields = ['id', 'user' , 'service', 'gender', 'age_required_from', 'age_required_to', 'children', 'education_level', 'country', 'state', 'city', 'zone', 'number_tco', 'age_tco', 'gender_tco', 'disabilities_tco', 'disabilities_tco_decrip', 'travel', 'travel_decription', 'activities', 'workday', 'workday_other', 'schedule', 'schedule_other', 'payment', 'payment_amount', 'currency', 'currency_other', 'salary_offered', 'benefits', 'benefits_description', 'availability', 'availability_date', 'have_documentation', 'documents', 'documents_other',  'publication_time', 'publication_plan', 'billing_country', 'billing_bank']
