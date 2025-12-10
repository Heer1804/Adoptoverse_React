import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminHeader from "../AdminHeader";
import AdminFooter from "../AdminFooter";
import "../admin.css";

export default function AdminAdoptionRequests() {
  const [requests, setRequests] = useState([]);
  const [pets, setPets] = useState([]);
  const [users, setUsers] = useState([]);

  const requestUrl = "http://localhost:5000/adoptionRequests";
  const petUrl = "http://localhost:5000/adoption";
  const userUrl = "http://localhost:5000/user";

  useEffect(() => {
    getAllData();
  }, []);

  const getAllData = async () => {
    try {
      const [reqRes, petRes, userRes] = await Promise.all([
        axios.get(requestUrl),
        axios.get(petUrl),
        axios.get(userUrl),
      ]);
      setRequests(reqRes.data);
      setPets(petRes.data);
      setUsers(userRes.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const getPetName = (petId) => {
    const pet = pets.find((p) => p.id === petId);
    return pet ? pet.pname : "Unknown";
  };

  const getUserName = (userId) => {
    const user = users.find((u) => u.id === userId);
    return user ? user.name : "Unknown";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return !isNaN(date) ? date.toLocaleDateString("en-IN") : "—";
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const selectedRequest = requests.find((r) => r.id === id);
      if (!selectedRequest) return;

      const petId = selectedRequest.petId;

      await axios.patch(`${requestUrl}/${id}`, { status: newStatus });

      if (newStatus === "Approved") {
        await axios.patch(`${petUrl}/${petId}`, { isAdopted: true });
      }

      if (newStatus === "Rejected") {
        await axios.patch(`${petUrl}/${petId}`, { isAdopted: false });
      }

      getAllData();
    } catch (err) {
      console.error("Status update failed:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this request?")) {
      try {
        await axios.delete(`${requestUrl}/${id}`);
        setRequests(requests.filter((r) => r.id !== id));
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }
  };

  return (
    <div className="admin-layout">
      <AdminHeader />

      <div className="content">
        <div className="header-row d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold text-navy mb-0">Adoption Requests</h2>
        </div>

        {requests.length === 0 ? (
          <p className="text-center text-muted">No adoption requests yet.</p>
        ) : (
          <div className="table-wrapper">
            <table className="table-custom">
              <thead>
                <tr>
                  <th style={{ width: "50px" }}>#</th>
                  <th style={{ width: "90px" }}>Pet Name</th>
                  <th style={{ width: "150px" }}>User Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Message</th>
                  <th>Date</th>
                  <th style={{ width: "90px" }}>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {requests.map((req, index) => (
                  <tr key={req.id}>
                    <td>{index + 1}</td>
                    <td>{req.petName || getPetName(req.petId)}</td>
                    <td>{req.userName || getUserName(req.userId)}</td>
                    <td>{req.email || "—"}</td>
                    <td>{req.phone || "—"}</td>
                    <td>{req.address || "—"}</td>
                    <td>{req.message || "—"}</td>
                    <td>{formatDate(req.date)}</td>
                    <td>
                      <span
                        className={`badge px-3 py-2 rounded-pill ${
                          req.status === "Approved"
                            ? "bg-success"
                            : req.status === "Rejected"
                            ? "bg-danger"
                            : "bg-warning text-dark"
                        }`}
                      >
                        {req.status || "Pending"}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex justify-content-center gap-2 flex-wrap">
                        <button
                          className="btn-edit"
                          onClick={() => handleStatusChange(req.id, "Approved")}
                          disabled={req.status === "Approved"}
                        >
                          Approve
                        </button>
                        <button
                          className="btn-view"
                          onClick={() => handleStatusChange(req.id, "Rejected")}
                          disabled={req.status === "Rejected"}
                        >
                          Reject
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => handleDelete(req.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <AdminFooter />
    </div>
  );
}
