from django.shortcuts import render
from rest_framework.decorators import api_view
from .api_filtering_product import *
from .api_filter_with_product_name import *
from .api_filter_with_category import *
from .api_filter_with_brand import *
from .api_filter_with_price import *
from rest_framework.response import Response



@api_view(['GET'])
def filter_the_products(request, category,product_name,brand,price):
    return Response(api_filtering_product(request=request,product_name=product_name,category=category,brand=brand,price=price))



@api_view(['GET'])
def show_data_from_product_name(request, product_name):
    return Response(api_product_name(request=request,product_name=product_name))

@api_view(['GET'])
def show_data_from_category(request, category):
    return Response(api_category(request=request,category=category))


@api_view(['GET'])
def show_data_from_brand(request, brand):
    return Response(api_brand(request=request,brand=brand))


@api_view(['GET'])
def show_data_from_price(request, price):
    return Response(api_price(request=request,price=price))