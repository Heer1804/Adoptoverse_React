import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminHeader from "../AdminHeader";
import AdminFooter from "../AdminFooter";
import axios from "axios";
import "../admin.css";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/product/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Error fetching product:", err));
  }, [id]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/order")
      .then((res) => {
        const filteredOrders = res.data.filter(
          (o) => String(o.pid) === String(id)
        );
        setOrders(filteredOrders);
      })
      .catch((err) => console.error("Error fetching orders:", err));
  }, [id]);

  if (!product) {
    return (
      <div className="text-center mt-5">
        <h4>Loading product details...</h4>
      </div>
    );
  }

  return (
    <div className="admin-layout d-flex flex-column min-vh-100">
      <AdminHeader />

      <main className="content flex-grow-1 mt-5 ">
        {/* <div className="container"> */}
          <div className="product-details-card shadow-sm p-4 bg-white rounded-4 mb-5">
            <div className="row align-items-center">
              <div className="col-md-5 text-center">
                <img
                  src={product.pic}
                  alt={product.pname}
                  className="product-details-img img-fluid rounded-3 shadow-sm"
                  style={{
                    height: "400px",
                    width: "auto",
                    objectFit: "contain", 
                  }}
                />
              </div>
              <div className="col-md-7">
                <h2 className="fw-bold text-navy">{product.pname}</h2>
                <h5 className="text-muted mb-2">Category: {product.category}</h5>
                <h4 className="text-teal fw-semibold">₹{product.pprice}</h4>
                <p className="mt-3">{product.pdesc}</p>

                <div className="mt-4">
                  <button
                    className="btn btn-edit me-2"
                    onClick={() => navigate("/showproduct")}
                  >
                    ←  Back to Products
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="orders-section mb-2">
            <h4 className="fw-bold fs-3 text-navy mb-4">Orders for this Product</h4>
            <div className="card shadow-sm rounded-4 border-0 mb-3">
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table-custom align-middle mb-0">
                    <thead>
                      <tr>
                        <th>Sr No</th>
                        <th>Username</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Status</th>
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
                          const statusClass =
                            order.status === 0
                              ? "status-pending"
                              : order.status === 1
                                ? "status-confirmed"
                                : "status-cancelled";

                          return (
                            <tr key={order.id}>
                              <td>{index + 1}</td>
                              <td>{order.username}</td>
                              <td>{order.qty}</td>
                              <td>₹{total}</td>
                              <td>
                                <span className={`status-badge ${statusClass}`}>
                                  {statusText}
                                </span>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td
                            colSpan="5"
                            className=" text-center text-muted py-4"
                          >
                            No orders for this product yet
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        {/* </div> */}
      </main>
      <AdminFooter />
    </div>
  );
}
