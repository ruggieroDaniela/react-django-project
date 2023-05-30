from django.shortcuts import render, get_object_or_404, get_list_or_404
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter
from .models import ProvideService, RequestService
from .serializers import ProvideServiceSerializer, RequestServiceSerializer
from django.db.utils import DatabaseError

from email.message import EmailMessage
import smtplib
from backend.settings import EMAIL_HOST, EMAIL_HOST_PASSWORD, EMAIL_HOST_USER
from io import BytesIO
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import SimpleDocTemplate, Paragraph, FrameBreak
from reportlab.lib import colors

def drawRectangle(x, y, width, height, c, title): 
   c.setFillColor(colors.HexColor('#0099CC'))  # Establece el color de relleno
   c.rect(x, y, width, height, fill=True, stroke=False)
   
   c.setFont("Helvetica-Bold", 16)  # Establece la fuente y el tamaño del texto
   c.setFillColor(colors.white)  # Establece el color de texto en blanco

   c.setFont("Helvetica-Bold", 16)  # Establece la fuente y el tamaño del texto
   c.setFillColor(colors.white)  # Establece el color de texto en blanco
   
   # Calcula las coordenadas del texto para que esté centrado
   text_width = c.stringWidth(title)
   text_height = 16  
   text_x = x + (width - text_width) / 2
   text_y = y + (height - text_height) / 2

   c.drawString(text_x, text_y, title)  # Dibuja el texto centrado dentro del rectángulo

def drawTag(x, y, c, text, data): 
    # Tag
    c.setFont("Helvetica", 12)  
    text_width = c.stringWidth(text)
    text_height = 16

    # Rectangle
    rect_x = x
    rect_y = y - text_height  
    rect_width = text_width
    rect_height = text_height

    c.setFillColor(colors.HexColor('#FFC000'))  
    c.rect(rect_x , rect_y , rect_width + 10, rect_height , fill=True, stroke=False)

    text_x = x + (rect_width - text_width) / 2
    text_y = y - (rect_height - text_height) / 2

    c.setFillColor(colors.white)  
    c.drawString(text_x + 5, text_y - 12, text)  

    # Data
    c.setFont("Helvetica", 10)
    c.setFillColor(colors.black)
    c.drawString(text_x + text_width + 30, text_y - 12, data)

def drawSubtitle(x, y, color, text, c): 
   c.setFont("Helvetica-Bold", 12) 
   c.setFillColor(color)  
   c.drawString(x, y, text)

def drawData(x, y, data, c): 
   c.setFont("Helvetica", 10)
   c.setFillColor(colors.black)
   c.drawString(x + 20, y, data)

def drawParagraph(text, x, y, c): 
   styles = getSampleStyleSheet()
   paragraph_style = styles["Normal"]
   paragraph_style.alignment = 4
   paragraph = Paragraph(text, paragraph_style)
   paragraph.aligment = 1
   paragraph.wrapOn(c, 400, 100)
   paragraph.drawOn(c, x, y)

def savePDF(post): 
   filename = './publicacion_creada.pdf'
   doc = SimpleDocTemplate(filename, pagesize=letter)
   elements = []
   buffer=BytesIO()
   c = canvas.Canvas(filename, pagesize=letter)

   # Rectangulo
   x = 100  # Coordenada X del rectángulo
   y = 750  # Coordenada Y del rectángulo
   width = 400  # Ancho del rectángulo
   height = 30  # Alto del rectángulo

   drawRectangle(x, y, width, height, c, "DATOS BÁSICOS DE LA NIÑERA(O)")
   
   # Solicito
   y -= 30 
   drawSubtitle(x, y, colors.red, "Solicito", c)
   
   # Gender 
   y -= 20 
   drawData(x, y, post.get_gender_display(), c)
   y -= 20 
   c.drawString(x , y, "Con buena presencia, responsable, honesta, buen carácter, que le gusten los niños")

   # Edad que solicita
   y -= 30 
   drawSubtitle(x, y, colors.blue, "Edad que solicita", c)
   y -= 20
   drawData(x, y, 'Entre ' + str(post.age_required_from) + ' y ' + str(post.age_required_to) + ' años / ' + post.get_children_display(), c)

   # Situación familiar
   y -= 30 
   drawSubtitle(x, y, colors.blue, "Situación familiar", c)
   y -= 20
   drawData(x, y,  post.get_children_display(), c)

   # Grado de instrucción
   y -= 30 
   drawSubtitle(x, y, colors.blue, "Grado de Instrucción", c)
   y -= 20
   drawData(x, y,  post.get_education_level_display(), c)

   # LUGAR DE PROCEDENCIA
   y -= 40
   drawRectangle(x, y, width, height, c, "LUGAR DE PROCEDENCIA")

   # País de procedencia
   y -= 10
   drawTag(x, y, c, "País de procedencia", post.country)

   # Estado / Provincia
   y -= 30
   drawTag(x, y, c, "Estado / Provincia ", post.state)

   # Ciudad 
   y -= 30
   drawTag(x, y, c, "Ciudad ", post.city)

   # Zona 
   y -= 30
   drawTag(x, y, c, "Zona ", post.zone)

   # SOBRE LA PERSONA A CUIDAR
   y -= 50
   drawRectangle(x, y, width, height, c, "SOBRE LA PERSONA A CUIDAR")

   # Cantidad de personas a cuidar
   y -= 10
   drawTag(x, y, c, "Cantidad de personas a cuidar ", str(post.number_tco))

   # Edad(es)
   y -= 30
   drawTag(x, y, c, "Edad(es) ", post.age_tco)

   # Sexo(s)
   y -= 30
   drawTag(x, y, c, "Sexo(s) ", post.gender_tco)

   # ¿Posee(n) alguna discapacidad o enfermedad?
   if post.disabilities_tco == True:
      y -= 30
      drawTag(x, y, c, "¿Posee(n) alguna discapacidad o enfermedad? ", "Si")

      # Indique la(s) discapacidad(es)
      y -= 30
      drawTag(x, y, c, "Indique la(s) discapacidad(es)", " ")
      y -= 40
      drawParagraph(post.disabilities_tco_decrip, x, y, c)

      # Enfermedad(es) que presenta(n)
      y -= 10
      drawTag(x, y, c, "Enfermedad(es) que presenta(n)", " ")

      y -= 60
      drawParagraph(post.diseases_tco_descrip, x, y, c)

   else:
      y -= 30
      drawTag(x, y, c, "¿Posee(n) alguna discapacidad o enfermedad? ", "No")

   c.showPage()
   # New page
   # DISPONIBILIDAD PARA VIAJAR DE LA NIÑERA(O)
   y = 750
   drawRectangle(x, y, width, height, c, "DISPONIBILIDAD PARA VIAJAR DE LA NIÑERA(O)")

   if post.travel == True: 
      y -= 20
      drawData(x, y,  "Si", c)
      y -= 20
      drawParagraph(post.travel_decription, x + 20, y, c)
   else:
      drawData(x, y,  "No", c) 
   
   # FUNCIONES QUE DEBE CUMPLIR LA NIÑERA O EL NIÑERO
   y -= 40
   drawRectangle(x, y, width, height, c, "FUNCIONES QUE DEBE CUMPLIR")
   y -= 20
   drawParagraph(post.activities, x + 20, y, c)

   # CONDICIONES DE TRABAJO
   y -= 40
   drawRectangle(x, y, width, height, c, "CONDICIONES DE TRABAJO")

   # Cómo van a ser las salidas de la persona contratada
   y -= 10
   drawTag(x, y, c, "Cómo van a ser las salidas de la persona contratada ", post.get_workday_display())

   if post.workday == "OTRO": 
      y -= 30
      drawData(x, y,  'Otro: ' + post.workday_other, c) 

   # Horario de trabajo
   y -= 30
   drawTag(x, y, c, "Horario de trabajo ", post.get_schedule_display())

   if post.schedule == "OTRO": 
      y -= 30
      drawData(x, y,  'Otro: ' + post.schedule_other, c) 

   # Salario ofrecido
   y -= 30
   if post.payment == "MONTO": 
      drawTag(x, y, c, "Salario ofrecido ", str(post.payment_amount))
   else: 
      drawTag(x, y, c, "Salario ofrecido ", post.get_payment_display())

   # ¿Ofrece otros beneficios? 
   y -= 30
   if post.benefits == 1:
      drawTag(x, y, c, "¿Ofrece otros beneficios? ", "Si")
      y -= 50
      drawParagraph('Especifique: ' + post.benefits_description, x , y, c)

   if post.benefits == 0:
      drawTag(x, y, c, "¿Ofrece otros beneficios? ", "No") 

   # DISPONIBILIDAD PARA COMENZAR A TRABAJAR
   y -= 40
   drawRectangle(x, y, width, height, c, "DISPONIBILIDAD PARA COMENZAR A TRABAJAR")

   # Fecha de inicio
   y -= 20

   if post.availability == "FECHA": 
      drawTag(x, y, c, "Fecha de inicio ", str(post.availability_date))
   else: 
      drawTag(x, y, c, "Fecha de inicio ", post.get_availability_display())

   # DOCUMENTOS A SOLICITAR A LAS CANDIDATAS(OS)
   y -= 60
   drawRectangle(x, y, width, height, c, "DOCUMENTOS A SOLICITAR")

   y -= 20
   if post.have_documentation == True:
      drawData(x, y, "Si", c) 
      y -= 20
      drawParagraph(post.get_documents_display(), x + 20 , y, c)

      if post.documents == "OTRO": 
         y -= 20
         drawData(x, y,  'Especifique: ' + post.documents_other, c) 
   else: 
      drawData(x, y, "No", c) 

   c.showPage()
   c.save()
   pdf = buffer.getvalue()
   buffer.close()
   return pdf

def createPDF(post, status):
   buffer=BytesIO()
   c = canvas.Canvas(buffer, pagesize=letter)

   # Rectangulo
   x = 100  # Coordenada X del rectángulo
   y = 700  # Coordenada Y del rectángulo
   width = 400  # Ancho del rectángulo
   height = 40  # Alto del rectángulo
   color = colors.HexColor('#0000FF')  # Color azul

   c.setFillColor(color)  # Establece el color de relleno
   c.rect(x, y, width, height, fill=True)

   title = "DATOS BÁSICOS DE LA NIÑERA(O)"
   c.setFont("Helvetica-Bold", 16)  # Establece la fuente y el tamaño del texto
   c.setFillColor(colors.white)  # Establece el color de texto en blanco
   c.drawString(x + 10, y + 10, title)  # Dibuja el texto dentro del rectángulo


   # CONTENT
   #title_style = "Helvetica-Bold"
   #body_style = "Helvetica"

    # Escribir el contenido en el PDF
   #c.setFont(title_style, 16)
   #c.drawString(100, 700, "PUBLICACIÓN NRO <" + str(post.id) + "> HA SIDO CREADA - ESTATUS DE LA PUBLICACIÓN: " + status)

   #c.setFont(body_style, 12)
   #c.drawString(100, 650, "Le notificamos que su publicación ha sido creada en nuestro sitio Web 3.137.150.119:5173 con el código número " + str(post.id))
   # CONTENT


   #c.showPage()
   c.save()
   pdf = buffer.getvalue()
   buffer.close()
   return pdf

def sendEmail(post):
    # STATUS
    if post.status == 'PEN': 
        status = 'PENDIENTE POR ACTIVAR'
    elif post.status == 'ACT': 
        status = 'ACTIVADA'

    pdf = createPDF(post, status)
    


    receiver = "chachy.drs@gmail.com"                      # cambiar a -> post.user.email
    message = post.user.email

    email = EmailMessage()
    email["From"] = EMAIL_HOST_USER
    email["To"] = receiver
    email["Subject"] = "PUBLICACIÓN NRO <" + str(post.id) + "> HA SIDO CREADA - ESTATUS DE LA PUBLICACIÓN: " + status
    email.set_content(message, subtype="html")
    
    email.add_attachment(
        pdf,
        filename="publicacion_creada.pdf",
        maintype="application",
        subtype="pdf"
    )

    smtp = smtplib.SMTP_SSL(EMAIL_HOST)
    smtp.login(EMAIL_HOST_USER, EMAIL_HOST_PASSWORD)
    smtp.sendmail(EMAIL_HOST_USER, receiver, email.as_string())
    smtp.quit()
    return

# Option A - "Ofrecer mis servicios como personal doméstico"
class ProvideServiceViewSet(viewsets.ModelViewSet):
    queryset = ProvideService.objects.all()
    serializer_class = ProvideServiceSerializer
    http_method_names = ['get', 'post', 'delete', 'put'] 

    # Authorization
    #authentication_classes = (TokenAuthentication,)
    #permission_classes = (IsAuthenticated,)

    # Filters. Option C - "Buscar personal doméstico"
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_fields = {
        # Búsqueda rápida
        'continent': ["exact"], 
        'country': ['exact', 'in'], 
        'state': ['exact', 'in'], 
        'service': ['exact', 'in'], 

        # Búsqueda personalizada 
        'workday' : ['exact'], 
        'schedule': ['exact'], 
        'payment': ['exact'],        
        'payment_amount': ['range'], 
        'salary_offered': ['exact'], 
        'currency': ['exact'], 
        'currency_other': ['exact'], 
        'benefits': ['exact'], 
        'availability': ['exact'], 
        'availability_date' : ['exact'],
    }
    ordering_fields = ['payment_amount', 'availability_date', 'created_at']

    # Post ad 
    @action(detail=False, methods=['post'])
    def post_ad(self, request):
        serializer = ProvideServiceSerializer(data=request.data)

        if serializer.is_valid():
            post = serializer.save()
            #savePDF(post)
            #sendEmail(post)
            return Response({'message': 'OK', 'post_code': post.id})
        else:
            return Response(serializer.errors, status=400)
        
    # See my posts
    def retrieve(self, request, pk=None):
        queryset = self.queryset.filter(user=pk)
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)
    
    # Get post
    @action(detail=False, methods=['get'])
    def get_post(self, request, pk=None):
        try: 
            queryset = self.queryset.get(id=pk)
            serializer = self.serializer_class(queryset, many=False)
            return Response(serializer.data)
        except ProvideService.DoesNotExist:
            return Response({'message': 'Not found'}, status=404)
    
    # Enable/disable post
    @action(detail=False, methods=['put'])
    def enable_post(self, request, pk=None):
        try:
            queryset = self.queryset.get(id=pk)
            queryset.enable = not queryset.enable
            queryset.save()
            if queryset.enable:
                return Response({'message': 'The post is now available'})
            else:
                return Response({'message': 'The post is now unavailable'})
        except ProvideService.DoesNotExist:
            return Response({'message': 'Not found'}, status=404)

    # Update post
    @action(detail=False, methods=['put'])
    def update_post(self, request, pk=None):
        try:
            queryset = self.queryset.get(id=pk)
            serializer = ProvideServiceSerializer(queryset, data=request.data)

            if serializer.is_valid():
                serializer.save()
                return Response({'message': 'OK'})
            else:
                return Response(serializer.errors, status=400)
            
        except ProvideService.DoesNotExist:
            return Response({'message': 'Not found'}, status=404)

    # Delete a post
    @action(detail=False, methods=['delete'])
    def delete_post(self, request, pk=None):
        try:
            queryset = self.queryset.get(id=pk)
            queryset.delete()
            return Response({"message": "Post deleted"})
        except ProvideService.DoesNotExist:
            return Response({'message': 'Not found'}, status=404)
        
        

# Option B - "Solicitar personal doméstico"
class RequestServiceViewSet(viewsets.ModelViewSet):
    queryset = RequestService.objects.all()
    serializer_class = RequestServiceSerializer    

    # Authorization
    #authentication_classes = (TokenAuthentication,)
    #permission_classes = (IsAuthenticated,)

    # Filters. Option D - Buscar Clientes
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_fields = {
        # Búsqueda rápida
        'continent': ["exact"], 
        'country': ['exact', 'in'], 
        'state': ['exact', 'in'], 
        'city': ['exact'], 
    #    'client_type': ['exact'], 
        'service': ['exact', 'in'], 

        # Búsqueda personalizada 
        'workday' : ['exact', 'in'], 
        'schedule': ['exact', 'in'], 
        'payment': ['exact'],        
        'payment_amount': ['range'], 
        'salary_offered': ['exact'], 
        'currency': ['exact'], 
        'currency_other': ['exact'], 
        'benefits': ['exact'], 
        'availability': ['exact'], 
        'availability_date' : ['exact'],
    }
    ordering_fields = ['payment_amount', 'availability_date', 'created_at']

    # Post ad
    @action(detail=False, methods=['post'])
    def post_ad(self, request):
        serializer = RequestServiceSerializer(data=request.data)

        if serializer.is_valid():
            post = serializer.save()
            savePDF(post)
            return Response({'message': 'OK', 'post_code(id)': post.id})
        else:
            return Response(serializer.errors, status=400)
        
    # See my posts
    def retrieve(self, request, pk=None):
        queryset = self.queryset.filter(user=pk)
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    # Get post
    @action(detail=False, methods=['get'])
    def get_post(self, request, pk=None):
        try: 
            queryset = self.queryset.get(id=pk)
            serializer = self.serializer_class(queryset, many=False)
            return Response(serializer.data)
        except DatabaseError:
            return Response({'message': 'Not found'}, status=404)

    # Enable post
    @action(detail=False, methods=['put'])
    def enable_post(self, request, pk=None):
        try:
            queryset = self.queryset.get(id=pk)
            queryset.enable = not queryset.enable
            queryset.save()
            if queryset.enable:
                return Response({'message': 'The post is now available'})
            else:
                return Response({'message': 'The post is now unavailable'})
        except RequestService.DoesNotExist:
            return Response({'message': 'Not found'}, status=404)

    # Update post
    @action(detail=False, methods=['put'])
    def update_post(self, request, pk=None):
        try:
            queryset = self.queryset.get(id=pk)
            serializer = RequestServiceSerializer(queryset, data=request.data)

            if serializer.is_valid():
                serializer.save()
                return Response({'message': 'OK'})
            else:
                return Response(serializer.errors, status=400)
            
        except RequestService.DoesNotExist:
            return Response({'message': 'Not found'}, status=404)
             
    # Delete
    @action(detail=False, methods=['delete'])
    def delete_post(self, request, pk=None):
        try:
            queryset = self.queryset.get(id=pk)
            queryset.delete()
            return Response({"message": "Post deleted"})
        except RequestService.DoesNotExist:
            return Response({'message': 'Not found'}, status=404)
    





        
        
