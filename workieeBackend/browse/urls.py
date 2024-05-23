from . import views
from django.urls import path

urlpatterns = [
    path('', views.browse, name='browse'),
    path('Details/',views.jobdes,name='jobdescription'),
]