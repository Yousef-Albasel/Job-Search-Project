from django.db import models

class User(models.Model):
    username = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    is_company_admin = models.BooleanField(default=False)
    company_name = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.username
