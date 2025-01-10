import psycopg2
from Bm_Inventory.helper import execute_query_and_map_results

def api_order_history_record(request,):
    api_order_history_results = api_order_history_data(request, )
    return api_order_history_results
        
    




def api_order_history_data(request, ):
    order_history_query = """
        select * from orders o ;
    """
    return list(execute_query_and_map_results(order_history_query, ))
 


