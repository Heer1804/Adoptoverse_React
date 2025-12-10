import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../AdminHeader";
import AdminFooter from "../AdminFooter";
import "../admin.css";

export default function ShowBlogs() {
  const [blogs, setBlogs] = useState([]);
  const navi = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const blogsRes = await axios.get("http://localhost:5000/blogs");
      setBlogs(blogsRes.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      const commentsRes = await axios.get(`http://localhost:5000/comments?blogId=${id}`);
      await Promise.all(commentsRes.data.map(c => axios.delete(`http://localhost:5000/comments/${c.id}`)));
      await axios.delete(`http://localhost:5000/blogs/${id}`);
      getData();
    } catch (err) {
      console.error("Error deleting blog or its comments:", err);
    }
  };

  return (
    <div className="admin-layout">
      <AdminHeader />
      <main className="content">
        <div className="d-flex justify-content-between align-items-center header-row">
          <h2 className="page-title fw-bolder">Blog List</h2>
          <button className="btn-add" onClick={() => navi("/addblog")}>
            + Add Blog
          </button>
        </div>

        <div className="table-wrapper">
          <table className="table-custom">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Category</th>
                <th>Author</th>
                <th>Content</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.length > 0 ? (
                blogs.map((blog, index) => (
                  <tr key={blog.id}>
                    <td>{index + 1}</td>
                    <td>{blog.title}</td>
                    <td>{blog.category}</td>
                    <td>{blog.author}</td>
                    <td style={{ maxWidth: "250px" }}>
                      {blog.content.length > 100
                        ? blog.content.slice(0, 30) + "..."
                        : blog.content}
                    </td>
                    <td>
                      {blog.image ? (
                        <img
                          src={blog.image}
                          alt="blog"
                          style={{
                            width: "70px",
                            height: "70px",
                            objectFit: "cover",
                            borderRadius: "8px",
                          }}
                        />
                      ) : (
                        "No Image"
                      )}
                    </td>
                    <td>
                      <button
                        className="btn-view m-2 "
                        onClick={() => navi(`/adminblogdetails/${blog.id}`)}
                      >
                        View Details
                      </button>
                      <button
                        className="btn-edit me-2"
                        onClick={() => navi(`/editblog/${blog.id}`)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn-delete mt-2"
                        onClick={() => handleDelete(blog.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="no-data">
                    No blogs available.
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
