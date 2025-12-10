import React, { useEffect, useState } from "react";
import axios from "axios";
import "./admin.css";
import { useNavigate, Link } from "react-router-dom";

export default function AdminHeader() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [allData, setAllData] = useState([]);
  const navigate = useNavigate();

  // ✅ Fetch all data (products, adoptions, blogs)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [products, adoptions, blogs] = await Promise.all([
          axios.get("http://localhost:5000/product"),
          axios.get("http://localhost:5000/adoption"),
          axios.get("http://localhost:5000/blogs"),
        ]);

        const combinedData = [
          ...products.data.map((p) => ({ ...p, type: "product" })),
          ...adoptions.data.map((a) => ({ ...a, type: "adoption" })),
          ...blogs.data.map((b) => ({ ...b, type: "blog" })),
        ];

        setAllData(combinedData);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  // ✅ Filter search results
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setResults([]);
    } else {
      const filtered = allData.filter((item) => {
        const name =
          item?.pname || item?.title || item?.name || item?.desc || "";
        return name.toLowerCase().includes(searchTerm.toLowerCase());
      });
      setResults(filtered);
    }
  }, [searchTerm, allData]);

  const handleClick = (item) => {
    if (item.type === "product") navigate(`/productdetails/${item.id}`);
    else if (item.type === "adoption") navigate(`/editadopt/${item.id}`);
    else if (item.type === "blog") navigate(`/adminblogdetails/${item.id}`);
  };

  // ✅ Logout handler
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div>
      <header className="top-header d-flex align-items-center justify-content-between px-3">
        {/* 🔍 Search Bar */}
        <div className="header-search position-relative">
          <input
            type="text"
            className="search-input"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <i className="bi bi-search search-icon"></i>

          {/* 🔽 Search Results Dropdown */}
          {results.length > 0 && (
            <div className="search-results">
              {results.map((item) => {
                const name =
                  item?.pname || item?.title || item?.name || "Unnamed";
                const img =
                  item?.pic || item?.image || "/assets/images/default.png";
                return (
                  <div
                    key={item.id}
                    className="search-item"
                    onClick={() => handleClick(item)}
                  >
                    <img
                      src={img}
                      alt={name}
                      className="search-thumb"
                      onError={(e) =>
                        (e.target.src = "/assets/images/default.png")
                      }
                    />
                    <div className="search-meta">
                      <span className="search-title">{name}</span>
                      <span className="search-sub">
                        {item.type.charAt(0).toUpperCase() +
                          item.type.slice(1)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* 👤 Admin Profile */}
        <div className="top-header-right">
          <div className="profile-dropdown">
            <Link to="/adminhome">
              <img
                src="/assets/images/p2.jpg"
                alt="Admin"
                className="profile-pic"
              />
            </Link>
            <span className="profile-name">Admin</span>
          </div>
        </div>
      </header>

      {/* 🧭 Sidebar Navigation */}
      <div className="sidebar">
        <div className="sidebar-logo mb-5">
          <Link to="/adminhome" className="logo-link">
            <img
              src="/assets/images/logo_white.png"
              alt="Adoptoverse Logo"
              className="logo-img"
            />
          </Link>
        </div>

        <Link to="/adminhome">Dashboard</Link>
        <Link to="/showcat">Category</Link>
        <Link to="/showproduct">Products</Link>
        <Link to="/showadopt">Adoption</Link>
        <Link to="/showblogs">Blog</Link>
        <Link to="/users">Users</Link>
        <Link to="/order">Orders</Link>
        <Link to="/showfeedbacks">Feedback</Link>
        <Link to="/" onClick={handleLogout}>
          Logout
        </Link>
      </div>
    </div>
  );
}
