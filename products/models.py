from django.db import models

class Product(models.Model):
    product_name = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    brand = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock_quantity = models.IntegerField()
    product_status = models.CharField(
        max_length=50,
        choices=[('inStock', 'In Stock'), ('outOfStock', 'Out of Stock')],
    )
    product_image = models.ImageField(upload_to='products/', null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.product_name
