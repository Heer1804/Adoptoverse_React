import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Home() {
  return (
    <div style={{ backgroundColor: "var(--beige)" }}>
      <Header />

      {/* Hero Banner */}
      <section
        className="hero-banner d-flex align-items-center justify-content-center"
        style={{
          height: "100vh",
          backgroundImage: "url('/assets/images/banner2.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 65%",
          position: "relative",
          textAlign: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(47,65,86,0.6)",
          }}
        ></div>

        <div style={{ position: "relative", zIndex: 2, maxWidth: "900px", padding: "0 20px" }}>
          <h1
            className="display-4 fw-bold mb-4"
            style={{ color: "var(--white)", textShadow: "2px 2px 8px rgba(0,0,0,0.7)" }}
          >
            Discover Premium Pet Products
          </h1>
          <p
            className="lead mb-5"
            style={{ color: "var(--white)", textShadow: "1px 1px 6px rgba(0,0,0,0.5)" }}
          >
            From nutritious food to fun toys and comfy accessories, everything your furry friend needs is here.
          </p>
          <div className="d-flex justify-content-center flex-wrap gap-3">
            <Link
              to="/userproduct"
              className="btn btn-teal btn-lg px-4 py-3 fw-bolder fs-5 shadow-sm"
              style={{ transition: "0.3s" }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "var(--navy)")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "var(--teal)")}
            >
              Shop Products
            </Link>
            <Link
              to="/contact"
              className="btn btn-outline-light btn-lg px-5 py-3 fw-bold shadow-sm"
              style={{ transition: "0.3s" }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "var(--sky-blue)")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding" style={{ backgroundColor: "var(--sky-blue)" }}>
        <div className="container text-center">
          <h2 className="fw-bold mb-4 text-navy">Our Mission & Vision</h2>
          <div className="d-flex justify-content-center gap-4 flex-wrap">
            <div className="feature-card p-4 shadow-sm rounded text-center" style={{ minWidth: "300px" }}>
              <h5 className="fw-bold text-teal mb-3">🐾 Mission</h5>
              <p className="text-muted">
                Deliver high-quality pet products with exceptional service to ensure pets and owners are happy.
              </p>
            </div>
            <div className="feature-card p-4 shadow-sm rounded text-center" style={{ minWidth: "300px" }}>
              <h5 className="fw-bold text-teal mb-3">🌟 Vision</h5>
              <p className="text-muted">
                Become the most trusted online pet store globally, where quality and care meet convenience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features / Why Choose Us */}
      <section className="section-padding" style={{ backgroundColor: "var(--teal)" }}>
        <div className="container text-center text-light">
          <h2 className="fw-bold mb-4">Why Choose Our Store?</h2>
          <p className="mb-5 lead">
            We provide a wide range of pet products, outstanding customer support, and fast delivery to make pets happy.
          </p>
          <div
            className="d-flex justify-content-center gap-4 flex-wrap"
            style={{ overflowX: "auto", padding: "1rem 0" }}
          >
            {[
              { icon: "🛒", title: "Wide Selection", text: "Hundreds of products from toys to food." },
              { icon: "💰", title: "Affordable Prices", text: "Quality products that fit every budget." },
              { icon: "🚚", title: "Fast Delivery", text: "Reliable shipping to your doorstep." },
              { icon: "⭐", title: "Top Brands", text: "We partner with trusted pet brands." },
            ].map((f, i) => (
              <div
                key={i}
                className="feature-card p-4 shadow-sm rounded bg-white text-center"
                style={{ minWidth: "250px", flex: "0 0 auto", cursor: "pointer", transition: "0.3s" }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
              >
                <h5 className="fw-bold text-teal mb-3">{f.icon} {f.title}</h5>
                <p className="text-muted">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding text-center" style={{ backgroundColor: "var(--beige)" }}>
        <div className="container">
          <h2 className="fw-bold mb-4 text-navy">What Our Customers Say</h2>
          <div className="d-flex justify-content-center gap-4 flex-wrap">
            {[
              { name: "Alice W.", text: "Amazing products! My dog loves them." },
              { name: "John D.", text: "Fast delivery and great service!" },
              { name: "Sophie L.", text: "High-quality toys at affordable prices." },
            ].map((t, i) => (
              <div key={i} className="feature-card p-4 shadow-sm rounded text-center" style={{ minWidth: "250px" }}>
                <p className="text-muted">"{t.text}"</p>
                <h6 className="fw-bold mt-3">{t.name}</h6>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="cta-section text-center"
        style={{
          padding: "4rem 0",
          backgroundColor: "var(--sky-blue)",
          borderRadius: "1rem",
          margin: "2rem",
        }}
      >
        <div className="container">
          <h3 className="fw-bold mb-4 text-navy">Ready to spoil your furry friend?</h3>
          <Link
            to="/userproduct"
            className="btn btn-teal btn-lg px-5 py-3 shadow-sm"
            style={{ transition: "0.3s" }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "var(--navy)")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "var(--teal)")}
          >
            Shop Now
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
