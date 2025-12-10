import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AdminHeader from "../AdminHeader";
import AdminFooter from "../AdminFooter";
import "../admin.css";

export default function EditCat() {
  const { id } = useParams();
  const navi = useNavigate();
  const [catName, setCatName] = useState("");
  const [catPic, setCatPic] = useState("");
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");

  const url = "http://localhost:5000/category";

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await axios.get(`${url}/${id}`);
        setCatName(res.data.name || "");
        setCatPic(res.data.pic || "");
        setPreview(res.data.pic || "");
      } catch (err) {
        console.error("Error fetching category:", err);
        setMessage("Failed to load category details.");
      }
    };
    fetchCategory();
  }, [id]);

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

    if (!trimmedName) {
      setMessage("Category name cannot be empty or only spaces.");
      return;
    }

    try {
      await axios.put(`${url}/${id}`, {
        name: trimmedName,
        pic: catPic,
      });

      setMessage("Category updated successfully!");
      setTimeout(() => navi("/showcat"), 1200);
    } catch (err) {
      console.error("Error updating category:", err);
      setMessage("Failed to update category.");
    }
  };

  return (
    <div className="admin-layout">
      <AdminHeader />
      <main className="content " >
        <h2 className="page-title fw-bold">Edit Category</h2>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-sm rounded p-4 mt-2"
          style={{ maxWidth: "700px", margin: "auto",  width:"450px"}}
        >
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
            />
          </div>

          {preview && (
            <div className="mb-3 text-center">
              <p className="fw-semibold">Preview:</p>
              <img
                src={preview}
                alt="preview"
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

          <div className="form-actions mt-4 text-center">
            <button type="submit" className="btn btn-edit btn-success me-3">Update Category</button>
            <button
              type="button"
              className="btn btn-add mt-2"
              onClick={() => navi("/showcat")}
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
