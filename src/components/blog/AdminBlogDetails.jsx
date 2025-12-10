import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AdminHeader from "../AdminHeader";
import AdminFooter from "../AdminFooter";
import "../admin.css";

export default function AdminBlogDetails() {
  const { id } = useParams();
  const navi = useNavigate();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getData();
  }, [id]);

  const getData = async () => {
    try {
      const [blogRes, commentsRes] = await Promise.all([
        axios.get(`http://localhost:5000/blogs/${id}`),
        axios.get(`http://localhost:5000/comments?blogId=${id}`),
      ]);
      setBlog(blogRes.data);
      setComments(commentsRes.data);
    } catch (err) {
      console.error("Error fetching blog details:", err);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) return;
    try {
      await axios.delete(`http://localhost:5000/comments/${commentId}`);
      setComments((prev) => prev.filter((c) => c.id !== commentId));
    } catch (err) {
      console.error("Error deleting comment:", err);
    }
  };

  if (!blog)
    return <p className="text-center mt-5 fs-5 text-muted">Loading blog details...</p>;

  return (
    <div className="admin-layout">
      <AdminHeader />

      <main className="content flex-grow-1 d-flex align-items-center justify-content-center ">
        <div className="form-box p-4 bg-white rounded-4">
          <div className="d-flex justify-content-between align-items-center mb-4 px-3">
            <h2 className="page-title fw-bolder text-navy m-0 ps-4">Blog Details</h2>
            <button
              className="btn btn-outline-secondary hover-shadow"
              onClick={() => navi("/showblogs")}
            >
              ← Back to Blogs
            </button>
          </div>

          {blog.image && (
            <div className="text-center mb-4">
              <img
                src={blog.image}
                alt="blog"
                className="img-fluid rounded-3 shadow-sm hover-zoom"
                style={{
                  width: "100%",
                  maxHeight: "500px",
                  objectFit: "cover",
                }}
              />
            </div>
          )}

          <div className="mb-4">
            <h3 className="fw-bold text-dark mb-2">{blog.title}</h3>
            <p className="text-muted">
              <strong>Category:</strong> {blog.category} &nbsp;|&nbsp;
              <strong>Author:</strong> {blog.author}
            </p>
            <p className="text-secondary" style={{ lineHeight: "1.8" }}>
              {blog.content}
            </p>
            <div className="mt-3">
              <span className="badge bg-success px-3 py-2 fs-6 shadow-sm">
              Likes: {blog.likes || 0}
              </span>
            </div>
          </div>

          <hr className="my-4" />

          <div>
            <h4 className="text-navy mb-3 fw-bold">
              Comments ({comments.length})
            </h4>

            {comments.length > 0 ? (
              <div
                style={{
                  maxHeight: "350px",
                  overflowY: "auto",
                  paddingRight: "6px",
                }}
              >
                {comments.map((c) => (
                  <div
                    key={c.id}
                    className="d-flex justify-content-between align-items-start p-3 mb-3 rounded-3 bg-light border-start border-4 border-primary hover-shadow"
                  >
                    <div>
                      <p className="mb-1 fw-bold fs-6 text-dark">
                        {c.username || "Anonymous"}
                      </p>
                      <p className="mb-0 text-muted">{c.content}</p>
                    </div>
                    <button
                      className="btn btn-sm btn-danger mt-2 hover-scale"
                      onClick={() => handleDeleteComment(c.id)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted">No comments yet.</p>
            )}
          </div>
        </div>
      </main>

      <AdminFooter />
    </div>
  );
}
