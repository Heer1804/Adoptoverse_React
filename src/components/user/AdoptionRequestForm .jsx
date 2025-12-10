import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import "./user.css";

export default function AdoptionRequestForm() {
  const { id } = useParams(); // pet ID
  const navi = useNavigate();
  const [pet, setPet] = useState(null);
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  useEffect(() => {
    // Logged-in user data
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    if (loggedUser) {
      setUser(loggedUser);
      setForm((prev) => ({
        ...prev,
        name: loggedUser.name || "",
        email: loggedUser.email || "",
      }));
    }

    // Fetch pet details
    axios
      .get(`http://localhost:5000/adoption/${id}`)
      .then((res) => setPet(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setStatus("Please log in before submitting a request.");
      return;
    }

    const newRequest = {
      petId: pet.id,
      petName: pet.pname,
      userId: user.id,
      userName: form.name,
      email: form.email,
      phone: form.phone,
      address: form.address,
      message: form.message,
      status: "Pending",
      date: new Date().toISOString(),
    };

    try {
      await axios.post("http://localhost:5000/adoptionRequests", newRequest);
      setStatus("Your adoption request has been sent successfully!");
      setTimeout(() => navi("/adoption"), 2000);
    } catch (error) {
      console.error(error);
      setStatus("Something went wrong. Please try again later.");
    }
  };

  if (!pet)
    return <p className="text-center mt-5 text-muted">Loading pet details...</p>;

  return (
    <div className="app-wrapper d-flex flex-column min-vh-100">
      <Header />

      <main className="flex-grow-1 container my-5" style={{ paddingTop: "110px" }}>
        <div
          className="card border-0 shadow-lg rounded-4 p-4 p-md-5 mx-auto"
          style={{ maxWidth: "700px", backgroundColor: "var(--white)" }}
        >
          <h2 className="fw-bold text-navy text-center mb-4">
            Adoption Request for {pet.pname}
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="form-control rounded-3"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="form-control rounded-3"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="form-control rounded-3"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Address</label>
              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                className="form-control rounded-3"
                rows="2"
                required
              ></textarea>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                className="form-control rounded-3"
                rows="3"
                placeholder="Why do you want to adopt this pet?"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn btn-teal w-100 fw-semibold rounded-3 mt-3"
            >
              Submit Request
            </button>

            {status && (
              <p
                className={`mt-3 text-center fw-semibold ${
                  status.includes("success") ? "text-success" : "text-danger"
                }`}
              >
                {status}
              </p>
            )}
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
