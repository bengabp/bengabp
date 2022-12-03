from django.db import models

# Create your models here.
class WorkExperience(models.Model):
    company_name = models.TextField(max_length=20)
    company_link = models.TextField(max_length=100)
    description = models.TextField(max_length=500)

    