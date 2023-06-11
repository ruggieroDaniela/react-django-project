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

def setCost(plan): 
    cost = 0 

    if plan == '1': 
        cost = 10
    elif plan == '3': 
        cost = 25
    elif plan == '6': 
        cost = 50
    elif plan == '9': 
        cost = 70
    elif plan == '12': 
        cost = 90

    return cost


def drawRectangle(x, y, width, height, c, title, size = 10): 
    c.setFillColor(colors.HexColor('#0099CC'))  # Blue
    c.roundRect(x, y, width, height, 5, fill=True, stroke=False)

    c.setFont("Helvetica-Bold", size)  
    c.setFillColor(colors.white)  

    # Center text
    text_width = c.stringWidth(title)
    text_height = size
    text_x = x + (width - text_width) / 2
    text_y = y + (height - text_height) / 2

    c.drawString(text_x, text_y, title)  

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

def drawSubtitle(x, y, color, text, c, size = 12): 
    c.setFont("Helvetica-Bold", size) 
    c.setFillColor(color)  
    c.drawString(x, y, text)

def drawData(x, y, data, c): 
    c.setFont("Helvetica", 10)
    c.setFillColor(colors.black)
    c.drawString(x + 20, y, data)

def drawParagraph(text, x, y, c, color=colors.black): 
    styles = getSampleStyleSheet()
    paragraph_style = styles["Normal"]
    paragraph_style.alignment = 4
    paragraph_style.textColor = color
    paragraph = Paragraph(text, paragraph_style)
    paragraph.aligment = 1
    paragraph.wrapOn(c, 400, 100)
    paragraph.drawOn(c, x, y)

def requestCreatePDF(post):
    buffer=BytesIO()
    c = canvas.Canvas(buffer, pagesize=letter)

    # Rectangulo
    x = 100  # Coordenada X del rectángulo
    y = 750  # Coordenada Y del rectángulo
    width = 400  # Ancho del rectángulo
    height = 30  # Alto del rectángulo

    drawRectangle(x, y, width, height, c, "DATOS BÁSICOS DEL " + post.get_service_display().upper())


    # Solicito
    y -= 30 
    drawSubtitle(x, y, colors.red, "Solicito", c)

    # Gender 
    y -= 20 
    drawData(x, y, post.get_gender_display(), c)

    if post.status == 'PEN': 
        drawSubtitle(x + 400, y, colors.red, post.get_status_display(), c, 8)
    else: 
        drawSubtitle(x + 400, y, colors.green, post.get_status_display(), c, 8)

    c.setFillColor(colors.black)  
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
    y = 700
    drawRectangle(x, y, width, height, c, "DISPONIBILIDAD PARA VIAJAR DEL " + post.get_service_display().upper())

    if post.travel == True: 
        y -= 20
        drawData(x, y,  "Si", c)
        y -= 20
        drawParagraph(post.travel_decription, x + 20, y, c)
    else:
        y -= 20
        drawData(x, y,  "No", c) 

    # FUNCIONES QUE DEBE CUMPLIR
    y -= 40
    drawRectangle(x, y, width, height, c, "FUNCIONES QUE DEBE CUMPLIR EL " +  post.get_service_display().upper())
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
        drawData(x - 20, y, "Si", c) 
        y -= 30
        drawParagraph(post.get_documents_display(), x , y, c)

        if post.documents == "OTRO": 
            y -= 20
            drawData(x, y,  'Especifique: ' + post.documents_other, c) 
    else: 
        drawData(x, y, "No", c) 

    c.showPage()
    # New page
    y = 700

    # SUGERENCIAS DE TRABAJO PARA EL DÍA A DÍA CON EL PERSONAL CONTRATADO
    drawRectangle(x, y, width, height, c, "SUGERENCIAS DE TRABAJO PARA EL DÍA A DÍA CON EL PERSONAL CONTRATADO", 8)
    y -= 20

    # Antes de iniciar sus labores
    drawTag(x, y, c, "Antes de iniciar sus labores", "")
    y -= 60
    drawParagraph("Indicarle a la persona contratada que debe mantener una buena higiene personal, y abstenerse de fumar, ingerir bebidas alcohólicas o tener conductas que atenten contra la moral y las buenas costumbres, principalmente delante de los niños", x , y, c)
    y -= 60
    drawParagraph("Indíquele al personal recomendaciones o procedimientos de seguridad para abrir la puerta, contestar el teléfono, personas a recibir en el inmueble, y cualquier otro asunto relacionado con las personas a su cuidado, o con el inmueble donde se realizarán las labores", x , y, c)
    y -= 70
    drawParagraph("Proporcione información de contacto a su niñera(o) en caso de emergencia, como: Médico tratante, teléfono de empresas donde la(s) persona(s) bajo su cuidado están aseguradas, listado de clínicas cercanas a las que se pueda llevar a la persona en caso de emergencia, datos de contacto directo con usted en caso de cualquier emergencia, o consulta que pueda tener la persona contratada ", x , y, c)
    y -= 50
    drawParagraph("Si puede, registre las huellas dactilares del personal a su servicio para que tenga una base para deslindar responsabilidades en caso de robo o cualquier incidente que podría haber originado dicha persona en el inmueble, o hacia las personas bajo su cuidado", x , y, c)

    # En el día a día 
    y -= 10
    drawTag(x, y, c, "En el día a día ", "")
    y -= 40
    drawParagraph("Conversar con las personas que el cuidador(a) tendrá bajo su cargo, para verificar que la persona contratada le proporciona un buen trato a la persona", x , y, c)
    y -= 20
    drawParagraph("Monitorear el desempeño de la persona contratada en sus labores", x , y, c)
    y -= 30
    drawParagraph("Se le recomienda instalar cámaras de seguridad para supervisar las labores del personal, y verificar el trato que se le proporciona a las personas a cuidar", x , y, c)

    # Cuando el personal finalice sus labores
    y -= 10
    drawTag(x, y, c, "Cuando el personal finalice sus labores ", "")
    y -= 30
    drawParagraph("Solicitarles que muestren el bolso antes de salir", x , y, c)

    # Sugerencias adicionales 
    y -= 10
    drawTag(x, y, c, "Sugerencias adicionales ", "")
    y -= 30
    drawParagraph("Guardar joyas u objetos de valor que considere en lugares seguros", x , y, c)

    # SUGERENCIAS AL MOMENTO DE REALIZAR LA ENTREVISTA
    y -= 40
    drawRectangle(x, y, width, height, c, "SUGERENCIAS AL MOMENTO DE REALIZAR LA ENTREVISTA", 8)
    y -= 20 
    drawParagraph("Obtenga toda la información posible de sus empleados. ", x , y, c)
    y -= 40 
    drawParagraph("Averigüe dónde viven, datos de los familiares para avisar en caso de alguna emergencia (eso también le servirá a usted en caso de robo o si alguna de las personas bajo la responsabilidad del cuidador sufre algún daño que sea imputable a la persona).", x , y, c)

    # CONSIDERACIONES DEL SERVICIO 
    y -= 40
    drawRectangle(x, y, width, height, c, "CONSIDERACIONES DEL SERVICIO", 8)
    y -= 30 
    drawParagraph("Los datos proporcionados son bajo la responsabilidad del anunciante, y la empresa queda exonerada de verificar su veracidad", x , y, c, colors.red)
    y -= 40 
    drawParagraph(" Las sugerencias proporcionadas son para orientar al cliente o al personal, y al aceptar la publicación de dicho anuncio la empresa queda exonerada de cualquier incidente que pudiera ocurrir entre el cliente y el personal contratado", x , y, c, colors.red)
    c.showPage()

    # New Page
    # DATOS DE FACTURACIÓN
    y = 700
    drawRectangle(x, y, 150, height, c, "DATOS DE FACTURACIÓN", 8)
    drawRectangle(x + 170 , y, 230, height, c, "DATOS DE FACTURACIÓN", 8)

    # PLAN SELECCIONADO
    y -= 20
    drawSubtitle(x + 10, y, colors.blue, "Plan seleccionado", c)
    drawRectangle(x + 170 , y - 15, 150, 20, c, "País donde va a realizar el depósito", 8)
    drawSubtitle(x + 325, y - 13, colors.black, post.billing_country.upper(), c, 10)

    y -= 20
    drawSubtitle(x + 20, y, colors.black, post.get_publication_plan_display(), c)
    cost  = setCost(post.publication_plan)   
    drawSubtitle(x + 80, y, colors.red, str(cost) + ' USD', c)
    drawRectangle(x + 170 , y -20, 150, 20, c, "Datos de la cuenta seleccionada", 8)

    y -= 70
    drawRectangle(x + 170 , y, 230, height, c, post.billing_bank.name, 8)
    c.setStrokeColor(colors.HexColor('#FFC000'))
    c.rect(x + 170, y - 150, 230, 150, fill=False, stroke=True)

    y -= 15
    drawSubtitle(x + 180, y, colors.red,"Formas de pago", c, 12)
    y -= 15
    drawData(x + 170, y, " * Depósito", c)

    y -= 15
    drawData(x + 170, y, " * Transferencia Bancaria", c)

    y -= 20
    drawSubtitle(x + 180, y, colors.black, "País: ", c, 10)
    drawData(x + 200, y, post.billing_country, c)

    y -= 15
    drawSubtitle(x + 180, y, colors.black, "Banco: ", c, 10)
    drawData(x + 200, y, post.billing_bank.name, c)

    y -= 15
    drawSubtitle(x + 180, y, colors.black, "Nro de cuenta: ", c, 10)
    drawData(x + 240, y, post.billing_bank.account, c)

    y -= 15
    drawSubtitle(x + 180, y, colors.black, "Código SWIFT: ", c, 10)
    drawData(x + 240, y, post.billing_bank.swift_code, c)

    c.showPage()
    c.save()
    pdf = buffer.getvalue()
    buffer.close()
    return pdf

def provideCreatePDF(post): 
    #filename = './provide.pdf'
    buffer=BytesIO()
    c = canvas.Canvas(buffer, pagesize=letter)

    # Rectangulo
    x = 100  # Coordenada X del rectángulo
    y = 750  # Coordenada Y del rectángulo
    width = 400  # Ancho del rectángulo
    height = 30  # Alto del rectángulo

    drawSubtitle(x, y, colors.blue, post.get_service_display(), c)
    drawSubtitle(x + 200, y, colors.black, post.user.first_name + ' ' + post.user.last_name, c)

    # Teléfono Móvil
    y -= 20
    if post.user.cellphone is None: 
        drawTag(x, y, c, "Teléfono Móvil", "No disponible")
    else: 
        drawTag(x, y, c, "Teléfono Móvil", post.user.cellphone)

    # Teléfono Fijo
    y -= 20
    if post.user.telephone is None: 
        drawTag(x, y, c, "Teléfono Fijo", "No disponible")
    else: 
        drawTag(x, y, c, "Teléfono Fijo", post.user.telephone)

    # Correo electrónico
    y -= 20
    drawTag(x, y, c, "Correo electrónico", post.user.email)

    
    # DATOS BÁSICOS
    y -= 70
    drawRectangle(x, y, width, height, c, "DATOS BÁSICOS DEL " + post.get_service_display().upper())
    y -= 20 
    c.drawString(x , y, "Con buena presencia, responsable, honesta, buen carácter, que le gusten los niños")
    y -= 20

    # Edad
    drawSubtitle(x, y, colors.blue, "Edad ", c)
    drawData(x + 110, y, str(post.age) + ' años', c)
    
    # Situación familiar
    y -=20
    drawSubtitle(x, y, colors.blue, "Situación familiar", c)

    # Status
    if post.status == 'PEN': 
        drawSubtitle(x + 400, y, colors.red, post.get_status_display(), c, 8)
    else: 
        drawSubtitle(x + 400, y, colors.green, post.get_status_display(), c, 8)

    if post.have_children == True: 
        have_children = "Con hijos"
    else:
        have_children = "Sin hijos"

    drawData(x + 110, y,  have_children, c)

    # Grado de Instrucción
    y -= 20 
    drawSubtitle(x, y, colors.blue, "Grado de Instrucción", c)
    drawData(x + 110, y,  post.get_education_level_display(), c)

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

    # DESCRIPCIÓN GENERAL DE MI PERFIL LABORAL
    y -= 60
    drawRectangle(x, y, width, height, c, "DESCRIPCIÓN GENERAL DE MI PERFIL LABORAL")
    y -= 50
    drawParagraph(post.description , x, y, c)

    # FUNCIONES QUE HE DESEMPEÑADO
    y -= 60
    drawRectangle(x, y, width, height, c, "FUNCIONES QUE HE DESEMPEÑADO COMO " +  post.get_service_display().upper())
    y -= 50
    drawParagraph(post.activities, x , y, c)

    # DISPONIBILIDAD PARA VIAJAR DE LA NIÑERA(O)
    y -= 60
    drawRectangle(x, y, width, height, c, "DISPONIBILIDAD PARA VIAJAR DEL " + post.get_service_display().upper())

    if post.travel == True: 
        y -= 20
        drawData(x, y,  "Si", c)
        y -= 20
        drawParagraph(post.travel_decription, x + 20, y, c)
    else:
        y -= 20
        drawData(x, y,  "No", c) 

    c.showPage()
    # New page
    y = 750

    # CONDICIONES DE TRABAJO
    drawRectangle(x, y, width, height, c, "CONDICIONES DE TRABAJO")

    # Salidas que prefiero
    y -= 10
    drawTag(x, y, c, "Salidas que prefiero ", post.get_workday_display())

    if post.workday == "OTRO": 
        y -= 30
        drawData(x, y,  'Otro: ' + post.workday_other, c) 

    # Horario
    y -= 30
    drawTag(x, y, c, "Horario", post.get_schedule_display())

    if post.schedule == "OTRO": 
        y -= 30
        drawData(x, y,  'Otro: ' + post.schedule_other, c) 

    # Salario deseado
    y -= 30
    if post.payment == "MONTO": 
        drawTag(x, y, c, "Salario deseado ", str(post.payment_amount))
    else: 
        drawTag(x, y, c, "Salario deseado ", post.get_payment_display())

    # ¿SOLICITO OTROS BENEFICIOS? 
    y -= 60
    drawRectangle(x, y, width, height, c, "¿SOLICITO OTROS BENEFICIOS? ")
    y -= 20
    if post.benefits == 1:
        drawData(x - 20, y, "Si ", c)
        y -= 40
        drawParagraph('Especifique: ' + post.benefits_description, x , y, c)
    elif post.benefits == 0:
        drawData(x - 20, y, "No ", c)


    # DISPONIBILIDAD PARA COMENZAR A TRABAJAR
    y -= 40
    drawRectangle(x, y, width, height, c, "DISPONIBILIDAD PARA COMENZAR A TRABAJAR")

    # Fecha de inicio
    y -= 20

    if post.availability == "FECHA": 
        drawTag(x, y, c, "Fecha de inicio ", str(post.availability_date))
    else: 
        drawTag(x, y, c, "Fecha de inicio ", post.get_availability_display())

    # CLIENTES CON LOS QUE QUIERO TRABAJAR 
    y -= 60
    drawRectangle(x, y, width, height, c, "CLIENTES CON LOS QUE QUIERO TRABAJAR")

    y -= 10
    drawTag(x, y, c, "Lugar de Procedencia ", post.get_origin_display())

    if post.origin == 'SI': 
        # País de procedencia
        y -= 30
        drawTag(x, y, c, "País de procedencia", post.origin_country)

        # Estado / Provincia
        y -= 30
        drawTag(x, y, c, "Estado / Provincia ", post.origin_state)

        # Ciudad 
        y -= 30
        drawTag(x, y, c, "Ciudad ", post.origin_city)


    # DOCUMENTOS QUE PUEDO PRESENTAR A LOS CLIENTES
    y -= 60
    drawRectangle(x, y, width, height, c, "DOCUMENTOS QUE PUEDO PRESENTAR A LOS CLIENTES")

    y -= 20
    if post.have_documentation == True:
        drawData(x - 20, y, "Si", c) 
        y -= 30
        drawParagraph(post.get_documents_display(), x , y, c)

        if post.documents == "OTRO": 
            y -= 20
            drawData(x, y,  'Especifique: ' + post.documents_other, c) 
    else: 
        drawData(x, y, "No", c) 
    
    y -= 60
    
    # SUGERENCIAS ANTES DE REALIZAR UNA ENTREVISTA DE TRABAJO
    drawRectangle(x, y, width, height, c, "SUGERENCIAS ANTES DE REALIZAR UNA ENTREVISTA DE TRABAJO", 8)
    y -= 30

    drawParagraph("* Elije que ropa vas a utilizar en caso de una entrevista en vivo, o vía internet con tu empleador", x , y, c)
    y -= 20
    drawParagraph("* Descarta la ropa sexy. No es profesional", x , y, c)
    y -= 30
    drawParagraph("* Lee varias veces el anuncio que coloca un cliente, y elabora una lista de preguntas que quieras realizarle al potencial empleador", x , y, c)
    y -= 40
    drawParagraph("* Ten a la mano la documentación que se te sugirió en puntos anteriores, en caso de que algún cliente te la solicite. Así puedes incrementar tus probabilidades de éxito de ser contratado más rápidamente", x , y, c)

    c.showPage()
    # New page
    y = 750

    # SUGERENCIAS AL MOMENTO DE REALIZAR LA ENTREVISTA
    drawRectangle(x, y, width, height, c, "SUGERENCIAS AL MOMENTO DE REALIZAR LA ENTREVISTA", 8)
    y -= 50

    drawParagraph("Trate de determinar, con el mayor detalle posible, cuales son las necesidades del cliente, y pregunte todo lo que considere, y que le ayude a determinar si usted desea trabajar con ese cliente, o no", x , y, c)
    y -= 50
    drawParagraph("Averigüe dónde viven, datos de los familiares para avisar en caso de alguna emergencia (eso también le servirá a usted en caso de que su empleador, la exponga a maltratos laborales que no están permitidos en la ley, como explotación laboral, el no recibir la compensación acordada en el contrato de trabajo, humillaciones, gritos, entre otros.", x , y, c)
    y -= 60

    # SUGERENCIAS DE TRABAJO PARA EL DÍA A DÍA CON EL CLIENTE
    drawRectangle(x, y, width, height, c, "SUGERENCIAS DE TRABAJO PARA EL DÍA A DÍA CON EL CLIENTE", 8)
    y -= 20

    # Antes de iniciar sus labores
    drawTag(x, y, c, "Antes de iniciar sus labores ", "")
    y -= 50
    drawParagraph("Solicita tu contrato de trabajo por escrito, ya que este es el documento que certifica que estas laborando para el cliente", x , y, c)
    y -= 50
    drawParagraph("Asegúrese de tener una buena higiene personal, y abstenerse de fumar, ingerir bebidas alcohólicas o tener conductas que atenten contra la moral y las buenas costumbres, principalmente delante de los niños", x , y, c)
    y -= 60
    drawParagraph("Pregúntele al cliente cuáles son los procedimientos de seguridad para abrir la puerta, contestar el teléfono, personas a recibir en el inmueble, y cualquier otro asunto relacionado con las personas a su cuidado, o con el inmueble donde se realizarán las labores", x , y, c)
    y -= 70
    drawParagraph("Solicite información de contacto a su cliente sobre las personas a su cuidado como: Médico tratante, teléfono de empresas donde la(s) persona(s) bajo su cuidado están aseguradas, listado de clínicas cercanas a las que se pueda llevar a la persona en caso de emergencia, datos de contacto directo con el cliente, y con usted en caso de cualquier emergencia, o consulta que pueda tener la persona contratada o usted. ", x , y, c)
    y -= 50
    drawParagraph("Si puede, registre las huellas dactilares del personal a su servicio para que tenga una base para deslindar responsabilidades en caso de robo o cualquier incidente que podría haber originado dicha persona en el inmueble, o hacia las personas bajo su cuidado", x , y, c)
    y -= 20

    # En el día a día 
    drawTag(x, y, c, "En el día a día ", "")
    y -= 80
    drawParagraph("Procura tener una buena comunicación, de forma amable y respetuosa, con las personas que tendrá bajo su cargo, y trate de hacer su trabajo lo mejor posible. Este pendiente de las necesidades de las personas bajo tu cuidado. Recuerda que tu empleador está depositando su confianza en ti, y no hay mejor forma de retribuirle, que un trabajo bien hecho, y que la gente que cuidas se sienta bien a tu lado.", x , y, c)
    y -= 30
    drawParagraph("Mantén una comunicación constante con tu empleador,  y solicítale que quieres saber su opinión en relación al trabajo que estas desempeñando.", x , y, c)
    y -= 20

    # Si consideras que estas recibiendo un trato inadecuado por parte de tu empleador
    drawTag(x, y, c, "Si consideras que estas recibiendo un trato inadecuado por parte de tu empleador", "")
    y -= 90
    drawParagraph("Convérsalo con el y determina si las cosas pueden mejorar. Si las cosas no mejoran, puedes irte si lo deseas. Y en este caso ningún empleador puede retenerte por la fuerza, porque esto es un delito. Además también existen otros organismos que defienden los derechos de los trabajadores en caso de explotación laboral, o de condiciones no aptas para trabajar, y en los cuales debes presentar tu contrato y recibos de pago.", x , y, c)


    c.showPage()
    y = 750
    # Cuando recibas tu pago
    drawTag(x, y, c, "Cuando recibas tu pago", "")
    y -= 90
    drawParagraph("Solicita tu recibo de pago al cliente, para tener constancias de los pagos recibidos, ya que este documento, junto con el contrato de trabajo son tus pruebas ante las autoridades competentes de que tienes una relación laboral con el cliente, y para que ellos puedan ayudarte si tienes algún problema de explotación laboral, o falta de pago por parte de tu empleador", x , y, c)
    y -= 20

    # Cuando el personal finalice sus labores
    drawTag(x, y, c, "Cuando el personal finalice sus labores", "")
    y -= 40
    drawParagraph("Muestra tu bolso antes de salir del lugar de trabajo", x , y, c)

    y -= 20
    # Si usted decide no seguir trabajando con el cliente
    drawTag(x, y, c, "Si usted decide no seguir trabajando con el cliente", "")
    y -= 50
    drawParagraph("Avise con anticipación para que el cliente pueda buscar otra persona. Esto también ayuda a que deje una buena referencia con el cliente", x , y, c)

    # Sugerencias adicionales
    y -= 20
    drawTag(x, y, c, "Sugerencias adicionales", "")
    y -= 40
    drawParagraph("Guarda joyas u objetos que sean de valor para ti en lugares seguros", x , y, c)

    # CONSIDERACIONES DEL SERVICIO 
    y -= 40
    drawRectangle(x, y, width, height, c, "CONSIDERACIONES DEL SERVICIO", 8)
    y -= 30 
    drawParagraph("Los datos proporcionados son bajo la responsabilidad del anunciante, y la empresa queda exonerada de verificar su veracidad", x , y, c, colors.red)
    y -= 40 
    drawParagraph(" Las sugerencias proporcionadas son para orientar al cliente o al personal, y al aceptar la publicación de dicho anuncio la empresa queda exonerada de cualquier incidente que pudiera ocurrir entre el cliente y el personal contratado", x , y, c, colors.red)

    y -= 70
    # DATOS DE FACTURACIÓN
    drawRectangle(x, y, 150, height, c, "DATOS DE FACTURACIÓN", 8)
    drawRectangle(x + 170 , y, 230, height, c, "DATOS DE FACTURACIÓN", 8)

    # PLAN SELECCIONADO
    y -= 20
    drawSubtitle(x + 10, y, colors.blue, "Plan seleccionado", c)
    drawRectangle(x + 170 , y - 15, 150, 20, c, "País donde va a realizar el depósito", 8)
    drawSubtitle(x + 325, y - 13, colors.black, post.billing_country.upper(), c, 10)

    y -= 20
    drawSubtitle(x + 20, y, colors.black, post.get_publication_plan_display(), c)
    cost  = setCost(post.publication_plan)   
    drawSubtitle(x + 80, y, colors.red, str(cost) + ' USD', c)
    drawRectangle(x + 170 , y -20, 150, 20, c, "Datos de la cuenta seleccionada", 8)

    y -= 70
    drawRectangle(x + 170 , y, 230, height, c, post.billing_bank.name, 8)
    c.setStrokeColor(colors.HexColor('#FFC000'))
    c.rect(x + 170, y - 150, 230, 150, fill=False, stroke=True)

    y -= 15
    drawSubtitle(x + 180, y, colors.red,"Formas de pago", c, 12)
    y -= 15
    drawData(x + 170, y, " * Depósito", c)

    y -= 15
    drawData(x + 170, y, " * Transferencia Bancaria", c)

    y -= 20
    drawSubtitle(x + 180, y, colors.black, "País: ", c, 10)
    drawData(x + 200, y, post.billing_country, c)

    y -= 15
    drawSubtitle(x + 180, y, colors.black, "Banco: ", c, 10)
    drawData(x + 200, y, post.billing_bank.name, c)

    y -= 15
    drawSubtitle(x + 180, y, colors.black, "Nro de cuenta: ", c, 10)
    drawData(x + 240, y, post.billing_bank.account, c)

    y -= 15
    drawSubtitle(x + 180, y, colors.black, "Código SWIFT ", c, 10)
    drawData(x + 240, y, post.billing_bank.swift_code, c)


    c.showPage()
    c.save()
    pdf = buffer.getvalue()
    buffer.close()
    return pdf
   

def sendEmail(post):
    post_id = str(post.id).upper()              # Código de la publicación
    status = post.get_status_display().upper()  # Status
    billing_country = post.billing_country
    billing_bank = post.billing_bank.name
    nro_cuenta = post.billing_bank.account
    swift_code = post.billing_bank.swift_code

    # Create PDF 
    if post.mode == 'REQUEST':
       pdf = requestCreatePDF(post)
    elif post.mode == 'PROVIDE': 
       pdf = provideCreatePDF(post)    


    receiver = post.user.email
    message = f"""
        <p>Le notificamos que su publicación ha sido creada en nuestro sitio Web 3.137.150.119:5173 con el código número 
        <span style="color: blue;"> <b>{post_id} </b></span>.</p>
        <p>En este correo, además, puede ver en el archivo adjunto la publicación que ha creado en nuestro sitio Web.</p>
        <p> <b> Fecha de creación de la publicación: </b> 23 de Abril del 2020 </p>
        <p> ESTATUS DE LA PUBLICACIÓN: <span style="color: red;"> {status} </span> </p>
        <p> <b> <span style="color: blue;">Plazo para notificar el pago de la publicación: 3 días luego de haber sido creada la publicación en nuestro sitio Web</b>  </span>
        <p> <b> Fecha límite para notificar el pago de la publicación: </b> 26 de Abril del 2020 </p>
        <p> <span style="color: red;"> <b> Datos de la cuenta seleccionada por usted, para realizar su pago </b> </span> </p>

        <table style="border: 2px solid #FFC000;">
            <tr style="background-color: #0099CC; color: white;">
                <td> {billing_bank} </td>
            </tr>
            <tr>
                <td color: red;> <b> Formas de pago </b> </td>
            </tr>
            <tr>
                <td> </td> 
            </tr>
            <tr> 
                <td> * Depósito </td> 
            </tr>
            <tr> 
                <td> * Transferencia bancaria </td> 
            </tr>
            <tr>
                <td> <b> País: </b> { billing_country }</td>
            </tr>
            <tr>
                <td> <b> Banco: </b> { billing_bank }  </td>
            </tr>
            <tr>
                <td> <b> Nro de Cuenta: </b> { nro_cuenta }</td>
            </tr>
            <tr>
                <td> <b> Código SWIFT </b> { swift_code }</td>
            </tr>
        </table>

        <br>
        <p> <span style="color: blue;"> <b> ¿Que pasa si no he notificado el pago de la publicación luego de la fecha límite? </b> </span> </p>
        <p> La publicación será eliminada al día siguiente, y se le enviará un correo, con copia a la empresa, indicándole que su publicación fue eliminada por haber expirado el tiempo límite de notificación de pago, y deberá volver a crear su publicación nuevamente </p>
        <br> 

        <p> <span style="color: blue;"> <b> ¿Cómo puedo activar mi publicación? </b> </span>
        <ol type='1'>
            <li> Realice el depósito o transferencia en la cuenta que selecciono para notificar el pago </li>
            <li> Notifique el pago de su publicación enviando un correo a nirvana01@gmail.com . En dicho correo debe indicar los siguientes datos: 
                <ol type="a">
                <b>
                    <li> Tipo de operación: Depósito / Transferencia </li>
                    <li> Monto: </li>
                    <li> Fecha en que realizó la operación: </li>
                    <li> Banco origen   : </li>
                    <li> Banco destino :  </li>
                    <li> Número depósito/transferencia: </li>
                    <li> Código de la publicación: </li> 
                    <li> En el título del mensaje colocar esto: </b> 
                     NOTIFICACIÓN  - PAGO DE PUBLICACIÓN - <código de su publicación> - PORTAL SD  
                     <br>
                     <b> EJEMPLO </b>
                     <br>
                     NOTIFICACIÓN  - PAGO DE PUBLICACIÓN - 2347998 - PORTAL SD  
                </ol>
            </li>
            <li> Luego recibirá un correo de nuestra parte indicándole que su pago está siendo verificado , y cuando se haya verificado se activará la publicación en un plazo de 1 a 2 días hábiles. En algunos casos, las transferencias internacionales pueden tomar hasta 5 días hábiles, por razones externas a la empresa </li>
            <li> Cuando la empresa haya verificado su pago, le enviará un correo indicándole que su pago fue procesado y además le enviaremos información para que pueda verificar que su publicación ya esta disponible </li> 
        </ol>
        <br>
        <p> <span style="color: blue;"> <b> ¿Tiene alguna duda sobre nuestro servicio, o sobre tu publicación?  </b> </span> </p>
        <ol> 
            <li> Revise la sección Preguntas frecuentes haciendo clic aquí: <u style="color: blue;"> <b> Preguntas frecuentes </b>  </u> </li> 
            <li> Si la sección de preguntas frecuentas no responde su inquietud, escríbanos a nirvana01@gmail.com </li> 
        </ol> 
    """

    email = EmailMessage()
    email["From"] = EMAIL_HOST_USER
    email["To"] = receiver
    email["Subject"] = "PUBLICACIÓN NRO <" + str(post.id) + "> HA SIDO CREADA - ESTATUS DE LA PUBLICACIÓN: " + post.get_status_display()
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
        'user': ['exact'], 

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
            sendEmail(post)
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
        'user': ['exact'], 

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
            sendEmail(post)
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
    





        
        
