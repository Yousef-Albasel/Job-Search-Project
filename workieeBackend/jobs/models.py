from django.db import models

class Jobs(models.Model):
    jobtitle = models.CharField(max_length=255)
    jobsalary = models.IntegerField(default=0)
    jobstatus = models.CharField(max_length=255)
    yearsofexperience = models.CharField(max_length=255)
    companyname = models.CharField(max_length=255)
    companyaddress = models.CharField(max_length=255)
    jobdescription = models.TextField(default='')
    jobrequirements = models.TextField(default='')
