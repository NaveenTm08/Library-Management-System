from django.shortcuts import render

# Create your views here.
def dashboard(request):
    return render(request,"user/dashboard.html")
def books(request):
    return render(request,"user/books.html")
def borrowedbooks(request):
    return render(request,"user/borrowedbooks.html")

