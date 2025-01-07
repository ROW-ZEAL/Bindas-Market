import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Inventory.css";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    productName: "",
    category: "",
    brand: "",
    price: "",
  });
  const navigate = useNavigate();

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

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSearch = () => {
    const queryParams = new URLSearchParams(filters).toString();
    navigate(`/SearchResults?${queryParams}`);
  };

  return (
    <div className="product-list-container">
      <h2>Product Catalog</h2>
      <div className="filter-container">
        <input
          type="text"
          name="productName"
          placeholder="Search by Product Name"
          value={filters.productName}
          onChange={handleFilterChange}
          className="filter-input"
        />
        <input
          type="text"
          name="category"
          placeholder="Search by Category"
          value={filters.category}
          onChange={handleFilterChange}
          className="filter-input"
        />
        <input
          type="text"
          name="brand"
          placeholder="Search by Brand"
          value={filters.brand}
          onChange={handleFilterChange}
          className="filter-input"
        />
        <input
          type="number"
          name="price"
          placeholder="Search by Max Price"
          value={filters.price}
          onChange={handleFilterChange}
          className="filter-input"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img
              src={`http://127.0.0.1:8000${product.product_image}`}
              alt={product.product_name}
              className="product-card-image"
            />
            <div className="product-card-details">
              <h3>{product.product_name}</h3>
              <ul className="product-details-list">
                <li>
                  <strong>Category:</strong> {product.category}
                </li>
                <li>
                  <strong>Brand:</strong> {product.brand}
                </li>
                <li>
                  <strong>Description:</strong> {product.description}
                </li>
                <li>
                  <strong>Price:</strong> $
                  {parseFloat(product.price).toFixed(2)}
                </li>
                <li>
                  <strong>Stock:</strong> {product.stock_quantity}
                </li>
                <li>
                  <strong>Status:</strong> {product.product_status}
                </li>
                <li>
                  <strong>Created At:</strong>{" "}
                  {new Date(product.created_at).toLocaleDateString()}
                </li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
