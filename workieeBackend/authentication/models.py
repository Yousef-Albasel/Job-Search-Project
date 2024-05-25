from django.db import models
class User(models.Model):
    username = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    is_company_admin = models.BooleanField(default=False)
    company_name = models.CharField(max_length=255, null=True, default="N/A")
    current_job = models.CharField(max_length=255,null=True,blank=True, default="N/A")
    resume_link = models.CharField(max_length=255,null=True,blank=True, default="N/A")
    picture_link = models.CharField(max_length=255,null=True,blank=True, default="N/A")
    skills = models.CharField(max_length=255,null=True,blank=True, default="N/A")
    profile_description = models.CharField(max_length=255,null=True,blank=True, default="N/A")


    def __str__(self):
        return self.username
