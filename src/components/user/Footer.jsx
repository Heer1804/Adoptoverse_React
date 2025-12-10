import React from "react";
import { Link } from "react-router-dom";
import "./user.css";

export default function Footer() {
  return (
    <footer
      className="footer "
      style={{
        backgroundColor: "var(--navy)",
        color: "var(--white)",
        padding: "1.5rem 0",
      }}
    >
      <div
        className="container d-flex justify-content-between align-items-center"
        style={{ flexWrap: "wrap" }}
      >
        <p className="mb-0" style={{ fontSize: "0.95rem" }}>
          &copy; {new Date().getFullYear()} <strong>Adoptoverse</strong>. All
          rights reserved.
        </p>

        <div
          className="d-flex gap-3 mt-2 mt-md-0 "
          style={{ fontSize: "1rem" }}
        >
          <Link
            to="/userproduct"
            style={{ color: "var(--white)", textDecoration: "none" }}
          >
            Shop
          </Link>
          <Link
            to="/useradoption"
            style={{ color: "var(--white)", textDecoration: "none" }}
          >
            Adopt
          </Link>
          <Link
            to="/userblog"
            style={{ color: "var(--white)", textDecoration: "none" }}
          >
            Blog
          </Link>
          <Link
            to="/contact"
            style={{ color: "var(--white)", textDecoration: "none" }}
          >
            Contact
          </Link>
            <Link
            to="/about"
            style={{ color: "var(--white)", textDecoration: "none" }}
          >
            About Us
          </Link>
        </div>
      </div>
    </footer>
  );
}
