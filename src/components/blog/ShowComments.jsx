import React, { useEffect, useState } from "react";
import AdminHeader from "../AdminHeader";
import AdminFooter from "../AdminFooter";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ShowComments() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [commentsRes, blogsRes] = await Promise.all([
          axios.get("http://localhost:5000/comments"),
          axios.get("http://localhost:5000/blogs"),
        ]);

        const blogMap = {};
        blogsRes.data.forEach((b) => {
          blogMap[b.id] = b.title;
        });

        // Merge blogTitle and remove comments for deleted blogs
        const merged = commentsRes.data
          .map((c) => ({
            ...c,
            blogTitle: blogMap[c.blogId],
          }))
          .filter((c) => c.blogTitle);

        const sorted = merged.sort(
          (a, b) =>
            new Date(b.date || new Date()) - new Date(a.date || new Date())
        );

        setComments(sorted);
      } catch (err) {
        console.error("Error fetching comments/blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="admin-layout" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AdminHeader />
      <div className="main-wrapper" style={{ flex: 1, padding: "2rem" }}>
        <main className="content">
          <h3 className="fw-bold mb-3" style={{ color: "var(--navy)" }}>
            Manage Blog Comments
          </h3>
          <p className="text-muted mb-4">
            Here you can review and manage all recent blog comments.
          </p>

          {loading ? (
            <p className="fw-bold">Loading comments...</p>
          ) : comments.length > 0 ? (
            <div className="table-responsive shadow-sm rounded">
              <table className="table mb-0" style={{ borderRadius: "10px", overflow: "hidden" }}>
                <thead style={{ backgroundColor: "var(--navy)", color: "var(--white)" }}>
                  <tr style={{ textAlign: "center", verticalAlign: "middle" }}>
                    <th style={{ width: "8%" }}>Sr. No.</th>
                    <th style={{ width: "15%" }}>User</th>
                    <th style={{ width: "13%" }}>Comment</th>
                    <th style={{ width: "30%" }}>Blog Title</th>
                    <th style={{ width: "10%" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {comments.map((c, index) => {
                  

                    return (
                      <tr
                        key={c.id}
                        style={{
                          textAlign: "center",
                          backgroundColor: index % 2 === 0 ? "var(--light-gray)" : "white",
                        }}
                      >
                        <td>{index + 1}</td>
                        <td style={{ fontWeight: "600", color: "var(--navy)" }}>
                          {c.username || "Anonymous"}
                        </td>
                        <td style={{ textAlign: "left" }}>{c.content}</td>
                        <td style={{ fontWeight: "500", color: "var(--teal)" }}>
                          {c.blogTitle}
                        </td>
                        <td>
                          <button
                            className="btn btn-sm"
                            style={{
                              backgroundColor: "var(--teal)",
                              color: "white",
                              borderRadius: "8px",
                              padding: "6px 14px",
                              fontWeight: "500",
                              border: "none",
                              transition: "0.3s",
                            }}
                            onClick={() => navigate(`/adminblogdetails/${c.blogId}`)}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--blue)")}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--teal)")}
                          >
                            View Blog
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-muted">No comments available.</p>
          )}
        </main>
      </div>

      <AdminFooter />
    </div>
  );
}
