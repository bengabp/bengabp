from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
from django.templatetags.static import static

from mysite import settings
import json
from pprint import pprint
import os

from .models import WorkExperience

# Create your views here.

def home(request):
    tech_dir = settings.BASE_DIR / "static/images/technology_logos"
    technologies = os.listdir(tech_dir)
    context = {
        "technologies":technologies,
        "workexperiences":WorkExperience.objects.all()
    }
    return render(request,"portfolioapp/home.html",context=context)


def projects(request):
    
    with open(settings.GITHUB_INFO_FILE,"rb") as github_info:
        gi = json.load(github_info)
        repos = gi.get("repos",[])
    return render(request,"portfolioapp/projects.html",{"repos":repos})


def github_information(request):
    with open(settings.GITHUB_INFO_FILE,"rb") as github_info:
        gi = json.load(github_info)
        languages_info = gi.get("language_information",{})
        commits_history = gi.get("commits_history",[])

        return JsonResponse({
            "message":"Success",
            "languages_information":languages_info,
            "commits_history":commits_history,
            "messageCode":1,
        })

