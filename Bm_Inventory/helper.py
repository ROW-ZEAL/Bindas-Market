from django.db import connections


def execute_query(query_string, *query_args, database='default', cursor=None, **query_kwargs):
    if not cursor:
        cursor = connections[database].cursor()
    if query_kwargs:
        cursor.execute(query_string, query_kwargs)
    else:
        cursor.execute(query_string, query_args)
    return cursor


# execute query and then map the results to col_names
def execute_query_and_map_results(query_string, *query_args, database='default', cursor=None, **query_kwargs):
    if not cursor:
        cursor = connections[database].cursor()

    if query_kwargs:
        cursor.execute(query_string, query_kwargs)
    else:
        cursor.execute(query_string, query_args)

    if cursor.description is None:
        # If no rows are returned, return an empty list
        print("No rows returned from the query")
        return []

    col_names = [desc[0] for desc in cursor.description]

    rows = cursor.fetchall()
    print(f"Query executed. Columns: {col_names}, Rows fetched: {rows}")
    if not rows:
        return []

    for row in rows:
        yield dict(zip(col_names, row))



def execute_query_fetch_all(query_string, *query_args, database='default', cursor=None, **query_kwargs):
    if not cursor:
        cursor = connections[database].cursor()

    if query_kwargs:
        cursor.execute(query_string, query_kwargs)
    else:
        cursor.execute(query_string, query_args)

    return cursor.fetchall()
