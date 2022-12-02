from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
from django.templatetags.static import static

from .functions import email_sender

from mysite import settings
import json
from pprint import pprint

# Create your views here.

def home(request):
    return render(request,"portfolioapp/home.html")


def projects(request):
    
    with open(settings.GITHUB_INFO_FILE,"rb") as github_info:
        gi = json.load(github_info)
        repos = gi.get("repos",[])
    return render(request,"portfolioapp/projects.html",{"repos":repos})


def message(request):
    if request.method != "POST":
        return JsonResponse({"message":"Failed","description":f"Request should be a post request and not {request.method}"})
    
    email = request.POST.get("email")
    subject = request.POST.get("subject")
    message = request.POST.get("message")

    success = email_sender.send_message(email,subject,message)
    if not success:
        return JsonResponse({
            "message":"Failed",
            "messageCode":-1,
            "description":"The server failed while sending your message",
        })

    return JsonResponse({
        "message":"Success",
        "description":"Message sent",
        "messageCode":1,
    })

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


    