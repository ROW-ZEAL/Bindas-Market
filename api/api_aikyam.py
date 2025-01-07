import psycopg2
from Bm_Inventory.helper import execute_query_and_map_results

def api_aikyam_get_member_list(request,product_name,category):
    member_results = get_aikyam_list(request=request,product_name=product_name,category=category)
    return {
        "members": member_results,
    }


def get_aikyam_list(request,product_name,category):
    members_query = """ select
	*
from
	products_product
where
	product_name = %sand category = %s;"""
    return list(execute_query_and_map_results(members_query, (product_name,category,)))