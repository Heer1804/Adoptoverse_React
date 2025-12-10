import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

// Components
import Login from "./components/Login";
import Register from "./components/Register";
import AdminHome from "./components/AdminHome";
import Home from "./components/user/Home";

// Product Management
import Addproduct from "./components/product/Addproduct";
import ShowProduct from "./components/product/ShowProduct";
import EditProduct from "./components/product/EditProduct";
import ProductDetails from "./components/product/ProductDetails";
import MonthlySalesChart from "./components/product/MonthlySalesChart";

// Category Management
import AddCat from "./components/category/AddCat";
import ShowCat from "./components/category/ShowCat";
import EditCat from "./components/category/EditCat";

// Orders, Users, Feedback
import Order from "./components/Order";
import ShowUser from "./components/ShowUser";
import Showfeedback from "./components/contact/Showfeedback";

// Adoption Management
import AddAdopt from "./components/adoption/AddAdopt";
import ShowAdopt from "./components/adoption/ShowAdopt";
import EditAdopt from "./components/adoption/EditAdopt";
import AdoptDetails from "./components/user/AdoptDetails";

// Blog Management (Admin)
import AddBlog from "./components/blog/AddBlog";
import ShowBlogs from "./components/blog/ShowBlogs";
import EditBlog from "./components/blog/EditBlog";
import AdminBlogDetails from "./components/blog/AdminBlogDetails";
import ShowComments from "./components/blog/ShowComments";

// User Side Components
import Contact from "./components/user/Contact";
import About from "./components/user/About";
import Product from "./components/user/Product";
import Adoption from "./components/user/Adoption";
import Blog from "./components/user/Blog";
import Category from "./components/user/Category";
import BlogDetails from "./components/user/BlogDetails";
import Cart from "./components/user/Cart";
import AdoptionRequestForm from "./components/user/AdoptionRequestForm ";
import AdminAdoptionRequests from "./components/adoption/AdminAdoptionRequests";

function App() {
  const [user, setUser] = useState(null); // holds current logged-in user

  const handleLogout = () => {
    setUser(null);
    window.location.href = "/"; // redirect to login
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* ---------- Public Routes ---------- */}
        <Route path="/" element={<Login setUser={setUser} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />

        {/* ---------- Admin Routes ---------- */}
        {user && user.role === "admin" ? (
          <>
            <Route path="/adminhome" element={<AdminHome handleLogout={handleLogout} />} />
            <Route path="/addcat" element={<AddCat />} />
            <Route path="/showcat" element={<ShowCat />} />
            <Route path="/editcat/:id" element={<EditCat />} />

            <Route path="/addproduct" element={<Addproduct />} />
            <Route path="/showproduct" element={<ShowProduct />} />
            <Route path="/editproduct/:id" element={<EditProduct />} />
            <Route path="/productdetails/:id" element={<ProductDetails />} />
            <Route path="/monthlysales" element={<MonthlySalesChart />} />

            <Route path="/order" element={<Order />} />
            <Route path="/users" element={<ShowUser />} />
            <Route path="/showfeedbacks" element={<Showfeedback />} />

            <Route path="/addadopt" element={<AddAdopt />} />
            <Route path="/editadopt/:id" element={<EditAdopt />} />
            <Route path="/showadopt" element={<ShowAdopt />} />
            <Route path="/adminadoptionrequests" element={<AdminAdoptionRequests />} />


            <Route path="/addblog" element={<AddBlog />} />
            <Route path="/showblogs" element={<ShowBlogs />} />
            <Route path="/adminblogdetails/:id" element={<AdminBlogDetails />} />
            <Route path="/editblog/:id" element={<EditBlog />} />
            <Route path="/showcomments" element={<ShowComments />} />

          </>
        ) : user && user.role === "user" ? (
          <Route path="*" element={<Navigate to="/home" replace />} />
        ) : (
          <Route path="*" element={<Navigate to="/" replace />} />
        )}

        {/* ---------- User Routes ---------- */}
        {user && user.role === "user" ? (
          <>
            <Route path="/home" element={<Home handleLogout={handleLogout} />} />

            <Route path="/userproduct" element={<Product />} />
            <Route path="/productdetails/:id" element={<ProductDetails />} />
            <Route path="/usercategory" element={<Category />} />
            <Route path="/useradoption" element={<Adoption />} />
            <Route path="/adopt/:id" element={<AdoptDetails />} />
            <Route path="/adopt-request/:id" element={<AdoptionRequestForm />} />
            <Route path="/userblog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
          </>
        ) : user && user.role === "admin" ? (
          <Route path="*" element={<Navigate to="/adminhome" replace />} />
        ) : (
          <Route path="*" element={<Navigate to="/" replace />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
