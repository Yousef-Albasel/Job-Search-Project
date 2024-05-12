from django.shortcuts import render,redirect
from.models import User
import hashlib

def register(request):
    if request.method == 'POST':
        username = request.POST['username']
        email = request.POST['email']
        password = request.POST['password']
        is_company_admin = 'company-admin' in request.POST.getlist('registration-type')
        company_name = request.POST['company-name']

        hashed_password = hashlib.sha256(password.encode()).hexdigest()

        try:
            user = User(username=username, email=email, password=hashed_password, is_company_admin=is_company_admin, company_name=company_name)
            user.save()
        except Exception as e:
            print(e) 
        return redirect('view_users')

    return render(request, 'signup.html')

def view_users(request):
    return render(request, 'view_users.html')