from django.http import HttpResponse
from django.shortcuts import render

def error_404_handler(request,exception):
    return render(request,"error_pages/404.html")