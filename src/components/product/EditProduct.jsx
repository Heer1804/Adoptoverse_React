import React, { useEffect, useState } from "react";
import AdminHeader from "../AdminHeader";
import AdminFooter from "../AdminFooter";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../admin.css";

export default function EditProduct() {
  const navi = useNavigate();
  const { id } = useParams();
  const productUrl = "http://localhost:5000/product";
  const categoryUrl = "http://localhost:5000/category";

  const [product, setProduct] = useState({
    pname: "",
    pprice: "",
    pdesc: "",
    pic: "",
    category: "",
  });

  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch product details
  const getSingleProduct = async () => {
    try {
      const res = await axios.get(`${productUrl}/${id}`);
      setProduct(res.data);
    } catch (err) {
      console.error("Error fetching product:", err);
    }
  };

  // Fetch categories
  const getCategories = async () => {
    try {
      const res = await axios.get(categoryUrl);
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  useEffect(() => {
    getSingleProduct();
    getCategories();
  }, []);

  // Prevent only spaces in text inputs
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
      pic: product.pic,
      category: product.category,
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
      await axios.put(`${productUrl}/${id}`, trimmedProduct);
      setMessage("Product updated successfully!");
      setTimeout(() => navi("/showproduct"), 1200);
    } catch (err) {
      console.error(err);
      setMessage("Failed to update product.");
    }
  };

  return (
    <div className="admin-layout">
      <AdminHeader />

      <main className="content">
        <h2 className="page-title fw-bold">Edit Product</h2>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-sm rounded p-4 mt-2 mb-3"
          style={{ maxWidth: "900px",width:"550px", margin: "auto" }}
        >
          <div className="mb-3">
            <label className="form-label fw-semibold">Product Name</label>
            <input
              type="text"
              className="form-control"
              name="pname"
              value={product.pname}
              onChange={handleChange}
              placeholder="Enter product name"
              required
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
              required
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
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Category</label>
            <select
              className="form-control"
              name="category"
              value={product.category}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Category --</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
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
          </div>

          {product.pic && (
            <div className="mb-3 text-center">
              <p className="fw-semibold">Preview:</p>
              <img
                src={product.pic}
                alt="Preview"
                className="img-thumbnail"
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            </div>
          )}

          <div className="form-actions mt-3 text-center">
            <button type="submit" className="btn btn-edit me-3 py-2 px-3">
              Update Product
            </button>
            <button
              type="button"
              className="btn btn-add mt-2 py-2"
              onClick={() => navi("/showproduct")}
            >
              Cancel
            </button>
          </div>
           
          {message && (
            <p className="mt-3 text-center fw-semibold">{message}</p>
          )}
        </form>
      </main>
      <AdminFooter />
    </div>
  );
}
