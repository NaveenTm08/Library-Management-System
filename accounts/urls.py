from django.urls import path
from accounts import views

urlpatterns = [
    path('',views.home),
    path('login/',views.login,name="login"),
    path('create/',views.create),
    path('logout/',views.signout,name="logout"),
   
]