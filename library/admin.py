from django.contrib import admin

from library.models import Book, BookCategory,Author

# Register your models here.

admin.site.register(BookCategory)
admin.site.register(Book)
admin.site.register(Author)