from rest_framework import serializers
from .models import Product

# Serializer for viewing products
class ProductViewSerializer(serializers.ModelSerializer):
    product_image = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = '__all__'

    def get_product_image(self, obj):
        if obj.product_image:
            return obj.product_image.url
        return "http://127.0.0.1:8000/media/products/default.png"

# Serializer for adding/updating products
class ProductAddSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'
