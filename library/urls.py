from django.urls import path

from library import views

urlpatterns = [
    path('dashboard/',views.dashboard),
    path('books/',views.books),
    path('borrowedbooks/',views.borrowedbooks),
]