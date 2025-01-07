import psycopg2
from Bm_Inventory.helper import execute_query_and_map_results

def api_brand(request,brand):
    api_brand_results = api_brand_filter(request, brand=brand)
    return api_brand_results
        
    




def api_brand_filter(request, brand):
    api_brand_filter_query = """
        select * from products_product pp  where  brand = %s;
    """
    return list(execute_query_and_map_results(api_brand_filter_query, (brand,)))
 


