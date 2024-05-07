from django.shortcuts import render
from django.http import HttpResponse , HttpResponseRedirect
from django.template import loader
from .models import Jobs
from django.urls import reverse
# Create your views here.

def index(request):
  tmp= loader.get_template('index.html')
  alljobs=Jobs.objects.all().values()
  context = {
        'jobs' : alljobs,
    }
  return HttpResponse(tmp.render(context,request))
