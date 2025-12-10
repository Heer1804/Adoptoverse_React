import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Product() {
  const query = useQuery();
  const initialCat = query.get("cat") || "all";
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState(initialCat);

  const getProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/product");
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const getCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/category");
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  const addCart = async (productId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("Please login first.");
      window.location.href = "/login";
      return;
    }
    try {
      const productRes = await axios.get(
        `http://localhost:5000/product/${productId}`
      );
      const product = productRes.data;

      const order = {
        pid: product.id,
        pname: product.pname,
        pprice: product.pprice,
        pic: product.pic,
        qty: 1,
        status: 0,
        uid: user.id,
        username: user.username,
      };

      await axios.post("http://localhost:5000/order", order);
      alert("Added to cart successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to add product to cart.");
    }
  };

  // Filter products by selected category name
  const filteredProducts =
    selectedCat === "all"
      ? products
      : products.filter((p) => p.category === selectedCat);

  return (
    <div className="app-wrapper">
      <Header />
      <main className="main-content" style={{ paddingTop: "80px" }}>
        <div className="container my-5">
          <h2 className="text-center mb-4 fw-bold text-navy">
            Explore Our Products
          </h2>

          {/* Category Filter */}
          <div className="text-center mb-5">
            <select
              className="form-select w-auto d-inline-block shadow-sm"
               style={{
                borderRadius: "20px",
                padding: "8px 36px",
                borderColor: "var(--teal)",
              }}
              value={selectedCat}
              onChange={(e) => setSelectedCat(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {filteredProducts.length === 0 ? (
            <p className="text-center text-muted">No products available.</p>
          ) : (
            <div
              className="product-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "24px",
              }}
            >
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="card h-100 border-0 shadow-sm position-relative overflow-hidden"
                  style={{
                    transition: "all 0.3s ease",
                    borderRadius: "16px",
                    background: "#fff",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px)";
                    e.currentTarget.style.boxShadow =
                      "0 12px 30px rgba(0,0,0,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 12px rgba(0,0,0,0.08)";
                  }}
                >
                  <div className="position-relative">
                    <img
                      src={product.pic}
                      alt={product.pname}
                      className="card-img-top"
                      style={{
                        height: "230px",
                        objectFit: "cover",
                        borderTopLeftRadius: "16px",
                        borderTopRightRadius: "16px",
                      }}
                    />
                  </div>

                  <div className="card-body d-flex flex-column px-3 pb-4">
                    <h5 className="card-title text-center fw-semibold mb-2">
                      {product.pname}
                    </h5>
                    <p
                      className="card-text text-muted text-center flex-grow-1"
                      style={{
                        fontSize: "0.9rem",
                        lineHeight: "1.4",
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        minHeight: "55px",
                      }}
                    >
                      {product.pdesc}
                    </p>
                    <h6 className="text-teal fw-bold mb-3 text-center">
                      ₹ {product.pprice}
                    </h6>
                    <button
                      onClick={() => addCart(product.id)}
                      className="btn text-white mt-auto w-100"
                      style={{
                        background: "linear-gradient(90deg, #3C6472, #507C8D)",
                        padding: "10px 14px",
                        borderRadius: "10px",
                        fontWeight: "500",
                        fontSize: "0.95rem",
                        letterSpacing: "0.5px",
                        transition: "all 0.2s ease-in-out",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.05)";
                        e.currentTarget.style.boxShadow =
                          "0 6px 14px rgba(0,0,0,0.2)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
