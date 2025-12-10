import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminHeader from "../AdminHeader";
import AdminFooter from "../AdminFooter";
import { useNavigate } from "react-router-dom";
import "../admin.css";

export default function AddBlog() {
  const navi = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [blogPic, setBlogPic] = useState("");
  const [message, setMessage] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/category")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => setBlogPic(reader.result);
    }
  };

  const isOnlySpaces = (str) => !str.trim().length;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !title ||
      !category ||
      !content ||
      !author ||
      !blogPic ||
      isOnlySpaces(title) ||
      isOnlySpaces(category) ||
      isOnlySpaces(content) ||
      isOnlySpaces(author)
    ) {
      setMessage("Please fill all fields properly (no empty spaces).");
      return;
    }

    try {
      await axios.post("http://localhost:5000/blogs", {
        title: title.trim(),
        category: category.trim(),
        content: content.trim(),
        author: author.trim(),
        image: blogPic,
      });

      setMessage("Blog Added Successfully!");
      setTimeout(() => navi("/showblogs"), 1000);
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong");
    }
  };

  return (
    <div className="admin-layout d-flex flex-column ">
      <AdminHeader />

      <main className="content flex-grow-1 d-flex align-items-center justify-content-center ">
        <div
          className="card shadow-lg rounded-4 p-4"
          style={{ width: "100%", maxWidth: "700px", background: "#fff" }}
        >
          <h2 className="text-center text-navy fw-bolder mb-4">Add Blog</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Blog Title</label>
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter blog title"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Category</label>
              <select
                className="form-control"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">-- Select Category --</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Author</label>
              <input
                type="text"
                className="form-control"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Enter author name"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Content</label>
              <textarea
                className="form-control"
                rows="4"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter blog content"
                required
              ></textarea>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Blog Image</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handleFileChange}
                required
              />
            </div>

            {blogPic && (
              <div className="text-center mb-3">
                <p className="text-muted fw-semibold mb-2">Preview</p>
                <img
                  src={blogPic}
                  alt="preview"
                  className="img-thumbnail"
                  style={{
                    maxWidth: "300px",
                    borderRadius: "12px",
                    boxShadow: "0 0 6px rgba(0,0,0,0.15)",
                  }}
                />
              </div>
            )}

            <div className="form-actions mt-3 text-center">
              <button type="submit" className="btn btn-edit me-3 py-2">
                Add Blog
              </button>
              <button
                type="button"
                className="btn btn-add mt-1"
                onClick={() => navi("/showblogs")}
              >
                Cancel
              </button>
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
