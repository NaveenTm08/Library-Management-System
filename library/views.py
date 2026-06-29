from django.shortcuts import render,redirect

from library.models import Book,BookCategory,Author
from django.db.models import Q



# Create your views here.
def dashboard(request):
    if request.user.is_authenticated:
        return render(request,"user/dashboard.html")
    else:
        return redirect("/")
def books(request):
    books = Book.objects.all()
    #  = request.Get.get("")
    categary = BookCategory.objects.all()
    author = Author.objects.all() 
    if request.GET.get("availability"):
        availability_f = request.GET.get("availability")
        if availability_f =="available":
            availability_f = True
        else:
            availability_f = False
        books = Book.objects.filter(status= availability_f)

    if request.GET.get("category") or request.GET.get("author"):
        category_f = request.GET.get("category")
        author_f = request.GET.get("author")

        if category_f == "" and author_f == "":
            books = Book.objects.filter(status = availability_f)
        elif category_f and (not author_f) :
            books = Book.objects.filter(category__name = category_f,status = availability_f)
        elif (not category_f) and author_f:
            books = Book.objects.filter(author__name = author_f,status = availability_f)
        else:
            books = Book.objects.filter(category__name = category_f,author__name = author_f,status = availability_f)
    
    return render(request,"user/books.html",{"books":books,"category":categary,"author":author,})

def borrowedbooks(request):
    if request.user.is_authenticated:
        return render(request,"user/borrowedbooks.html")
    else:
        return redirect("/")
    # return render(request,"user/borrowedbooks.html")
