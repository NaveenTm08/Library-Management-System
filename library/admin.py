from django.contrib import admin

from library.models import Book, BookCategory

# Register your models here.

admin.site.register(BookCategory)
admin.site.register(Book)