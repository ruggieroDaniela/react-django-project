from django.urls import include, path
from rest_framework import routers 
from . import views

router = routers.DefaultRouter()
router.register(r'provideService', views.ProvideServiceViewSet)
router.register(r'requestService', views.RequestServiceViewSet)

urlpatterns = [
    path('provide/get_post/<str:pk>/', views.ProvideServiceViewSet.as_view({'get': 'get_post'}), name='get_post'),
    path('request/get_post/<str:pk>/', views.RequestServiceViewSet.as_view({'get': 'get_post'}), name='get_post'),
    path('get_post/<str:pk>/', views.PostViewSet.as_view({'get': 'get_post'})), 
    
    path('', include(router.urls))
]