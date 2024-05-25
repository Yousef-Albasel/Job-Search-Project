from django.shortcuts import render
from django.http import HttpResponse , HttpResponseRedirect
from django.template import loader
from .models import Jobs
from django.urls import reverse
import json

def Index(request):
  tmp= loader.get_template('index.html')
  alljobs=Jobs.objects.all().values()
  context = {
        'jobs' : alljobs,
    }
  return HttpResponse(tmp.render(context,request))


def add(request):
  template = loader.get_template('addJob.html')
  return HttpResponse(template.render())

def addrecord(request):
  jobTitle=request.POST.get('jobTitle')
  jobSalary=request.POST.get('jobSalary')
  jobStatus=request.POST.get('jobStatus')
  yearsOfExperience = request.POST.get('yearsOfExperience')
  companyName=request.POST.get('CompanyName')
  companyAddress=request.POST.get('CompanyAddress')
  jobDesc=request.POST.get('jobDescription')
  jobReq=request.POST.get('jobRequirements')
  user_id = request.POST.get('user_id')


  job =Jobs(
    jobtitle =jobTitle , 
    jobsalary = jobSalary,
    jobstatus =jobStatus ,
    yearsofexperience=yearsOfExperience,
    companyname = companyName,
    companyaddress = companyAddress,
    jobdescription = jobDesc , 
    jobrequirements = jobReq,
    user_id_id = user_id
    ) 

  job.save()
  return HttpResponseRedirect(reverse('admin-dashboard'))

def delete(request, id):
  job = Jobs.objects.get(id=id)
  job.delete()
  return HttpResponseRedirect(reverse('admin-dashboard'))


def loadDashboard(request):
  tmp= loader.get_template('admin-dashboard.html')
  listOfJobs = Jobs.objects.all()
  context = {
        'jobs' : listOfJobs,
    }
  return HttpResponse(tmp.render(context,request))



def edit(request,id):
  template= loader.get_template('editJob.html')
  alljobs = Jobs.objects.get(id=id)
  context = {
        'x' : alljobs,
    }
  return HttpResponse(template.render(context,request))
 
def update (request):
  desiredid=request.POST.get('id')

  editedjob = Jobs.objects.get(id=desiredid)
 
  editedjob.jobtitle=request.POST.get('jobTitle')
  editedjob.jobsalary=request.POST.get('jobSalary')
  editedjob.jobstatus=request.POST.get('JobStatus')
  editedjob.yearsofexperience = request.POST.get('yearsOfExperience')
  editedjob.companyname=request.POST.get('CompanyName')
  editedjob.companyaddress=request.POST.get('CompanyAddress')
  editedjob.jobdescription=request.POST.get('jobDescription')
  editedjob.jobrequirements=request.POST.get('jobRequirements')

  editedjob.save()
  return HttpResponseRedirect(reverse('admin-dashboard'))