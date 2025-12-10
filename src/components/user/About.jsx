import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function AboutUs() {
  return (
    <div style={{ backgroundColor: "var(--beige)" }}>
      <Header />

      {/* Hero Section */}
      <section
        className="heroBanner d-flex align-items-center justify-content-center"
        style={{
          height: "100vb",
          backgroundImage: "url('/assets/images/pro.png')",
          backgroundSize: "cover",
          backgroundPosition: "center 65%",
          textAlign: "center",
          position: "relative",
          marginTop: "30px",
        }}
      >
        <div style={{ position: "relative", zIndex: 2 }}>{/* Optional content */}</div>
      </section>

      {/* Our Story */}
      <section
        className="section-padding text-center py-5"
        style={{ backgroundColor: "var(--sky-blue)" }}
      >
        <div className="container">
          <h2 className="fw-bold mb-4 text-navy">Our Story</h2>
          <p
            className="lead text-muted mb-4 mx-auto"
            style={{ maxWidth: "800px" }}
          >
            Adoptoverse began in 2023 with a simple goal: to make pet care easy,
            enjoyable, and trustworthy. We curate a selection of premium
            products and provide guidance to ensure every pet thrives.
          </p>
          <p className="text-muted mx-auto" style={{ maxWidth: "700px" }}>
            More than a store, Adoptoverse is a community where pet owners find
            reliable resources, connect with fellow enthusiasts, and celebrate
            the joy pets bring to our lives.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section
        className="section-padding text-center py-5"
        style={{ backgroundColor: "var(--beige)" }}
      >
        <div className="container">
          <h2 className="fw-bold mb-5 text-navy">Our Mission & Vision</h2>
          <div className="d-flex justify-content-center gap-4 flex-nowrap">
            <div
              className="feature-card p-5 shadow-lg rounded-4 text-center hover-scale"
              style={{ width: "500px", transition: "0.3s", flexShrink: 0 }}
            >
              <h5 className="fw-bold text-teal mb-3">🐾 Mission</h5>
              <p className="text-muted">
                To provide pet owners with trustworthy products, expert
                guidance, and compassionate support, making pet care simple and
                rewarding.
              </p>
            </div>
            <div
              className="feature-card p-5 shadow-lg rounded-4 text-center hover-scale"
              style={{ width: "500px", transition: "0.3s", flexShrink: 0 }}
            >
              <h5 className="fw-bold text-teal mb-3">🌟 Vision</h5>
              <p className="text-muted">
                To become the most trusted online pet community and store, where
                quality, convenience, and care unite for happier, healthier
                pets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section
        className="section-padding text-center py-5"
        style={{ backgroundColor: "var(--sky-blue)" }}
      >
        <div className="container">
          <h2 className="fw-bold mb-5 text-navy">Why Choose Adoptoverse?</h2>
          <div className="d-flex justify-content-center gap-4 flex-nowrap">
            {[
              {
                icon: "❤️",
                title: "Pet-First Approach",
                text: "Every product and recommendation focuses on your pet’s health and happiness.",
              },
              {
                icon: "🏆",
                title: "Top-Quality Products",
                text: "We partner with trusted brands to ensure premium quality and safety.",
              },
              {
                icon: "🌎",
                title: "Connected Community",
                text: "Join a global network of pet owners sharing tips, stories, and support.",
              },
            ].map((f, i) => (
              <div
                key={i}
                className="feature-card p-4 shadow-lg rounded-4 text-center hover-scale"
                style={{
                  width: "300px",
                  height: "160px",
                  transition: "0.3s",
                  flexShrink: 0,
                }}
              >
                <h5 className="fw-bold text-teal mb-3">
                  {f.icon} {f.title}
                </h5>
                <p className="text-muted">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section
        className="section-padding text-center py-5"
        style={{ backgroundColor: "var(--beige)" }}
      >
        <div className="container">
          <h2 className="fw-bold mb-5 text-navy">Meet Our Team</h2>
          <div className="d-flex justify-content-center gap-4 flex-wrap">
            {[
              {
                name: "Alice Johnson",
                role: "Founder & CEO",
                img: "/assets/images/p1.jpg",
              },
              {
                name: "Mark Smith",
                role: "Operations Lead",
                img: "/assets/images/p2.jpg",
              },
              {
                name: "Sophie Lee",
                role: "Customer Success",
                img: "/assets/images/p3.jpg",
              },
            ].map((member, i) => (
              <div
                key={i}
                className="feature-card p-4 shadow-lg rounded-4 text-center hover-scale"
                style={{
                  width: "220px",
                  height: "220px",
                  transition: "0.3s",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <img
                  src={member.img}
                  alt={member.name}
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    marginBottom: "1rem",
                    objectFit: "cover",
                  }}
                />
                <h5 className="fw-bold text-teal mb-2">{member.name}</h5>
                <p className="text-muted">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        className="section-padding text-center py-5"
        style={{ backgroundColor: "var(--sky-blue)" }}
      >
        <div className="container">
          <h2 className="fw-bold mb-5 text-navy">Customer Testimonials</h2>
          <div className="d-flex justify-content-center gap-4 flex-wrap">
            {[
              {
                name: "Alice W.",
                text: "Shopping with Adoptoverse is smooth and stress-free!",
              },
              {
                name: "John D.",
                text: "Quality products delivered quickly every time.",
              },
              {
                name: "Sophie L.",
                text: "A supportive community for pet lovers everywhere.",
              },
            ].map((t, i) => (
              <div
                key={i}
                className="feature-card p-4 shadow-lg rounded-4 text-center hover-scale"
                style={{ minWidth: "250px", transition: "0.3s" }}
              >
                <p className="text-muted">"{t.text}"</p>
                <h6 className="fw-bold mt-3">{t.name}</h6>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action */}
      <section
        className="cta-section text-center my-5 py-5"
        style={{
          backgroundColor: "var(--teal)",
          borderRadius: "1rem",
          margin: "2rem",
        }}
      >
        <div className="container">
          <h3 className="fw-bold mb-4 text-white">
            Become Part of the Adoptoverse Family!
          </h3>

          {/* ✅ Updated a → Link, UI identical */}
          <Link
            to="/contact"
            className="btn btn-white btn-lg px-5 py-3 shadow-sm"
            style={{
              transition: "0.3s",
              color: "var(--white)",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "var(--navy)";
              e.target.style.color = "var(--white)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "var(--white)";
              e.target.style.color = "var(--teal)";
            }}
          >
            Contact Us
          </Link>
        </div>
      </section>

      <Footer />

      <style>
        {`
          .hover-scale:hover {
            transform: scale(1.05);
            box-shadow: 0 15px 30px rgba(0,0,0,0.2) !important;
          }
        `}
      </style>
    </div>
  );
}
