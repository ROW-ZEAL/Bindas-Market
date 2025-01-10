import React, { useEffect, useState } from "react";
import "./OrderHistory.css";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { FaFileExcel, FaFilePdf, FaPrint } from "react-icons/fa";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/order");
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleExcelDownload = () => {
    const ws = XLSX.utils.json_to_sheet(orders);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Orders");
    XLSX.writeFile(wb, "Order_History.xlsx");
  };

  const handlePDFDownload = () => {
    const doc = new jsPDF("p", "pt", "a4");
    doc.text("Order History", 20, 30);

    const tableColumn = [
      "Order ID",
      "Product Name",
      "Category",
      "Brand",
      "Order Date",
      "Customer Name",
      "Phone Number",
      "Address",
      "Branch",
      "Amount",
      "Delivery Charge",
      "Status",
    ];
    const tableRows = [];

    orders.forEach((order) => {
      const orderData = [
        order.order_id,
        order.product_name,
        order.category,
        order.brand,
        order.order_received_date,
        order.customer_name,
        order.phone_number,
        order.delivery_address,
        order.destination_branch,
        order.amount,
        order.delivery_charge,
        order.delivery_status,
      ];
      tableRows.push(orderData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 50,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [22, 160, 133] },
      margin: { top: 30 },
    });

    doc.save("Order_History.pdf");
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    const table = document.querySelector(".order-history-table");
    printWindow.document.write(
      "<html><head><title>Order History</title></head><body>"
    );
    printWindow.document.write(table.outerHTML);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="order-history-container">
      <h2>Order History</h2>
      <div className="actions">
        <button onClick={handleExcelDownload}>
          <FaFileExcel />
        </button>
        <button onClick={handlePDFDownload}>
          <FaFilePdf />
        </button>
        <button onClick={handlePrint}>
          <FaPrint />
        </button>
      </div>
      <table className="order-history-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Product Name</th>
            <th>Category</th>
            <th>Brand</th>
            <th>Order Date</th>
            <th>Customer Name</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>Branch</th>
            <th>Amount</th>
            <th>Delivery Charge</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.order_id}>
              <td>{order.order_id}</td>
              <td>{order.product_name}</td>
              <td>{order.category}</td>
              <td>{order.brand}</td>
              <td>{order.order_received_date}</td>
              <td>{order.customer_name}</td>
              <td>{order.phone_number}</td>
              <td>{order.delivery_address}</td>
              <td>{order.destination_branch}</td>
              <td>{order.amount}</td>
              <td>{order.delivery_charge}</td>
              <td>{order.delivery_status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderHistory;
