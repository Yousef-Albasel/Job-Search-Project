from django.contrib import admin
from django.urls import path,include
from . import views

urlpatterns = [
  path('',views.index,name='index'),
  path('add/',views.add,name='add'),
  path('add/addrecord/',views.addrecord,name='addrecord'),
  path('delete/<int:id>',views.delete,name='delete'),
<<<<<<< Updated upstream
=======
  path('edit/<int:id>',views.edit,name='edit'),
>>>>>>> Stashed changes
]