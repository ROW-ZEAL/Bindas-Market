import React, { useState } from "react";
import "./Add_Order.css";

const Add_Order = () => {
  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    brand: "",
    orderReceivedDate: "",
    customerName: "",
    phoneNumber: "",
    amount: "",
    deliveryCharge: "",
    deliveryStatus: "Pending",
    destinationBranch: "",
    deliveryAddress: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phoneNumber") {
      if (value.length > 10 || !/^\d*$/.test(value)) {
        return; // Prevent input if more than 10 digits or non-numeric
      }
      setPhoneError(value.length !== 10); // Set error if length is not exactly 10
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      ...formData,
      depositDate: new Date().toISOString(),
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error: ${response.status} - ${errorText}`);
      }

      let data;
      const responseText = await response.text();
      try {
        data = responseText ? JSON.parse(responseText) : {};
      } catch (error) {
        throw new Error("Failed to parse JSON response.");
      }

      alert("Order submitted successfully!");

      setFormData({
        productName: "",
        category: "",
        brand: "",
        orderReceivedDate: "",
        customerName: "",
        phoneNumber: "",
        amount: "",
        deliveryCharge: "",
        deliveryStatus: "Pending",
        destinationBranch: "",
        deliveryAddress: "",
      });
    } catch (error) {
      alert(`Failed to submit order: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-order-form">
      <h2>Add Order</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((field) => {
          const isTextarea = field === "deliveryAddress";
          const isSelect = field === "deliveryStatus";
          const isDate = field.includes("Date");
          const isPhone = field === "phoneNumber";

          return (
            <div key={field}>
              <label>
                {field
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}
                :
              </label>
              {isSelect ? (
                <select
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                >
                  <option value="Pending">Pending</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              ) : isTextarea ? (
                <textarea
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                />
              ) : (
                <input
                  type={isDate ? "date" : isPhone ? "tel" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                  className={isPhone && phoneError ? "input-error" : ""}
                />
              )}
              {isPhone && phoneError && (
                <span className="error-message">
                  Phone number must be exactly 10 digits
                </span>
              )}
            </div>
          );
        })}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Order"}
        </button>
      </form>
    </div>
  );
};

export default Add_Order;
