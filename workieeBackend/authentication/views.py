from django.shortcuts import render,get_object_or_404, redirect
from django.http import HttpResponse , HttpResponseRedirect,JsonResponse
from django.template import loader
from django.urls import reverse
from .models import User
import hashlib
from django.template.loader import render_to_string

from jobs.models import Jobs

def register(request):
    template = loader.get_template('signup.html')
    return HttpResponse(template.render())
    
def addUser(request):
    if request.method == 'POST':
        username = request.POST['username']
        email = request.POST['email']
        password = request.POST['password']
        is_company_admin = 'company-admin' in request.POST.getlist('registration-type')
        company_name = request.POST['company-name']

        hashed_password = hashlib.sha256(password.encode()).hexdigest()
        usr = User(
            username = username,
            email=email,
            password=password,
            is_company_admin=is_company_admin,
            company_name=company_name
        )

        usr.save()
    return HttpResponseRedirect(reverse('login'))

def view_users(request):
    template =loader.get_template('view_users.html')
    allUsrs=User.objects.all().values()
    context={
        'User':allUsrs
    }
    return HttpResponse(template.render(context,request))

def delete_user(request, user_id):
    user = get_object_or_404(User, id=user_id)
    user.delete()
    return redirect('view_users')

def check_user_exists(request):
    username = request.GET.get('username')
    user_exists = User.objects.filter(username=username).exists()
    return JsonResponse({'exists': user_exists})

def check_email_exists(request):
    email = request.GET.get('email')
    email_exists = User.objects.filter(email=email).exists()
    return JsonResponse({'exists': email_exists})


def login(request):
    return render(request, 'Login.html')

    
def ajax_get_users(request):
    is_ajax = request.headers.get('X-Requested-With') == 'XMLHttpRequest'
    if is_ajax:  
        users = list(User.objects.values())  
        return JsonResponse({'users': users})  
    else:
        return JsonResponse({'error': 'Not an AJAX request'}, status=400)
    
def logout(request):
    return redirect('login')
