from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
from django.templatetags.static import static

from .functions import email_sender

# Create your views here.

def home(request):
    return render(request,"portfolioapp/home.html")

def projects(request):
    projects = [
        {
            'name':"SpeechBot",
            'description':"Conversational SpeechBot to communicate in real time with users",
            'github_url':"https://github.com/bengab-coder",
            'tags':['python3','machine learning',"chatbot","tensorflow","nlp"],
            'image_url':static("images/project_images/project1.png")
        },
        {
            'name':"Devhub",
            'description':"Devhub is a social media platform where tech people can ineteract together",
            'github_url':"https://github.com/bengab-coder",
            'tags':['python3','django','backend','apis'],
            'image_url':static("images/project_images/project2.png")
        },
        {
            'name':"FlutterNewsApp",
            'description':"News app made using flutter which uses the google news api",
            'github_url':"https://github.com/bengab-coder",
            'tags':['dart','flutter','mobile development','ui/ux','api'],
            'image_url':static("images/project_images/project3.png")
        },
        {
            'name':"Remotefiles",
            'description':"EasyPizy file sharing website.Share small files with ease across all your devices",
            'github_url':"https://github.com/bengab-coder",
            'tags':['python3','fastapi','api','backend webdevelopment',"javascript","jquery"],
            'image_url':static("images/project_images/project4.png")
        },
        {
            'name':"Animal classification",
            'description':"The model used was trained usng teachable machine. It is able to tell which type of animal from its image",
            'github_url':"https://github.com/bengab-coder",
            'tags':['python3','machine learning','keras',"model training","flask","backend","html","css"],
            'image_url':static("images/project_images/project5.png")
        },
    ]
    return render(request,"portfolioapp/projects.html",{"projects":projects})


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
            "description":"The server failed while sending your message",
        })

    return JsonResponse({
        "message":"Success",
        "description":"Message sent",
    })
    