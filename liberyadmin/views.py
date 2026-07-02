from django.shortcuts import render,redirect
from django.core.paginator import Paginator

from library.models import Book

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

            books = Book.objects.all()
            paginator = Paginator(books, 2) 
            page_number = request.GET.get("page")
            page_obj = paginator.get_page(page_number)
            return render(request,'libraryadmin/inventery.html',{'page_obj':page_obj})
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
    
def bookdelete(request,bid):
    book = Book.objects.get(id=bid)
    book.delete()
    return redirect("inventary")