import psycopg2
from Bm_Inventory.helper import execute_query_and_map_results

def api_price(request,price):
    api_price_results = api_price_filter(request, price=price)
    return api_price_results
        
    




def api_price_filter(request, price):
    api_price_filter_query = """
        select * from products_product pp  where  price = %s;
    """
    return list(execute_query_and_map_results(api_price_filter_query, (price,)))
 


