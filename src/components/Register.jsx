import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // ✅ Added import
import '../components/Style.css'; 

export default function Register() {
  const [form, setForm] = useState({
    username: '',
    password: '',
    cpassword: '',
    email: '',
    mobileno: ''
  });

  const changeValue = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

    if (!form.username || !form.password || !form.cpassword || !form.email || !form.mobileno) {
      alert('All fields are required');
      return;
    }

    if (form.password !== form.cpassword) {
      alert('Passwords must match');
      return;
    }

    try {
      await axios.post('http://localhost:5000/user', { ...form, role: 'user' });
      alert('Registration Successful');
      window.location.href = '/';
    } catch (err) {
      alert('Error during registration: ' + err.message);
    }
  };

  return (
    <div className='login-body'>
      <div className="login-box text-center">
        <h3 className="login-title mb-3">Register Now</h3>
        <form onSubmit={onSubmitForm}>
          <div className="input-group">
            <span className="input-icon"><i className="fa-solid fa-user"></i></span>
            <input name='username' onChange={changeValue} type="text" placeholder="Username" />
          </div>

          <div className="input-group">
            <span className="input-icon"><i className="fa-solid fa-key"></i></span>
            <input name='password' onChange={changeValue} type="password" placeholder="Password" />
          </div>

          <div className="input-group">
            <span className="input-icon"><i className="fa-solid fa-key"></i></span>
            <input name='cpassword' onChange={changeValue} type="password" placeholder="Confirm Password" />
          </div>

          <div className="input-group">
            <span className="input-icon"><i className="fa-solid fa-envelope"></i></span>
            <input name='email' onChange={changeValue} type="email" placeholder="Email" />
          </div>

          <div className="input-group">
            <span className="input-icon"><i className="fa-solid fa-phone"></i></span>
            <input name='mobileno' onChange={changeValue} type="number" placeholder="Mobile No" />
          </div>

          <button className="login-btn" type="submit">Register</button>
        </form>

        <div className="links">
          <p className=''>
            Already have an account?{" "}
            <Link to="/" className="link" style={{ color: "white" }}>
              Login Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
