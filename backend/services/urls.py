from django.urls import include, path
from rest_framework import routers 
from . import views

router = routers.DefaultRouter()
router.register(r'provideService', views.ProvideServiceViewSet)
router.register(r'requestService', views.RequestServiceViewSet)

urlpatterns = [
    # Get post
    path('provide/get_post/<str:pk>/', views.ProvideServiceViewSet.as_view({'get': 'get_post'}), name='get_post'),
    path('request/get_post/<str:pk>/', views.RequestServiceViewSet.as_view({'get': 'get_post'}), name='get_post'),

    # Enable post
    path('provide/enable_post/<str:pk>/', views.ProvideServiceViewSet.as_view({'put': 'enable_post'}), name='enable_post'), 
    path('request/enable_post/<str:pk>/', views.RequestServiceViewSet.as_view({'put': 'enable_post'}), name='enable_post'), 

    # Delete post
    path('provide/delete_post/<str:pk>/', views.ProvideServiceViewSet.as_view({'delete': 'delete_post'}), name='delete_post'),
    path('request/delete_post/<str:pk>/', views.RequestServiceViewSet.as_view({'delete': 'delete_post'}), name='delete_post'),
    
    path('', include(router.urls))
]