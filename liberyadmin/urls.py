from django.urls import path
from liberyadmin import views

urlpatterns = [
    path("",views.dashboard),
    path("inventery/",views.inventery),
    path("members/",views.members),
]