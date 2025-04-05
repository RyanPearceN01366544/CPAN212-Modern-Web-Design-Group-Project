import React, { useState } from "react";
import "./User.css";

const UserPage = () => {
  const [user] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    address: "123 Main Street, New York, NY",
  });

  const [orders] = useState([
    { id: 1, date: "2025-04-01", total: "$59.99", status: "Delivered" },
    { id: 2, date: "2025-03-22", total: "$120.00", status: "Shipped" },
    { id: 3, date: "2025-03-10", total: "$35.00", status: "Processing" },
  ]);

  return (
    <div className="user-container">
      <h2>User Account</h2>

      <div className="user-info">
        <h3>Profile Information</h3>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Address:</strong> {user.address}</p>
        <button className="edit-btn">Edit Profile</button>
      </div>

      <div className="order-history">
        <h3>Order History</h3>
        {orders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Order #</th>
                <th>Date</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.date}</td>
                  <td>{order.total}</td>
                  <td>{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UserPage;
