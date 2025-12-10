import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminHeader from "../AdminHeader";
import AdminFooter from "../AdminFooter";
import "../admin.css";

export default function ShowAdopt() {
  const navi = useNavigate();
  const [adoptions, setAdoptions] = useState([]);
  const [categories, setCategories] = useState([]);

  const getAdoptions = async () => {
    try {
      const res = await axios.get("http://localhost:5000/adoption");
      setAdoptions(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/category");
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getCategories();
    getAdoptions();
  }, []);

  const deleteAdoption = async (id) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      await axios.delete(`http://localhost:5000/adoption/${id}`);
      getAdoptions();
    }
  };

  const getCategoryName = (id) => {
    const cat = categories.find((c) => c.id === id);
    return cat ? cat.name : id;
  };

  return (
    <div className="admin-layout">
      <AdminHeader />
      <main className="content">
        <div className="d-flex justify-content-between align-items-center header-row">
          <h2 className="page-title fw-bolder">Adoption List</h2>
          <div className="d-flex gap-3 ">
            <button className="btn-add " style={{fontSize:"16px"}} onClick={() => navi("/addadopt")}>
              + Add Adoption
            </button>
            <button
              className=" btn-add"
              style={{fontSize:"16px"}}
              onClick={() => navi("/adminadoptionrequests")}
            >
              View Requests
            </button>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="table-custom">
            <thead>
              <tr>
                <th>#</th>
                <th>Pet Name</th>
                <th>Category</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Picture</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {adoptions.length > 0 ? (
                adoptions.map((a, i) => (
                  <tr key={a.id}>
                    <td>{i + 1}</td>
                    <td className="fixed-name">{a.pname}</td>
                    <td>{getCategoryName(a.acat)}</td>
                    <td>{a.age}</td>
                    <td>{a.gender}</td>
                    <td>
                      {a.pic ? (
                        <img
                          src={a.pic}
                          alt={a.pname}
                          style={{
                            width: "70px",
                            height: "70px",
                            objectFit: "cover",
                            borderRadius: "8px",
                          }}
                        />
                      ) : (
                        "No Image"
                      )}
                    </td>
                    <td>
                      <button
                        className="btn-edit me-2"
                        onClick={() => navi(`/editadopt/${a.id}`)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn-delete mt-2"
                        onClick={() => deleteAdoption(a.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="no-data">
                    No adoption entries found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
      <AdminFooter />
    </div>
  );
}


