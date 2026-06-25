from django.urls import path

from library import views

urlpatterns = [
    path('dashboard/',views.dashboard,name='dashboard'),
    path('books/',views.books,name="books"),
    path('borrowedbooks/',views.borrowedbooks),
    
]