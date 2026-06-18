from django.shortcuts import render,redirect

# Create your views here.
def dashboard(request):
    if request.user.is_authenticated:
        return render(request,"user/dashboard.html")
    else:
        return redirect("/")
def books(request):
    return render(request,"user/books.html")
def borrowedbooks(request):
    if request.user.is_authenticated:
        return render(request,"user/borrowedbooks.html")
    else:
        return redirect("/")
    # return render(request,"user/borrowedbooks.html")
