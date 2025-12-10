import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../AdminHeader";
import AdminFooter from "../AdminFooter";
import "../admin.css";

export default function ShowProduct() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/product");
      setData(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const deleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await axios.delete(`http://localhost:5000/product/${id}`);
      getData();
    }
  };

  const editProduct = (id) => {
    navigate(`/editproduct/${id}`);
  };

  const viewDetails = (id) => {
    navigate(`/productdetails/${id}`);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="admin-layout">
      <AdminHeader />
      <main className="content">
        <div className="d-flex justify-content-between align-items-center header-row">
          <h2 className="page-title fw-bolder">Product List</h2>
          <button className="btn btn-add" onClick={() => navigate("/addproduct")}>
            + Add Product
          </button>
        </div>

        <div className="table-wrapper">
          <table className="table-custom">
            <thead>
              <tr>
                <th>Sr No</th>
                <th>Name</th>
                <th>Picture</th>
                <th>Price</th>
                <th>Category</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td
                      className="clickable-link text-navy"
                      title="View product details"
                      onClick={() => viewDetails(item.id)}
                    >
                      {item.pname}
                    </td>

                    <td>
                      <img
                        src={item.pic}
                        alt={item.pname}
                        title="Click to view details"
                        className="cat-img clickable-img"
                        onClick={() => viewDetails(item.id)}
                      />
                    </td>
                    <td>₹{item.pprice}</td>
                    <td>{item.category}</td>
                    <td>
                      <button className="btn-edit" onClick={() => editProduct(item.id)}>
                        Edit
                      </button>
                      <button className="btn-delete" onClick={() => deleteProduct(item.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="no-data">
                    No products available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
      <AdminFooter />
    </div>
  );
}
