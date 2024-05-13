from django.urls import path
from . import views

urlpatterns = [
    path('signup', views.register, name='register'),
    path('signup/addUser/', views.addUser, name='addUser'),
    path('allusers', views.view_users, name='view_users'),
    path('login', views.login, name='login'),
    path('delete_user/<int:user_id>/', views.delete_user, name='delete_user'),
    path('check_user_exists/', views.check_user_exists, name='check_user_exists'),
    path('check_email_exists/', views.check_email_exists, name='check_email_exists'),
]