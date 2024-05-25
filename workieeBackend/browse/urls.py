from . import views
from django.urls import path

urlpatterns = [
    path('', views.browse, name='browse'),
    path('details/', views.details, name='jobDetails'),
    path('apply/', views.apply, name='apply'),
    path('getApplications/',views.getApplications, name ='getApplications'),
    path('delete_application/<int:id>',views.delete_application,name='delete_application'),
]