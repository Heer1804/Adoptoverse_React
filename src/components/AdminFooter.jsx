import React from "react";
import { Link } from "react-router-dom";

export default function AdminFooter() {
  return (
    <footer className="pc-footer">
      <div className="footer-wrapper container-fluid">
        <div>
          <p className="m-0 fs-6 text-light">
            © {new Date().getFullYear()} <strong>Adoptoverse</strong> | Crafted with ❤️ for pet lovers
          </p>
        </div>
        <div className="col-auto my-1">
          <Link to="/dashboard" style={{ color: "white", marginRight: "16px" }}>
            Dashboard
          </Link>
          <Link to="/showproduct" style={{ color: "white", marginRight: "16px" }}>
            Products
          </Link>
          <Link to="/showcat" style={{ color: "white", marginRight: "16px" }}>
            Pets
          </Link>
          <Link to="/showadopt" style={{ color: "white", marginRight: "16px" }}>
            Adoptions
          </Link>
          <Link to="/showblogs" style={{ color: "white", marginRight: "16px" }}>
            Blogs
          </Link>
          <Link to="/users" style={{ color: "white" }}>
            Users
          </Link>
        </div>
      </div>
    </footer>
  );
}
