import React, { useEffect, useState } from "react";
import AdminHeader from "../AdminHeader";
import AdminFooter from "../AdminFooter";
import axios from "axios";
import "../admin.css"; // ensure this line is present

export default function ShowContact() {
  const [feedbacks, setFeedbacks] = useState([]);

  const getFeedbacks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/contact");
      setFeedbacks(res.data);
    } catch (err) {
      console.error("Error fetching feedbacks:", err);
    }
  };

  useEffect(() => {
    getFeedbacks();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this feedback?")) return;
    try {
      await axios.delete(`http://localhost:5000/contact/${id}`);
      setFeedbacks((prev) => prev.filter((fb) => fb.id !== id));
    } catch (err) {
      console.error("Error deleting feedback:", err);
    }
  };

  return (
    <div className="admin-layout">
      <AdminHeader />

      <main className="content">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="fw-bolder mt-2">Feedback List</h2>
        </div>

        <div style={{ width: "70rem", margin: "0 auto", marginTop: "20px" }}>
          <div className="card shadow">
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table-custom align-middle">
                  <thead className="table-dark">
                    <tr>
                      <th scope="col">Sr No</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Message</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {feedbacks.length > 0 ? (
                      feedbacks.map((item, index) => (
                        <tr key={item.id}>
                          <td>{index + 1}</td>
                          <td>{item.username}</td>
                          <td>{item.email}</td>
                          <td>{item.message}</td>
                          <td>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => handleDelete(item.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center text-muted">
                          No feedback available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>

      <AdminFooter />
    </div>
  );
}
