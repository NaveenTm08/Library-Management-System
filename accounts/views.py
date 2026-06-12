from django.shortcuts import render,redirect
from django.contrib.auth.models import User

# Create your views here.
def home(request):
    return render(request,"user/home.html")

def login(request):
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
        phone = request.POST.get("phone")
        
        form = {
            "fullName": fullname,
            "email": email,
            "memberId": member,
            "phone": phone
        }
        
        if password == confirm_password:
            if User.objects.filter(username=email).exists():
                error = "Email already exists"
            else:
                user = User.objects.create_user(username=email, email=email, password=password)
                user.save()
                return redirect("/login/")
        else:
            error = "Passwords do not match"

    return render(request, "user/createacc.html", {"error": error,"form": form})

