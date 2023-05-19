from django.urls import include, path
from rest_framework import routers 
from . import views

router = routers.DefaultRouter()
router.register(r'provideService', views.ProvideServiceViewSet)
router.register(r'requestService', views.RequestServiceViewSet)
#router.register(r'searchService', views.Search)

urlpatterns = [
    path('', include(router.urls))
]