from django.shortcuts import render
from django.http import HttpResponse , HttpResponseRedirect
from django.template import loader
from django.urls import reverse
from .models import User
import hashlib

def register(request):
    template = loader.get_template('signup.html')
    return HttpResponse(template.render())
    
def addrecord(request):
    if request.method == 'POST':
        username = request.POST['username']
        email = request.POST['email']
        password = request.POST['password']
        is_company_admin = 'company-admin' in request.POST.getlist('registration-type')
        company_name = request.POST['company-name']

        # hashed_password = hashlib.sha256(password.encode()).hexdigest()
        usr = User(
            username = username,
            email=email,
            password=password,
            is_company_admin=is_company_admin,
            company_name=company_name
        )

        usr.save()
    return HttpResponseRedirect(reverse('view_users'))

def view_users(request):
    template =loader.get_template('view_users.html')
    allUsrs=User.objects.all().values()
    context={
        'User':allUsrs
    }
    return HttpResponse(template.render(context,request))