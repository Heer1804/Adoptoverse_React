import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./user.css";

export default function Cart() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    getData();
  }, []);

  const getData = async () => {
    const res = await axios.get(
      `http://localhost:5000/order?status=0&uid=${user.id}`
    );
    setData(res.data);
  };

  const confirmOrder = async () => {
    for (let item of data) {
      await axios.put(`http://localhost:5000/order/${item.id}`, {
        ...item,
        status: 1,
      });
    }
    alert("Order Confirmed!");
    navigate("/home");
  };

  const remove = async (id) => {
    await axios.delete(`http://localhost:5000/order/${id}`);
    alert("Removed from Cart");
    getData();
  };

  const updateQty = async (item, increment = true) => {
    const newQty = increment ? item.qty + 1 : Math.max(item.qty - 1, 1);
    await axios.put(`http://localhost:5000/order/${item.id}`, {
      ...item,
      qty: newQty,
    });
    getData();
  };

  const totalAmount = data.reduce(
    (sum, item) => sum + Number(item.pprice) * item.qty,
    0
  );

  return (
    <div className="app-wrapper">
      <Header />

      <div className="flex-grow-1 section-padding m-5">
        {data.length === 0 ? (
          <div
            className="feature-card mx-auto text-center p-5"
            style={{ maxWidth: "600px" }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
              alt="Empty Cart"
              style={{ width: "120px", opacity: 0.8 }}
            />
            <h3 className="text-navy mt-4 fw-bold">Your Cart is Empty</h3>
            <p className="text-muted mb-4">
              Looks like you haven't added any products yet.
            </p>
            <button
              className="btn-teal btn-radius px-4 py-2"
              onClick={() => navigate("/userproduct")}
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-navy fw-bold mb-4 text-center">Your Cart</h2>

            <div className="table-responsive shadow-sm rounded">
              <table className="table align-middle mb-0">
                <thead
                  className="text-white"
                  style={{
                    backgroundColor: "var(--teal)",
                    borderRadius: "8px 8px 0 0",
                  }}
                >
                  <tr>
                    <th>#</th>
                    <th>Product</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr
                      key={item.id}
                      className="bg-white"
                      style={{ verticalAlign: "middle" }}
                    >
                      <td>{index + 1}</td>
                      <td className="d-flex align-items-center gap-3">
                        <img
                          src={item.pic}
                          alt={item.pname}
                          style={{
                            width: "70px",
                            height: "70px",
                            borderRadius: "10px",
                            objectFit: "cover",
                            border: "1px solid var(--sky-blue)",
                          }}
                        />
                        <div>
                          <h6 className="mb-0 text-navy fw-semibold">
                            {item.pname}
                          </h6>
                          <small className="text-muted">
                            ₹{Number(item.pprice).toFixed(2)} each
                          </small>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center justify-content-center gap-2">
                          <button
                            className="btn btn-sm btn-outline-teal"
                            onClick={() => updateQty(item, false)}
                          >
                            -
                          </button>
                          <span className="fw-semibold">{item.qty}</span>
                          <button
                            className="btn btn-sm btn-outline-teal"
                            onClick={() => updateQty(item, true)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="fw-semibold text-navy">
                        ₹{(Number(item.pprice) * item.qty).toFixed(2)}
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-teal"
                          style={{
                            backgroundColor: "#2F4156",
                            color: "white",
                            borderRadius: "6px",
                          }}
                          onClick={() => remove(item.id)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="text-end mt-4">
              <div className="fw-bold fs-5 text-navy">
                Total Amount: ₹{totalAmount.toFixed(2)}
              </div>
              <button
                className="btn-teal btn-radius px-4 py-2 mt-3 fw-semibold"
                onClick={confirmOrder}
              >
                Confirm Order
              </button>
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
