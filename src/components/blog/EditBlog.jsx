import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import AdminHeader from "../AdminHeader";
import AdminFooter from "../AdminFooter";
import "../admin.css";

export default function EditBlog() {
  const { id } = useParams();
  const navi = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [blogPic, setBlogPic] = useState("");
  const [message, setMessage] = useState("");

  const categoryOptions = ["Dog", "Cat", "Rabbit", "Bird", "Fish"];

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/blogs/${id}`);
        const blog = res.data;
        setTitle(blog.title);
        setCategory(blog.category);
        setContent(blog.content);
        setAuthor(blog.author);
        setBlogPic(blog.image);
      } catch (err) {
        console.error("Error fetching blog:", err);
        setMessage("Could not load blog details");
      }
    };
    fetchBlog();
  }, [id]);

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
      await axios.put(`http://localhost:5000/blogs/${id}`, {
        title: title.trim(),
        category: category.trim(),
        content: content.trim(),
        author: author.trim(),
        image: blogPic,
      });

      setMessage("Blog updated successfully!");
      setTimeout(() => navi("/showblogs"), 1200);
    } catch (err) {
      console.error("Error updating blog:", err);
      setMessage("Something went wrong");
    }
  };

  return (
    <div className="admin-layout">
      <AdminHeader />
      <main className="content" >
        <h2 className="page-title fw-bold text-center m-3">Edit Blog</h2>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-sm rounded p-4"
          style={{ maxWidth: "1000px",width:"800px", margin: "auto" }}
        >
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
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">-- Select Category --</option>
              {categoryOptions.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
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
              rows="5"
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
            />
          </div>

          {blogPic && (
            <div className="mb-3 text-center">
              <p className="fw-semibold">Preview:</p>
              <img
                src={blogPic}
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
            <button type="submit" className="btn btn-edit me-4">
              Update Blog
            </button>
            <button
              type="button"
              className="btn btn-add mt-2w"
              onClick={() => navi("/showblogs")}
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
