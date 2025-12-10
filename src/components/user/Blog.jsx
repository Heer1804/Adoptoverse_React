import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import "./user.css";

export default function Blog() {
  const navi = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const url = "http://localhost:5000/blogs";

  const getBlogs = async () => {
    try {
      const res = await axios.get(url);
      setBlogs(res.data);
      setFilteredBlogs(res.data);

      // Extract unique categories dynamically
      const uniqueCategories = ["All Categories", ...new Set(res.data.map((b) => b.category))];
      setCategories(uniqueCategories);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  // Filter blogs based on selected category
  const handleCategoryChange = (e) => {
    const selected = e.target.value;
    setSelectedCategory(selected);

    if (selected === "All Categories") {
      setFilteredBlogs(blogs);
    } else {
      const filtered = blogs.filter(
        (blog) => blog.category?.toLowerCase() === selected.toLowerCase()
      );
      setFilteredBlogs(filtered);
    }
  };

  return (
    <div className="app-wrapper">
      <Header />

      <main className="main-content" style={{ paddingTop: "80px" }}>
        <div className="container my-5">
          <h2 className="text-center mb-5 fw-bold text-navy">Our Blogs</h2>

          {/* Category Filter */}
          <div className="text-center mb-4">
            <select
              className="form-select w-auto d-inline-block shadow-sm"
              value={selectedCategory}
              onChange={handleCategoryChange}
              style={{
                borderRadius: "20px",
                padding: "8px 36px",
                borderColor: "var(--teal)",
              }}
            >
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Blog Cards */}
          <div className="row g-4 justify-content-center">
            {filteredBlogs.length > 0 ? (
              filteredBlogs.map((blog) => (
                <div key={blog.id} className="col-md-3 col-sm-6">
                  <div className="card h-100 shadow-sm hover-shadow">
                    <img
                      src={blog.image || "/placeholder.png"}
                      alt={blog.title}
                      className="card-img-top"
                      style={{
                        height: "220px",
                        padding: "10px",
                        objectFit: "cover",
                        borderTopLeftRadius: "8px",
                        borderTopRightRadius: "8px",
                      }}
                    />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title text-center">{blog.title}</h5>
                      <p className="text-muted mb-3">
                        <strong>Author:</strong> {blog.author} |{" "}
                        <strong>Category:</strong> {blog.category}
                      </p>
                      <p className="mb-3">
                        {blog.content.length > 100
                          ? blog.content.slice(0, 100) + "..."
                          : blog.content}
                      </p>
                      <button
                        className="btn btn-teal mt-auto"
                        onClick={() => navi(`/blog/${blog.id}`)}
                      >
                        Read More
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-muted mt-4">No blogs available.</p>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
