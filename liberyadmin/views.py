from django.shortcuts import render,redirect

# Create your views here.

def dashboard(request):
    if request.user.is_authenticated:
        user = request.user
        if user.is_staff:
            return render(request,'libraryadmin/dashboard.html')
        else:
            return redirect("/")
    else:
        return redirect("/")
    


def inventery(request):
    if request.user.is_authenticated:
        if request.user.is_staff:
            return render(request,'libraryadmin/inventery.html')
        else:
            return redirect("/")
    else:
         return redirect("/")
    


def members(request):
    if request.user.is_authenticated:
        if request.user.is_staff:
            return render(request,"libraryadmin/members.html")
        else:
            return redirect("/")
    else:
        return redirect("/")
    

def addbooks(request):
    if request.user.is_authenticated:
        if request.user.is_staff:
            return render(request,'libraryadmin/add_book.html')
        else:
            return redirect("/")
    else:
        return redirect("/")
    

def addmembers(request):
    if request.user.is_authenticated:
        if request.user.is_staff:
            return render(request,'libraryadmin/new_members.html')
        else:
            return redirect("/")
    else:
        return redirect("/")


def duebooks(request):
    if request.user.is_authenticated:
        if request.user.is_staff:
            return render(request,'libraryadmin/due_books.html')
        else:
            return redirect("/")
    else:
        return redirect("/")