import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import "./user.css";

export default function BlogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState("");

  // Fetch logged-in user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // Fetch blog and comments
  useEffect(() => {
    axios
      .get(`http://localhost:5000/blogs/${id}`)
      .then((res) => {
        // Ensure likedBy array exists
        setBlog({ ...res.data, likes: res.data.likes || 0, likedBy: res.data.likedBy || [] });
      })
      .catch((err) => console.error(err));

    axios
      .get(`http://localhost:5000/comments?blogId=${id}`)
      .then((res) => setComments(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  // Show alert
  const showAlert = (msg) => {
    setAlert(msg);
    setTimeout(() => setAlert(""), 3000);
  };

  // Handle Like (only once per user)
  const handleLike = async () => {
    if (!user) return showAlert("Please log in to like this blog");

    const likedBy = blog.likedBy || [];

    if (likedBy.includes(user.id)) {
      return showAlert("You have already liked this blog");
    }

    try {
      const updatedLikes = blog.likes + 1;
      const updatedLikedBy = [...likedBy, user.id];

      await axios.patch(`http://localhost:5000/blogs/${id}`, {
        likes: updatedLikes,
        likedBy: updatedLikedBy,
      });

      setBlog((prev) => ({
        ...prev,
        likes: updatedLikes,
        likedBy: updatedLikedBy,
      }));
    } catch (err) {
      console.error(err);
    }
  };

  // Handle Comment Submit
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!user) return showAlert("Please log in to comment");
    if (!newComment.trim()) return;

    try {
      const res = await axios.post(`http://localhost:5000/comments`, {
        blogId: id,
        userId: user.id,
        username: user.username || "User",
        content: newComment,
      });
      setComments((prev) => [...prev, res.data]);
      setNewComment("");
    } catch (err) {
      console.error(err);
    }
  };

  if (!blog) return <p className="text-center mt-5">Loading blog details...</p>;

  return (
    <div className="app-wrapper d-flex flex-column min-vh-100">
      <Header />

      <main className="flex-grow-1 container my-5 pt-5">
        {/* Toast Alert */}
        {alert && (
          <div
            style={{
              position: "fixed",
              top: "80px",
              left: "50%",
              transform: "translateX(-50%)",
              background: "#ffc107",
              color: "#2F4156",
              padding: "12px 20px",
              borderRadius: "6px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
              zIndex: 9999,
              fontWeight: "500",
              textAlign: "center",
              minWidth: "280px",
            }}
          >
            {alert}
          </div>
        )}

        {/* Blog Card */}
        <div className="card shadow-sm rounded feature-card hover-scale d-flex flex-column flex-md-row p-4">
          {/* Left: Image */}
          <div className="flex-shrink-0 text-center mb-3 mb-md-0">
            <img
              src={blog.image || "/placeholder.png"}
              alt={blog.title}
              className="img-fluid rounded"
              style={{
                width: "100%",
                maxWidth: "400px",
                maxHeight: "400px",
                objectFit: "cover",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            />
          </div>

          {/* Right: Content */}
          <div className="flex-grow-1 ms-md-4">
            <h2 className="fw-bold text-navy">{blog.title}</h2>
            <p className="text-muted mb-3">
              <strong>Author:</strong> {blog.author} |{" "}
              <strong>Category:</strong> {blog.category}
            </p>
            <hr />
            <p
              className="text-muted"
              style={{ lineHeight: "1.6", fontSize: "0.95rem" }}
            >
              {blog.content}
            </p>

            <div className="mt-3">
              <button
                className="btn btn-teal me-2"
                onClick={handleLike}
                disabled={user && (blog.likedBy || []).includes(user.id)}
              >
                👍 Like ({blog.likes || 0})
              </button>
            </div>
          </div>
        </div>

        {/* Comment Section */}
        <div className="mt-4 card shadow-sm rounded p-4">
          <h5 className="text-teal mb-3">Comments</h5>

          {comments.length === 0 && (
            <p className="text-muted">No comments yet.</p>
          )}

          {comments.map((c, i) => (
            <div key={i} className="mb-2 border-bottom pb-2">
              <p className="mb-1">
                <strong>{c.username || "User"}:</strong>
              </p>
              <p className="text-muted">{c.content}</p>
            </div>
          ))}

          <form onSubmit={handleCommentSubmit} className="mt-3">
            <textarea
              className="form-control mb-2"
              rows="3"
              placeholder={user ? "Write your comment..." : "Log in to comment"}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              disabled={!user}
            ></textarea>
            <button type="submit" className="btn btn-teal" disabled={!user}>
              Submit Comment
            </button>
          </form>
        </div>

        <button className="btn btn-teal mt-3" onClick={() => navigate(-1)}>
          &larr; Back
        </button>
      </main>

      <Footer />
    </div>
  );
}
