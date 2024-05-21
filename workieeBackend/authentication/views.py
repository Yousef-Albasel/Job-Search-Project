from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.template import loader
from django.urls import reverse
from .models import User
import hashlib
from django.contrib.auth import authenticate
from authentication.models import User
from django.template.loader import render_to_string


def register(request):
    template = loader.get_template("signup.html")
    return HttpResponse(template.render())


def addUser(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]
        password = request.POST["password"]
        is_company_admin = "company-admin" in request.POST.getlist("registration-type")
        company_name = request.POST["company-name"]

        hashed_password = hashlib.sha256(password.encode()).hexdigest()
        usr = User(
            username=username,
            email=email,
            password=password,
            is_company_admin=is_company_admin,
            company_name=company_name,
        )

        usr.save()
    return HttpResponseRedirect(reverse("login"))


def view_users(request):
    template = loader.get_template("view_users.html")
    allUsrs = User.objects.all().values()
    context = {"User": allUsrs}
    return HttpResponse(template.render(context, request))


def delete_user(request, user_id):
    user = get_object_or_404(User, id=user_id)
    user.delete()
    return redirect("view_users")


def check_user_exists(request):
    username = request.GET.get("username")
    user_exists = User.objects.filter(username=username).exists()
    return JsonResponse({"exists": user_exists})


def check_email_exists(request):
    email = request.GET.get("email")
    email_exists = User.objects.filter(email=email).exists()
    return JsonResponse({"exists": email_exists})


def login(request):
    is_ajax = request.headers.get("X-Requested-With") == "XMLHttpRequest"

    if is_ajax:
        if request.method == "GET":
            users = list(User.objects.values())
            return JsonResponse({"users": users})
        else:
            return JsonResponse({"status": "Invalid request"}, status=400)
    else:
        template = loader.get_template("Login.html")
        return HttpResponse(template.render({}, request))


# def check_login_information(request):
#     email = request.POST.get("email")
#     password = request.POST.get("password")
#     email_exists = User.objects.filter(email=email).exists()
#     password_correct = False
#     if email_exists:
#         user = authenticate(email=email, password=password)
#         if user is not None:
#             password_correct = True
#     return JsonResponse(
#         {"email_exists": email_exists, "password_correct": password_correct}
#     )

# def retreive_users(request):

#     is_ajax = request.headers.get('X-Requested-With') == 'XMLHttpRequest'

#     if is_ajax:
#         if request.method == 'GET':
#             users = list(User.objects.values())
#             return JsonResponse({'users': users})
#         else:
#             return JsonResponse({'status': 'Invalid request'}, status=400)
#     else:
#         listOfUsers = User.objects.all()
#         html_content = render_to_string('login.html', {'users': listOfUsers}, request=request)
#         return HttpResponse(html_content)
