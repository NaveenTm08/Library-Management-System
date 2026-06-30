from django.shortcuts import render

# Create your views here.

def dashboard(request):
    return render(request,'libraryadmin/dashboard.html')
def inventery(request):
    return render(request,'libraryadmin/inventery.html')
def members(request):
    return render(request,"libraryadmin/members.html")