import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { FiArrowLeft } from "react-icons/fi";
import "./Inventory.css";

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      const searchParams = new URLSearchParams(location.search);
      const productName = searchParams.get("productName") || "";
      const category = searchParams.get("category") || "";
      const brand = searchParams.get("brand") || "";
      const price = searchParams.get("price") || "";

      let dynamicUrl;

      if (productName && category && brand && price) {
        dynamicUrl = `http://127.0.0.1:8000/api/products/${encodeURIComponent(
          productName
        )}/${encodeURIComponent(category)}/${encodeURIComponent(
          brand
        )}/${encodeURIComponent(price)}`;
      } else if (productName) {
        dynamicUrl = `http://127.0.0.1:8000/api/products/${encodeURIComponent(
          productName
        )}`;
      } else if (category) {
        dynamicUrl = `http://127.0.0.1:8000/api/product/${encodeURIComponent(
          category
        )}`;
      } else if (brand) {
        dynamicUrl = `http://127.0.0.1:8000/api/brand/${encodeURIComponent(
          brand
        )}`;
      } else if (price) {
        dynamicUrl = `http://127.0.0.1:8000/api/price/${encodeURIComponent(
          price
        )}`;
      } else {
        dynamicUrl = `http://127.0.0.1:8000/api/products/`;
      }

      try {
        const response = await axios.get(dynamicUrl);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error("Error fetching filtered products:", error);
      }
    };

    fetchFilteredProducts();
  }, [location.search]);

  return (
    <div className="product-list-container">
      <button className="back-button" onClick={() => navigate("/inventory")}>
        <FiArrowLeft size={24} /> Back
      </button>
      <h2>Search Results</h2>
      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div className="product-card" key={product.id}>
              <img
                className="product-card-image"
                src={`http://127.0.0.1:8000/media/${product.product_image}`}
                alt={product.product_name}
                onError={(e) => {
                  e.target.src = "/path/to/default-image.jpg";
                }}
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
          ))
        ) : (
          <p>No products found matching your criteria.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
