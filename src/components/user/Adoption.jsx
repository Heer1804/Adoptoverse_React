import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import "./user.css";

export default function Adoption() {
  const navi = useNavigate();
  const [adoptions, setAdoptions] = useState([]);
  const [categories, setCategories] = useState([]);

  // Fetch adoption data
  const getAdoptions = async () => {
    try {
      const res = await axios.get("http://localhost:5000/adoption");
      setAdoptions(res.data);
    } catch (err) {
      console.error("Error fetching adoptions:", err);
    }
  };

  // Fetch categories
  const getCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/category");
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  useEffect(() => {
    getCategories();
    getAdoptions();
  }, []);

  // Map category ID to name
  const getCategoryName = (id) => {
    const cat = categories.find(c => c.id === id);
    return cat ? cat.name : id;
  };

  return (
    <div className="app-wrapper d-flex flex-column min-vh-100">
      <Header />

      <main className="main-content flex-grow-1" style={{ paddingTop: "80px" }}>
        <div className="container my-5">
          <h2 className="text-center mb-5 fw-bold text-navy">Adopt a Pet</h2>

          <div className="row g-4 justify-content-center">
            {adoptions.length > 0 ? (
              adoptions.map((pet) => (
                <div key={pet.id} className="col-lg-3 ">
                  <div className="card h-100 shadow-sm hover-shadow feature-card">
                    <img
                      src={pet.pic || "/placeholder.png"}
                      alt={pet.pname}
                      className="card-img-top"
                      style={{
                        height: "220px",
                        objectFit: "cover",
                        borderTopLeftRadius: "8px",
                        borderTopRightRadius: "8px",
                      }}
                    />
                    <div className="card-body d-flex flex-column pb-0">
                      <h5 className="card-title text-center fw-bold">{pet.pname}</h5>
                      <p className="text-muted mb-2" style={{ fontSize: "1rem" }}>
                        <strong>Category:</strong> {getCategoryName(pet.acat)} <br />
                        <strong>Age:</strong> {pet.age} | <strong>Gender:</strong> {pet.gender}
                      </p>
                      <button
                        className="btn btn-teal mt-3"
                        onClick={() => navi(`/adopt/${pet.id}`)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-muted mt-4">No pets available for adoption.</p>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
