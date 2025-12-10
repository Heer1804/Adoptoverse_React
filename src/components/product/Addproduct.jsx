import React, { useState, useEffect } from "react";
import AdminHeader from "../AdminHeader";
import AdminFooter from "../AdminFooter";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../admin.css";

export default function AddProduct() {
  const navi = useNavigate();
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState({
    pname: "",
    pprice: "",
    pdesc: "",
    pic: "",
    category: "",
  });
  const [message, setMessage] = useState("");

  const url = "http://localhost:5000/category";

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(url);
        setCategories(res.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    getData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value.replace(/\s{2,}/g, " ") });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProduct({ ...product, pic: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedProduct = {
      pname: product.pname.trim(),
      pprice: product.pprice,
      pdesc: product.pdesc.trim(),
      category: product.category,
      pic: product.pic,
    };

    if (
      !trimmedProduct.pname ||
      !trimmedProduct.pprice ||
      !trimmedProduct.pdesc ||
      !trimmedProduct.category
    ) {
      setMessage("Please fill all fields properly (no spaces only).");
      return;
    }

    try {
      await axios.post("http://localhost:5000/product", trimmedProduct);
      setMessage("Product added successfully!");
      setProduct({ pname: "", pprice: "", pdesc: "", pic: "", category: "" });
      setTimeout(() => navi("/showproduct"), 1000);
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="admin-layout d-flex flex-column min-vh-100">
      <AdminHeader />
      <main className="content flex-grow-1 d-flex align-items-center justify-content-center mt-3 py-4">
        <div
          className="card shadow-lg rounded-4 p-4"
          style={{ maxWidth: "700px", width: "100%" }}
        >
          <h2 className="text-center text-navy fw-bolder mb-4">
            Add Product
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Product Name</label>
              <input
                type="text"
                className="form-control"
                name="pname"
                value={product.pname}
                onChange={handleChange}
                placeholder="Enter product name"
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold">Product Price</label>
              <input
                type="number"
                className="form-control"
                name="pprice"
                value={product.pprice}
                min={1}
                onChange={handleChange}
                placeholder="Enter product price"
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Product Description</label>
              <textarea
                className="form-control"
                name="pdesc"
                value={product.pdesc}
                onChange={handleChange}
                placeholder="Enter product description"
                rows="3"
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Product Image</label>
              <input
                type="file"
                className="form-control"
                name="pic"
                onChange={handleFileChange}
                accept="image/*"
              />
              {product.pic && (
                <div className="text-center mt-3">
                  <p className="text-muted fw-semibold mb-2">Preview</p>
                  <img
                    src={product.pic}
                    alt="Preview"
                    className="img-thumbnail"
                    style={{
                      maxWidth: "180px",
                      borderRadius: "12px",
                      boxShadow: "0 0 6px rgba(0,0,0,0.15)",
                    }}
                  />
                </div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Product Category</label>
              <select
                className="form-control"
                name="category"
                value={product.category}
                onChange={handleChange}
              >
                <option value="">-- Select Category --</option>
                {categories.map((cat) => (
                  <option key={cat.id || cat._id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-actions mt-2 text-center">
              <button type="submit" className="btn btn-edit me-3 py-2 px-3"> Add Product </button>
              <button type="button" className="btn btn-add mt-2 py-2" onClick={() => navi("/showproduct")} > Cancel </button>
            </div>

              {message && (
              <p className="text-center mt-3 fw-semibold text-muted">
                {message}
              </p>
            )}
          </form>
        </div>
      </main>
      <AdminFooter />
    </div>
  );
}
