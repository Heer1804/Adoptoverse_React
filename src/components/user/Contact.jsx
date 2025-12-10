import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";

export default function Contact() {
  const [contact, setContact] = useState({
    username: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!contact.username || !contact.email || !contact.message) {
      alert("All fields are required!");
      return;
    }

    try {
      await axios.post("http://localhost:5000/contact", contact);
      alert("Thank you for contacting us!");
      setContact({ username: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      alert("Failed to send message. Please try again.");
    }
  };

  return (
    <div
      className="app-wrapper d-flex flex-column min-vh-100"
      style={{ backgroundColor: "var(--beige)" }}
    >
      <Header />

      <main className="flex-grow-1 d-flex align-items-center justify-content-center">
        <section className="contact-section mt-5 w-100">
          <div className="container d-flex justify-content-center text-center">
            <div className="row justify-content-center align-items-center g-4 w-auto">

              <div className="col-lg-5 col-md-6">
                <div className="card p-5 shadow-sm border-0 rounded-4 h-100">
                  <h2 className="mb-3 text-navy fw-bold">Contact Us</h2>
                  <div
                    style={{
                      height: "4px",
                      width: "70px",
                      backgroundColor: "var(--teal)",
                      marginBottom: "20px",
                    }}
                  ></div>
                  <p className="text-muted">
                    We'd love to hear from you! Whether you're looking for pet
                    products or have questions, feel free to reach out.
                  </p>
                  <ul className="list-unstyled text-navy mt-4">
                    <li className="mb-2"><strong>Email:</strong> info@adoptoverse.com</li>
                    <li className="mb-2"><strong>Phone:</strong> +91 99999 99999</li>
                    <li className="mb-2"><strong>Location:</strong> Surat, India</li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-5 col-md-6">
                <div className="card p-5 shadow-sm border-0 rounded-4 h-100">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <input
                        type="text"
                        name="username"
                        value={contact.username}
                        onChange={handleChange}
                        placeholder="Your Name"
                        className="form-control rounded-3 border-1 shadow-sm"
                        style={{ padding: "12px" }}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="email"
                        name="email"
                        value={contact.email}
                        onChange={handleChange}
                        placeholder="Your Email"
                        className="form-control rounded-3 border-1 shadow-sm"
                        style={{ padding: "12px" }}
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <textarea
                        name="message"
                        value={contact.message}
                        onChange={handleChange}
                        placeholder="Your Message"
                        rows="5"
                        className="form-control rounded-3 border-1 shadow-sm"
                        style={{ padding: "12px" }}
                        required
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-teal w-100 fw-bold"
                      style={{ padding: "12px", fontSize: "16px" }}
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer className="mt-0"/>
    </div>
  );
}
