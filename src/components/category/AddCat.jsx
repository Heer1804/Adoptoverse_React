import React, { useState } from "react";
import axios from "axios";
import AdminHeader from "../AdminHeader";
import AdminFooter from "../AdminFooter";
import { useNavigate } from "react-router-dom";
import "../admin.css";

export default function AddCat() {
  const navi = useNavigate();
  const [catName, setCatName] = useState("");
  const [catPic, setCatPic] = useState("");
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setCatPic(reader.result);
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedName = catName.trim();

    if (!trimmedName || !catPic) {
      setMessage("Please enter a valid category name and upload a picture.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/category", {
        name: trimmedName,
        pic: catPic,
      });

      setMessage("Category added successfully!");
      setCatName("");
      setCatPic("");
      setPreview(null);

      setTimeout(() => navi("/showcat"), 800);
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="admin-layout d-flex flex-column min-vh-100">
      <AdminHeader />

      <main className="content flex-grow-1 d-flex align-items-center justify-content-center py-4">
        <div className="card shadow-lg rounded-4 p-4" style={{ maxWidth: "500px", width: "100%" }}>
          <h2 className="text-center text-navy fw-bolder mb-4">Add Category</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Category Name</label>
              <input
                type="text"
                className="form-control"
                value={catName}
                onChange={(e) => setCatName(e.target.value)}
                placeholder="Enter category name"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Category Picture</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handleFileChange}
                required
              />
            </div>

            {preview && (
              <div className="text-center mb-3">
                <p className="text-muted fw-semibold mb-2">Preview</p>
                <img
                  src={preview}
                  alt="preview"
                  className="img-thumbnail"
                  style={{
                    maxWidth: "180px",
                    borderRadius: "12px",
                    boxShadow: "0 0 6px rgba(0,0,0,0.15)",
                  }}
                />
              </div>
            )}

            <div className="form-actions mt-4 text-center">
              <button type="submit" className="btn btn-edit me-3 py-2 mt-1"> Add Category </button>
              <button type="button" className="btn btn-add mt-2" onClick={() => navi("/showcat")} > Cancel </button>
            </div>

            {message && (
              <p className="text-center mt-3 fw-semibold text-muted">{message}</p>
            )}
          </form>
        </div>
      </main>
      <AdminFooter />
    </div>
  );
}
