from django.shortcuts import render,get_object_or_404, redirect
from django.http import HttpResponse , HttpResponseRedirect,JsonResponse,HttpResponseBadRequest 
from django.template import loader
from django.urls import reverse
from jobs.models import Jobs
from django.template.loader import render_to_string

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
    
def details (request):
    return render (request,'jobDescription.html')#clean code