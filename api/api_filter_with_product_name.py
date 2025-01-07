import psycopg2
from Bm_Inventory.helper import execute_query_and_map_results

def api_product_name(request,product_name):
    api_product_name_results = api_product_name_filter(request, product_name =product_name)
    return api_product_name_results
        
    




def api_product_name_filter(request, product_name):
    product_name_filter_query = """
        select * from products_product pp  where  product_name = %s
    """
    return list(execute_query_and_map_results(product_name_filter_query, (product_name,)))
 


