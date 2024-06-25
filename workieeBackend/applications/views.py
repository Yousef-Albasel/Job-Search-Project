from authentication.models import User
from django.shortcuts import render,get_object_or_404, redirect
from django.http import HttpResponse , HttpResponseRedirect,JsonResponse
from django.template import loader
from django.urls import reverse
from .models import User
from .models import jobApplication
from django.template.loader import render_to_string
import json
def profile(request):
    return render(request, 'Profile.html')

def update_user_profile(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            user_id = data.get('userId')
            username = data.get('username')
            email = data.get('email')
            current_job = data.get('currentJob')
            company_name = data.get('companyName')
            skills = data.get('skills')
            resume = data.get('resume')
            pic = data.get('pic')
            description = data.get('description')
            user = User.objects.get(id=user_id)
            if username:
                user.username = username
            if email:
                user.email = email
            if current_job:
                user.current_job = current_job
            if company_name:
                user.company_name = company_name
            if skills:
                user.skills = skills
            if resume:
                user.resume_link = resume
            if pic:
                user.picture_link = pic
            if description:
                user.profile_description = description
            user.save()
            return JsonResponse({'status': 'success'})
        except User.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'User does not exist'})
        except json.JSONDecodeError:
            return JsonResponse({'status': 'error', 'message': 'Invalid JSON data'})
    else:
        return JsonResponse({'status': 'error', 'message': 'Invalid request method'})
    
def delete_application(request, id):
    if request.method == 'GET':
        try:
            application = get_object_or_404(jobApplication, id=id)
            application.delete()
            return JsonResponse({'status': 'success'})
        except jobApplication.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'Application does not exist'})
    else:
        return JsonResponse({'status': 'error', 'message': 'Invalid request method'})