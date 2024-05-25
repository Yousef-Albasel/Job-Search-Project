from django.db import models
from authentication.models import User
from jobs.models import Jobs

class jobApplication(models.Model):
    user_id = models.IntegerField(null=True)  
    job_id = models.IntegerField(null=True)   

