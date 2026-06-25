from django.db import models

# Create your models here.

class BookCategory(models.Model):
    name = models.CharField(max_length=100)
    def __str__(self):
        return self.name
    
class Author(models.Model):
    name = models.CharField(max_length=100,default="")
    def __str__(self):
        return self.name
class Book(models.Model):
    title = models.CharField(max_length=200)
    image = models.ImageField(upload_to='book_images/')
    language = models.CharField(max_length=50)
    author = models.ForeignKey(Author,on_delete=models.CASCADE,default=1)
    # author = models.CharField(max_length=100)
    category = models.ForeignKey(BookCategory, on_delete=models.CASCADE)
    publication_date = models.DateField()
    pages = models.IntegerField()
    description = models.TextField()
    stock = models.IntegerField()
    Shelf = models.CharField(max_length=50)
    status = models.BooleanField(default=True)

    def __str__(self):
        return self.title