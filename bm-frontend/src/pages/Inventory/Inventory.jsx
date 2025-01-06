import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Inventory.css";
const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/products/");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Product List</h2>
      <table border="1" style={{ width: "100%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Category</th>
            <th>Brand</th>
            <th>Description</th>
            <th>Price</th>
            <th>Stock Quantity</th>
            <th>Status</th>
            <th>Image</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.product_name}</td>
              <td>{product.category}</td>
              <td>{product.brand}</td>
              <td>{product.description}</td>
              <td>${parseFloat(product.price).toFixed(2)}</td>
              <td>{product.stock_quantity}</td>
              <td>{product.product_status}</td>
              <td>
                {product.product_image ? (
                  <img
                    src={`http://127.0.0.1:8000${product.product_image}`}
                    alt={product.product_name}
                    style={{ width: "100px", height: "100px" }}
                  />
                ) : (
                  "No Image"
                )}
              </td>
              <td>{new Date(product.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
