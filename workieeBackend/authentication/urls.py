from django.urls import path
from .views import *

urlpatterns = [
    path('signup.html', register, name='register'),
    path('index.html', view_users, name='view_users'),
]