from django.urls import path
from . import views

urlpatterns = [
    path('admin-dashboard', views.loadDashboard, name='admin-dashboard'),
    path('delete-job/', views.deleteJob, name='delete-job'),

]