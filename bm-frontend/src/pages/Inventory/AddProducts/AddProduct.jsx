import React, { useState } from "react";
import axios from "axios";
import "./ProductForm.css";

const ProductForm = () => {
  const [formData, setFormData] = useState({
    product_name: "",
    category: "",
    brand: "",
    description: "",
    price: "",
    stock_quantity: "",
    product_status: "inStock",
    product_image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, product_image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/products/",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Product added successfully!");
      console.log(response.data);
    } catch (error) {
      console.error(error);
      alert("Error adding product.");
    }
  };

  const watchBrands = ["Rolex", "Casio", "Omega", "Tag Heuer"];

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="input-group">
          <label>Product Name:</label>
          <input
            type="text"
            name="product_name"
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label>Category:</label>
          <select name="category" onChange={handleChange} required>
            <option value="">Select Category</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="furniture">Furniture</option>
            <option value="accessories">Accessories</option>
            <option value="watches">Watches</option>
          </select>
        </div>
      </div>
      <div className="form-row">
        <div className="input-group">
          <label>Brand:</label>
          <select
            name="brand"
            onChange={handleChange}
            required
            disabled={formData.category !== "watches"}
          >
            <option value="">Select Brand</option>
            {formData.category === "watches" ? (
              watchBrands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))
            ) : (
              <>
                <option value="apple">Apple</option>
                <option value="samsung">Samsung</option>
                <option value="nike">Nike</option>
                <option value="adidas">Adidas</option>
              </>
            )}
          </select>
        </div>
        <div className="input-group">
          <label>Description:</label>
          <textarea
            name="description"
            onChange={handleChange}
            required
          ></textarea>
        </div>
      </div>
      <div className="form-row">
        <div className="input-group">
          <label>Price:</label>
          <input type="number" name="price" onChange={handleChange} required />
        </div>
        <div className="input-group">
          <label>Stock Quantity:</label>
          <input
            type="number"
            name="stock_quantity"
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="form-row">
        <div className="input-group">
          <label>Status:</label>
          <select name="product_status" onChange={handleChange}>
            <option value="inStock">In Stock</option>
            <option value="outOfStock">Out of Stock</option>
          </select>
        </div>
        <div className="input-group">
          <label>Image:</label>
          <input type="file" name="product_image" onChange={handleFileChange} />
        </div>
      </div>
      <div className="form-row full-width">
        <button type="submit">Add Product</button>
      </div>
    </form>
  );
};

export default ProductForm;
