import psycopg2

def api_order_history(data):
    # Extract individual fields from the data
    amount = data.get('amount', 0)
    deposit_date = data.get('depositDate', 'Not Provided')
    product_name = data.get('productName', 'Not Provided')
    category = data.get('category', 'Not Provided')
    brand = data.get('brand', 'Not Provided')
    order_received_date = data.get('orderReceivedDate', 'Not Provided')
    customer_name = data.get('customerName', 'Not Provided')
    phone_number = data.get('phoneNumber', 'Not Provided')
    delivery_address = data.get('deliveryAddress', 'Not Provided')
    destination_branch = data.get('destinationBranch', 'Not Provided')
    delivery_status = data.get('deliveryStatus', 'Pending')
    delivery_charge = data.get('deliveryCharge', 0)

    # Debug logging for backend
    print(f"Amount: {amount}")
    print(f"Deposit Date: {deposit_date}")
    print(f"Product Name: {product_name}")
    print(f"Category: {category}")
    print(f"Brand: {brand}")
    print(f"Order Received Date: {order_received_date}")
    print(f"Customer Name: {customer_name}")
    print(f"Phone Number: {phone_number}")
    print(f"Delivery Address: {delivery_address}")
    print(f"Destination Branch: {destination_branch}")
    print(f"Delivery Status: {delivery_status}")

    try:
        db_connection = psycopg2.connect(
            host='localhost',
            database="BMarket",
            user="postgres",
            password="jayhind",
            port="5432"
        )
        db_connection.autocommit = True
        cursor = db_connection.cursor()
        
        order_insert_query = """
            INSERT INTO orders (
                product_name,
                category,
                brand,
                order_received_date,
                customer_name,
                phone_number,
                delivery_address,
                destination_branch,
                amount,
                delivery_charge,
                delivery_status
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        
        cursor.execute(order_insert_query, (
            product_name,
            category,
            brand,
            order_received_date,
            customer_name,
            phone_number,
            delivery_address,
            destination_branch,
            amount,
            delivery_charge,
            delivery_status
        ))
        
        db_connection.commit()
        cursor.close()
        db_connection.close()

        context = {
            'status': 'success',
        }

    except (Exception, psycopg2.DatabaseError) as error:
        print(f"Error: {error}")
        context = {
            'status': "fail",
        }

    return context
