from django.urls import path
from . import views

urlpatterns = [
    path('products/<str:product_name>/<str:category>/<str:brand>/<int:price>', views.filter_the_products, name='api'),
    path('products/<str:product_name>', views.show_data_from_product_name, name='api'),
    path('product/<str:category>', views.show_data_from_category, name='api'),
    path('brand/<str:brand>', views.show_data_from_brand, name='api'),
    path('price/<int:price>', views.show_data_from_price, name='api'),
    path('order', views.show_order_data, name="api"),
]
