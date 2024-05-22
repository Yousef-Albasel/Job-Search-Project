from django.contrib import admin
from django.urls import path,include
from . import views

urlpatterns = [
  path('',views.Index,name='Index'),
  path('add/',views.add,name='add'),
  path('add/addrecord/',views.addrecord,name='addrecord'),
  path('delete/<int:id>',views.delete,name='delete'),
  path('edit/<int:id>',views.edit,name='edit'),
  path('update/',views.update,name='update'),

]