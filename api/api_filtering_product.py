import psycopg2
from Bm_Inventory.helper import execute_query_and_map_results

def api_filtering_product(request, product_name, category, brand, price):
    filter_results = api_individual_history(request, product_name=product_name, category=category, brand=brand, price=price)
    return filter_results

def api_individual_history(request, product_name, category, brand, price):
    filtering_products_query = """
    SELECT
        *
    FROM
        products_product
    WHERE
        product_name = %s
        AND category = %s
        AND brand = %s
        AND price = %s;
    """
    print(f"Executing query: {filtering_products_query}")
    print(f"Parameters: product_name={product_name}, category={category}, brand={brand}, price={price}")

   
    if not all([product_name, category, brand, price]):
        raise ValueError("One or more parameters are missing or invalid.")

    try:
        results = list(execute_query_and_map_results(filtering_products_query, product_name, category, brand, price))
        return results
    except Exception as e:
        print(f"Error during query execution: {e}")
        raise
