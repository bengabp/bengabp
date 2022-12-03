from django.urls import path,include
from . import views

urlpatterns = [
    path("",views.home,name="home"),
    path("projects",views.projects,name="projects"),
    path("github-info",views.github_information,name="github_information")
]



