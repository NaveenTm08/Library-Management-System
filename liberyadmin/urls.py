from django.urls import path
from liberyadmin import views

urlpatterns = [
    path("",views.dashboard,name='libraryadmin'),
    path("inventery/",views.inventery,name="inventary"),
    path("members/",views.members),
    path("addbooks/",views.addbooks),
    path('addmembers/',views.addmembers),
    path('duebooks/',views.duebooks),
    path("inventery/bookdelete/<int:bid>/",views.bookdelete)
]