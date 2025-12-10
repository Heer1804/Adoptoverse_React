import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Category() {
  const navi = useNavigate();
  const [categories, setCategories] = useState([]);

  const url = "http://localhost:5000/category";

  const getData = async () => {
    try {
      const res = await axios.get(url);
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="app-wrapper">
      <Header />
      <main className="main-content flex-grow-1" style={{ paddingTop: "80px" }}>
        <div className="container my-5">
          <h2 className="text-center mb-5 fw-bold text-navy">Explore Our Categories</h2>
          <div className="row g-4 justify-content-center">
            {categories.map((category) => (
              <div key={category.id} className="col-lg-3">
                <div className="card h-100 shadow-sm hover-shadow">
                  <img
                    src={category.pic}
                    alt={category.name}
                    className="card-img-top"
                    style={{
                      height: "220px",
                      objectFit: "cover",
                      borderTopLeftRadius: "8px",
                      borderTopRightRadius: "8px",
                    }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-center">{category.name}</h5>
                    <button
                      className="btn btn-teal"
                      onClick={() =>
                        navi(`/userproduct?cat=${encodeURIComponent(category.name)}`)
                      }
                    >
                      Explore
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {categories.length === 0 && (
              <p className="text-center text-muted mt-4">No categories available.</p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
