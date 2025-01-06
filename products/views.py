from rest_framework.viewsets import ModelViewSet
from .models import Product
from .serializers import ProductAddSerializer, ProductViewSerializer

class ProductViewSet(ModelViewSet):
    queryset = Product.objects.all()

    def get_serializer_class(self):
        # Use ProductAddSerializer for create and update actions
        if self.action in ['create', 'update', 'partial_update']:
            return ProductAddSerializer
        # Use ProductViewSerializer for list and retrieve actions
        elif self.action in ['list', 'retrieve']:
            return ProductViewSerializer
        return super().get_serializer_class()
