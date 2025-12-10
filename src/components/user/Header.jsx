import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./user.css";

export default function Header() {
  const [user, setUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/home");
  };

  const links = [
    { to: "/home", label: "Home" },
    { to: "/usercategory", label: "Category" },
    { to: "/userproduct", label: "Products" },
    { to: "/useradoption", label: "Adoption" },
    { to: "/userblog", label: "Blogs" },
    { to: "/contact", label: "Feedback" },
    { to: "/about", label: "About Us" },
    { to: "/cart", label: "Cart" },
  ];

  return (
    <nav
      className={`navbar navbar-expand-lg fixed-top ${
        scrolled ? "navbar-scrolled" : "navbar-default"
      }`}
    >
      <div className="container">
        <Link className="navbar-brand fw-bold text-navy fs-4" to="/home">
          <span className="text-teal">Adopto</span>verse 🐾
        </Link>

        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center">
            {links.map((link) => (
              <li className="nav-item mx-1" key={link.to}>
                <Link
                  className={`nav-link fw-semibold ${
                    location.pathname === link.to ? "active-link" : ""
                  }`}
                  to={link.to}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="ms-lg-3 mt-3 mt-lg-0">
            {user ? (
              <button
                className="btn btn-outline-danger px-3 fw-semibold"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="btn btn-outline-navy me-2 px-3 fw-semibold"
                >
                  Login
                </Link>
                <Link to="/register" className="btn btn-teal px-3 fw-semibold">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
