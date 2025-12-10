import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";  // ✅ added Link
import axios from "axios";
import AdminHeader from "../AdminHeader";
import AdminFooter from "../AdminFooter";
import "../admin.css";

export default function ShowCat() {
  const navi = useNavigate();
  const [categories, setCategories] = useState([]);
  const url = "http://localhost:5000/category";

  const getData = async () => {
    try {
      const res = await axios.get(url);
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const deleteCategory = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await axios.delete(`${url}/${id}`);
        getData();
      } catch (err) {
        console.error("Error deleting category:", err);
      }
    }
  };

  return (
    <div className="admin-layout">
      <AdminHeader />
      <main className="content">
        <div className="d-flex justify-content-between align-items-center header-row">
          <h2 className="fw-bolder">Category List</h2>

          {/* ✅ replaced <a> with Link */}
          <Link to="/addcat" className="btn-add">
            + Add Category
          </Link>
        </div>

        <div className="table-wrapper">
          <table className="table-custom">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Picture</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.length > 0 ? (
                categories.map((cat, index) => (
                  <tr key={cat.id}>
                    <td>{index + 1}</td>
                    <td>{cat.name}</td>
                    <td>
                      {cat.pic ? (
                        <img
                          src={cat.pic}
                          alt={cat.name}
                          className="cat-img"
                          style={{
                            width: "70px",
                            height: "70px",
                            objectFit: "cover",
                            borderRadius: "8px",
                          }}
                        />
                      ) : (
                        <span className="text-muted">No Image</span>
                      )}
                    </td>
                    <td>
                      <button
                        className="btn-edit me-2"
                        onClick={() => navi(`/editcat/${cat.id}`)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => deleteCategory(cat.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="no-data">
                    No categories found.
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
