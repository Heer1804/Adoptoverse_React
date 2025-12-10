import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminHeader from "./AdminHeader";
import AdminFooter from "./AdminFooter";
import { useNavigate } from "react-router-dom";
import "./admin.css";

export default function Order() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const url = "http://localhost:5000/order";

  const getOrders = async () => {
    try {
      const res = await axios.get(url);
      setOrders(res.data || []);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const handleDeleteOrder = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      await axios.delete(`${url}/${id}`);
      getOrders();
    } catch (err) {
      console.error("Error deleting order:", err);
    }
  };

  const viewDetails = (pid) => {
    navigate(`/productdetails/${pid}`);
  };

  return (
    <div className="admin-layout">
      <AdminHeader />

      <main className="content mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="fw-bold mt-2">Order List</h2>
        </div>
        <div style={{ width: "70rem", margin: "0 auto", marginTop: "20px" }}>
          <div className="card shadow">
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table-custom align-middle">
                  <thead className="table-dark">
                    <tr>
                      <th scope="col">Sr No</th>
                      <th scope="col">Product Name</th>
                      <th scope="col">Image</th>
                      <th scope="col">Price</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Username</th>
                      <th scope="col">Total</th>
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.length > 0 ? (
                      orders.map((order, index) => {
                        const total = Number(order.pprice) * Number(order.qty);
                        const statusText =
                          order.status === 0
                            ? "Pending"
                            : order.status === 1
                            ? "Confirmed"
                            : "Cancelled";
                        const statusColor =
                          order.status === 0
                            ? "warning"
                            : order.status === 1
                            ? "success"
                            : "danger";

                        return (
                          <tr key={order.id}>
                            <td>{index + 1}</td>
                            <td
                              className="clickable-link text-navy fw-semibold"
                              style={{ cursor: "pointer" }}
                              title={order.pname}
                              onClick={() => viewDetails(order.pid)}
                            >
                              {order.pname}
                            </td>
                            <td>
                              <img
                                src={order.pic}
                                alt={order.pname}
                                className="img-thumbnail"
                                style={{
                                  width: "70px",
                                  height: "70px",
                                  objectFit: "cover",
                                  borderRadius: "0.5rem",
                                }}
                              />
                            </td>
                            <td>₹{order.pprice}</td>
                            <td>{order.qty}</td>
                            <td>{order.username}</td>
                            <td>₹{total}</td>
                            <td>
                              <span className={`badge bg-${statusColor}`}>
                                {statusText}
                              </span>
                            </td>
                            <td>
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleDeleteOrder(order.id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="9" className="text-center text-muted">
                          No orders found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
      <AdminFooter />
    </div>
  );
}
