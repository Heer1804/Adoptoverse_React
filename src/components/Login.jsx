import React, { useState } from "react";
import "../components/Style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navi = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Username and password are required");
      return;
    }

    try {
      const res = await axios.get("http://localhost:5000/user");
      const users = res.data;

      const foundUser = users.find(
        (u) => u.username === username && u.password === password
      );

      if (foundUser) {
        // save in app state (App.jsx receives setUser)
        setUser(foundUser);

        // persist in localStorage so refresh / new tab keeps login
        localStorage.setItem("user", JSON.stringify(foundUser));

        // dispatch a custom event so Header (same tab) can react immediately
        window.dispatchEvent(new Event("userChanged"));

        if (foundUser.role === "admin") {
          alert("Welcome Admin!");
          navi("/adminhome");
        } else {
          alert("Welcome User!");
          navi("/home");
        }
      } else {
        alert("Invalid username or password");
      }
    } catch (err) {
      alert("Error connecting to server: " + err.message);
    }
  };

  return (
    <div className="login-body">
      <div className="login-box text-center">
        <h3 className="login-title mb-3">Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <span className="input-icon">
              <i className="fa-solid fa-user"></i>
            </span>
            <input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
          </div>

          <div className="input-group">
            <span className="input-icon">
              <i className="fa-solid fa-key"></i>
            </span>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>

          <button className="login-btn" type="submit">
            Login
          </button>
        </form>

        <div className="links">
          <p>
            Don’t have an account?{" "}
            <a href="/register" className="link">
              Register Now
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
