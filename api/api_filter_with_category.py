import psycopg2
from Bm_Inventory.helper import execute_query_and_map_results

def api_category(request,category):
    api_category_results = api_category_filter(request, category=category)
    return api_category_results
        
    




def api_category_filter(request, category):
    api_category_filter_query = """
        select * from products_product pp  where  category = %s;
    """
    return list(execute_query_and_map_results(api_category_filter_query, (category,)))
 


