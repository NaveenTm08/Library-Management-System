from django.shortcuts import render,redirect
from django.contrib.auth.models import User
from accounts.models import UserDetails
from django.db.models import Q
from django.contrib.auth import authenticate,login as account_login,logout
from library.models import Book, BookCategory


# Create your views here.
def home(request):
    trendingbooks = Book.objects.all().order_by('-id')[:10]
    allbooks = Book.objects.all().order_by('?')
    catgeries = BookCategory.objects.all()

    q = request.GET.get("q")
    category = request.GET.get("category")
    # available = request.GET.get("available")
    if category :
        if category=="all":
            allbooks = Book.objects.filter(Q(title__icontains=q) | Q(author__icontains=q) | Q(description__icontains=q)|Q(category__name__icontains=q))
        else:
            allbooks = Book.objects.filter(category__name=category).filter(Q(title__icontains=q) | Q(author__icontains=q) | Q(description__icontains=q)|Q(category__name__icontains=q))

    return render(request,"user/home.html",{"trendingbooks":trendingbooks, "allbooks":allbooks,"catgeries":catgeries})

def login(request):
    if request.method == "POST":
        email = request.POST.get("email")
        password = request.POST.get("password")
        user = authenticate(username=email, password=password)
        if user:
            account_login(request, user)    
            return redirect("/users/dashboard/")
        else:
            error = "Invalid email or password"
            return render(request, "user/login.html", {"error": error})
    return render(request,"user/login.html")


def create(request):
    error = None
    form = None
    if request.method == "POST":
        fullname = request.POST.get("fullName")
        email = request.POST.get("email")
        password = request.POST.get("password")
        member = request.POST.get("memberId")
        confirm_password = request.POST.get("confirmPassword")
        phone1 = request.POST.get("phone")
        
        form = {
            "fullName": fullname,
            "email": email,
            "memberId": member,
            "phone": phone1
        }
        
        if password == confirm_password:
            if User.objects.filter(username=email).exists():
                error = "Email already exists"
            else:
                user = User.objects.create_user(username=email, email=email, password=password,first_name=fullname)
                userdetails = UserDetails(user=user, phone=phone1, member_id=member)
                userdetails.save()
                return redirect("/login/")
        else:
            error = "Passwords do not match"

    return render(request, "user/createacc.html", {"error": error,"form": form})

def signout(request):
    logout(request)
    return redirect("/")
