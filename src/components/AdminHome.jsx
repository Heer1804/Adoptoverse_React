import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AdminHeader from "./AdminHeader";
import AdminFooter from "./AdminFooter";
import MonthlySalesChart from "./product/MonthlySalesChart";

export default function AdminHome() {
  const [counts, setCounts] = useState({
    categories: 0,
    products: 0,
    adoption: 0,
    users: 0,
    orders: 0,
    feedbacks: 0,
    comments: 0,
    blog: 0,
  });

  const [recentOrders, setRecentOrders] = useState([]);
  const [recentFeedbacks, setRecentFeedbacks] = useState([]);
  const [recentAdoptions, setRecentAdoptions] = useState([]);
  const [recentComments, setRecentComments] = useState([]);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          catRes,
          prodRes,
          userRes,
          orderRes,
          feedbackRes,
          adoptRes,
          commentRes,
          blogRes,
        ] = await Promise.all([
          axios.get("http://localhost:5000/category"),
          axios.get("http://localhost:5000/product"),
          axios.get("http://localhost:5000/user"),
          axios.get("http://localhost:5000/order"),
          axios.get("http://localhost:5000/contact"),
          axios.get("http://localhost:5000/adoption"),
          axios.get("http://localhost:5000/comments"),
          axios.get("http://localhost:5000/blogs"),
        ]);

        setCounts({
          categories: catRes.data.length,
          products: prodRes.data.length,
          adoption: adoptRes.data.length,
          users: userRes.data.length,
          orders: orderRes.data.length,
          feedbacks: feedbackRes.data.length,
          comments: commentRes.data.length,
          blog: blogRes.data.length,
        });

        setRecentOrders(
          orderRes.data
            .sort((a, b) => new Date(b.date || new Date()) - new Date(a.date || new Date()))
            .slice(0, 5)
        );
        setRecentFeedbacks(
          feedbackRes.data
            .sort((a, b) => new Date(b.date || new Date()) - new Date(a.date || new Date()))
            .slice(0, 5)
        );
        setRecentAdoptions(
          adoptRes.data
            .sort((a, b) => new Date(b.date || new Date()) - new Date(a.date || new Date()))
            .slice(0, 5)
        );
        setRecentComments(
          commentRes.data
            .sort((a, b) => new Date(b.date || new Date()) - new Date(a.date || new Date()))
            .slice(0, 5)
        );
        setRecentBlogs(
          blogRes.data
            .sort((a, b) => new Date(b.date || new Date()) - new Date(a.date || new Date()))
            .slice(0, 5)
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="admin-layout" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AdminHeader />

      <div className="main-wrapper" style={{ flex: 1, padding: "2rem" }}>
        <main className="content">
          <h1 className="dashboard-title fw-bold">Welcome Back, Admin!</h1>
          <p className="dashboard-subtitle">Quick overview of your store activity and feedback.</p>

          <div
            className="dashboard-cards"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "1.5rem",
              marginTop: "2rem",
            }}
          >
            {[
              { title: "Categories", count: counts.categories, color: "var(--blue)", link: "/showcat", btnText: "Manage Categories" },
              { title: "Products", count: counts.products, color: "var(--navy)", link: "/showproduct", btnText: "Manage Products" },
              { title: "Orders", count: counts.orders, color: "var(--teal)", link: "/order", btnText: "View Orders" },
              { title: "Adoption", count: counts.adoption, color: "var(--sky-blue)", link: "/showadopt", btnText: "Manage Adoption" },
              { title: "Comments", count: counts.comments, color: "var(--sky-blue)", link: "/showcomments", btnText: "View Comments" },
              { title: "Blogs", count: counts.blog, color: "var(--teal)", link: "/showblogs", btnText: "View Blogs" },
              { title: "Users", count: counts.users, color: "var(--navy)", link: "/users", btnText: "View Users" },
              { title: "Feedback", count: counts.feedbacks, color: "var(--blue)", link: "/showfeedbacks", btnText: "View Feedback" },
            ].map((card, idx) => (
              <div
                key={idx}
                className="card dashboard-card"
                style={{
                  backgroundColor: card.color,
                  color: card.textColor ? card.textColor : (card.color === "var(--sky-blue)" ? "var(--navy)" : "var(--white)"),
                  padding: "1.5rem",
                  borderRadius: "1rem",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.25)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
                }}
              >
                <div className="card-body mt-2" style={{ textAlign: "center" }}>
                  <h5 className="card-title" style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>
                    {card.title}
                  </h5>
                  <h2 className="card-count" style={{ fontSize: "2rem", fontWeight: "700" }}>
                    {card.count}
                  </h2>
                  <Link
                    to={card.link}
                    className="card-btn"
                    style={{
                      display: "inline-block",
                      marginTop: "0.8rem",
                      padding: "0.5rem 1.2rem",
                      backgroundColor: "rgba(255,255,255,0.2)",
                      color: "inherit",
                      borderRadius: "0.5rem",
                      textDecoration: "none",
                      fontWeight: "500",
                      transition: "background 0.3s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.35)")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.2)")}
                  >
                    {card.btnText}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="monthly-sales m-4 mt-5">
            <MonthlySalesChart />
          </div>

          <div className="quick-actions text-center mt-5">
            <h3 className="fw-bold mb-3">Quick Actions</h3>
            <div className="action-buttons">
              <Link to="/addcat" className="action-btn btn-navy">Add New Category</Link>
              <Link to="/addproduct" className="action-btn btn-teal">Add New Product</Link>
              <Link to="/order" className="action-btn btn-skyblue">View Orders</Link>
              <Link to="/addadopt" className="action-btn btn-navy">Add Adoption</Link>
              <Link to="/addblog" className="action-btn btn-teal">Add Blog</Link>
              <Link to="/users" className="action-btn btn-skyblue">Manage Users</Link>
            </div>
          </div>

          <div className="recent-comments mt-5">
            <h3 className="fw-bold mb-3">Recent Comments on Blogs</h3>
            {recentComments.length > 0 ? (
              <div className="table-responsive shadow-sm rounded">
                <table className="admin-home-table">
                  <thead className="table-dark">
                    <tr>
                      <th>ID</th>
                      <th>User</th>
                      <th>Comment</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentComments.map((c) => {
                      const formattedDate = new Date(c.date || new Date()).toLocaleDateString();
                      return (
                        <tr key={c.id}>
                          <td>#{c.id}</td>
                          <td>{c.username || "Anonymous"}</td>
                          <td>{c.content}</td>
                          <td>{formattedDate}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-muted">No comments yet.</p>
            )}
          </div>

          <div className="recent-orders mt-5">
            <h3 className="fw-bold mb-3">Recent Orders</h3>
            <div className="table-responsive shadow-sm rounded">
              <table className="admin-home-table">
                <thead className="table-dark">
                  <tr>
                    <th>Order ID</th>
                    <th>User</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map(order => {
                    const statusText = order.status === 0 ? "Pending" : order.status === 1 ? "Confirmed" : "Cancelled";
                    const totalAmount = order.pprice && order.qty ? Number(order.pprice) * Number(order.qty) : 0;
                    const formattedDate = new Date(order.date || new Date()).toLocaleDateString();
                    return (
                      <tr key={order.id}>
                        <td>#{order.id}</td>
                        <td>{order.username}</td>
                        <td>₹{totalAmount.toFixed(2)}</td>
                        <td>{statusText}</td>
                        <td>{formattedDate}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="recent-feedbacks mt-5">
            <h3 className="mb-3 fw-bold">Recent Feedback</h3>
            <div className="table-responsive shadow-sm rounded">
              <table className="admin-home-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Message</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentFeedbacks.length > 0 ? (
                    recentFeedbacks.map((feedback) => {
                      const user = feedback.username || feedback.name || "Anonymous";
                      const date = feedback.date || new Date().toISOString();
                      const formattedDate = new Date(date).toLocaleDateString();

                      return (
                        <tr key={feedback.id}>
                          <td style={{ width: "20%", fontWeight: "bold" }}>{user}</td>
                          <td style={{ flex: 1 }}>{feedback.message}</td>
                          <td style={{ width: "20%" }}>{formattedDate}</td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="3" className="no-data">
                        No feedback found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="recent-adoptions mt-5">
            <h3 className="mb-3 fw-bold">Recent Adoptions</h3>
            <div className="table-responsive shadow-sm rounded">
              <table className="admin-home-table">
                <thead className="table-dark">
                  <tr>
                    <th>ID</th>
                    <th>Pet Name</th>
                    <th>Category</th>
                    <th>Age</th>
                    <th>Gender</th>
                  </tr>
                </thead>
                <tbody>
                  {recentAdoptions.map(a => (
                    <tr key={a.id}>
                      <td>#{a.id}</td>
                      <td>{a.pname}</td>
                      <td>{a.acatName || a.acat}</td>
                      <td>{a.age}</td>
                      <td>{a.gender}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="recent-blogs mt-5">
            <h3 className="mb-3 fw-bold">Recent Blogs</h3>
            {recentBlogs.length > 0 ? (
              <div className="table-responsive shadow-sm rounded">
                <table className="admin-home-table">
                  <thead className="table-dark">
                    <tr>
                      <th>ID</th>
                      <th>Title</th>
                      <th>Author</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentBlogs.map(blog => {
                      const formattedDate = new Date(blog.date || new Date()).toLocaleDateString();
                      return (
                        <tr key={blog.id}>
                          <td>#{blog.id}</td>
                          <td>{blog.title}</td>
                          <td>{blog.author || "Admin"}</td>
                          <td>{formattedDate}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-muted">No blogs available.</p>
            )}
          </div>
        </main>
      </div>

      <AdminFooter />
    </div>
  );
}
