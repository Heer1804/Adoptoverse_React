import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import "./user.css";

export default function AdoptDetails() {
  const { id } = useParams();
  const navi = useNavigate();
  const [pet, setPet] = useState(null);
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(null);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    if (loggedUser) setUser(loggedUser);

    axios
      .get(`http://localhost:5000/adoption/${id}`)
      .then((res) => setPet(res.data))
      .catch((err) => console.error(err));

    axios
      .get("http://localhost:5000/category")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error(err));

    axios
      .get("http://localhost:5000/adoptionRequests")
      .then((res) => setRequests(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!pet)
    return (
      <p className="text-center mt-5 text-muted">
        Loading adoption details...
      </p>
    );

  const categoryName =
    categories.find((c) => c.id === pet.acat)?.name || pet.acat;

  const petRequests = requests.filter((req) => req.petId === pet.id);

  return (
    <div className="app-wrapper d-flex flex-column min-vh-100">
      <Header />
      <main
        className="flex-grow-1 container my-5"
        style={{
          paddingTop: "110px",
        }}
      >
        <div
          className="adopt-detail-card card border-0 shadow-lg rounded-4 p-4 p-md-5 mx-auto"
          style={{
            backgroundColor: "var(--white)",
            maxWidth: "1100px",
            padding: "3rem",
          }}
        >
          <div className="d-flex flex-column flex-md-row align-items-center">
            <div className="adopt-image text-center mb-4 mb-md-0">
              <img
                src={pet.pic || "/placeholder.png"}
                alt={pet.pname}
                className="img-fluid rounded-4 shadow-sm"
                style={{
                  width: "100%",
                  maxWidth: "380px",
                  height: "auto",
                  objectFit: "cover",
                }}
              />
            </div>

            <div className="adopt-details ms-md-5 text-center text-md-start">
              <h2 className="fw-bold text-navy mb-2">{pet.pname}</h2>
              <div
                style={{
                  height: "4px",
                  width: "80px",
                  backgroundColor: "var(--teal)",
                  margin: "0 auto 20px auto",
                }}
                className="mx-md-0"
              ></div>

              <p className="mb-2">
                <strong className="text-teal">Category :</strong> {categoryName}
              </p>
              <p className="mb-2">
                <strong className="text-teal">Age :</strong> {pet.age}{" "}
                {pet.age > 1 ? "years" : "year"}
              </p>
              <p className="mb-2">
                <strong className="text-teal">Gender :</strong> {pet.gender}
              </p>
              <p className="mb-0">
                <strong className="text-teal">Description :</strong> {pet.desc}
              </p>

              <div className="mt-4">
                <p className="fw-semibold text-navy">
                  🐾 Total Adoption Requests:{" "}
                  <span className="text-teal">{petRequests.length}</span>
                </p>
              </div>

              <div className="d-flex gap-3 mt-4">
                <button
                  className="btn btn-teal fw-semibold px-4 py-2"
                  onClick={() => navi(-1)}
                >
                  Back
                </button>

                {pet.isAdopted ? (
                  <button
                    className="btn btn-secondary fw-semibold px-4 py-2"
                    disabled
                  >
                    Adoption Unavailable
                  </button>
                ) : user ? (
                  <button
                    type="button"
                    className="btn btn-teal fw-semibold px-4 py-2"
                    onClick={() => navi(`/adopt-request/${pet.id}`)}
                  >
                    Send Adoption Request
                  </button>
                ) : (
                  <p className="mt-3 text-danger fw-semibold">
                    Please log in to send an adoption request.
                  </p>
                )}
              </div>
            </div>
          </div>

          {petRequests.length > 0 && (
            <div className="mt-5">
              <h5 className="fw-bold text-navy mb-3">Adoption Requests:</h5>
              <div className="table-responsive">
                <table className="table table-bordered align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>#</th>
                      <th>User Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {petRequests.map((r, i) => (
                      <tr key={r.id}>
                        <td>{i + 1}</td>
                        <td>{r.userName || "Unknown"}</td>
                        <td>{r.email || "—"}</td>
                        <td>{r.phone || "—"}</td>
                        <td>
                          <span
                            className={`badge rounded-pill ${
                              r.status === "Approved"
                                ? "bg-success"
                                : r.status === "Rejected"
                                ? "bg-danger"
                                : "bg-warning text-dark"
                            }`}
                          >
                            {r.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
