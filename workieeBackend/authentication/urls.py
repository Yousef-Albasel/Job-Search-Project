from django.urls import path
from . import views

urlpatterns = [
    path('signup', views.register, name='register'),
    path('signup/addrecord/', views.addrecord, name='addrecord'),
    path('allusers', views.view_users, name='view_users'),
]