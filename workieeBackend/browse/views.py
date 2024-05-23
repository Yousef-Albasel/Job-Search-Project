from django.shortcuts import render

# Create your views here.

def browse(request):
    return render(request, 'browseJob.html')
def jobdes(request):
    return render(request,'jobDescription.html')