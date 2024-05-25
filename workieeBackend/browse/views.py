from django.shortcuts import render,get_object_or_404, redirect
from django.http import HttpResponse , HttpResponseRedirect,JsonResponse,HttpResponseBadRequest 
from django.template import loader
from django.urls import reverse
from jobs.models import Jobs
from django.template.loader import render_to_string
from applications.models import jobApplication
import json
# Create your views here.

def browse(request):
    is_ajax = request.headers.get('X-Requested-With') == 'XMLHttpRequest'
    
    if is_ajax:
        if request.method == 'GET':
            jobs = list(Jobs.objects.values())  # Convert QuerySet to list of dictionaries
            return JsonResponse({'jobs': jobs})
        else:
            return JsonResponse({'status': 'Invalid request'}, status=400)
    else:
        # Render the template for the initial page load
        listOfJobs = Jobs.objects.all()
        html_content = render_to_string('browseJob.html', {'jobs': listOfJobs}, request=request)
        return HttpResponse(html_content)
    

def apply(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        user_id = data.get('user_id')
        job_id = data.get('job_id')

        application = jobApplication.objects.create(
            user_id=user_id,
            job_id=job_id
        )
        application.save()
        return JsonResponse({'status': 'success'})
    else:
        return JsonResponse({'status': 'error', 'message': 'Only POST requests are allowed'}, status=405)
    
def getApplications(request):
    is_ajax = request.headers.get('X-Requested-With') == 'XMLHttpRequest'
    if is_ajax:  
        apps = list(jobApplication.objects.values())  
        return JsonResponse({'apps': apps})  
    else:
        return JsonResponse({'error': 'Not an AJAX request'}, status=400)
    
def delete_application(request, id):
  application = jobApplication.objects.get(id=id)
  application.delete()
  return HttpResponseRedirect(reverse('admin-dashboard'))