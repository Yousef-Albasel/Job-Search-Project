from django.shortcuts import render,get_object_or_404, redirect
from django.http import HttpResponse , HttpResponseRedirect,JsonResponse,HttpResponseBadRequest 
from django.template import loader
from django.urls import reverse
from jobs.models import Jobs
from django.template.loader import render_to_string

# Create your views here.

def loadDashboard(request):
    is_ajax = request.headers.get('X-Requested-With') == 'XMLHttpRequest'
    
    if is_ajax:
        if request.method == 'GET':
            jobs = list(Jobs.objects.values())  
            return JsonResponse({'jobs': jobs})
        else:
            return JsonResponse({'status': 'Invalid request'}, status=400)
    else:

        listOfJobs = Jobs.objects.all()
        html_content = render_to_string('admin-dashboard.html', {'jobs': listOfJobs}, request=request)
        return HttpResponse(html_content)


def deleteJob(request):
    job_id = request.POST.get('jobId')
    if job_id:
        try:
            job = Jobs.objects.get(id=job_id)
            job.delete()
            return JsonResponse({'status': 'success'})
        except Jobs.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'Job not found'}, status=404)
    return JsonResponse({'status': 'error', 'message': 'Invalid request'}, status=400)
