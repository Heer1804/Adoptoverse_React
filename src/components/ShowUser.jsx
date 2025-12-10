import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminHeader from "./AdminHeader";
import AdminFooter from "./AdminFooter";
import { useNavigate } from "react-router-dom";

export default function ShowUser() {
  const navi = useNavigate();
  const [users, setUsers] = useState([]);

  const url = "http://localhost:5000/user";

  // Fetch users
  const getData = async () => {
    try {
      const res = await axios.get(url);
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Delete user
  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`${url}/${id}`);
        getData();
      } catch (err) {
        console.error("Error deleting user:", err);
      }
    }
  };

  return (
    <div className="admin-layout">
      <AdminHeader />

      <main className="content">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="fw-bold mt-1">User List</h2>
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
                      <th scope="col">Mobile No</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length > 0 ? (
                      users.map((user, index) => (
                        <tr key={user.id}>
                          <td>{index + 1}</td>
                          <td>{user.username}</td>
                          <td>{user.email}</td>
                          <td>{user.mobileno}</td>
                          <td>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => deleteUser(user.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center text-muted">
                          No users available
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
