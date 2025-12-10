import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AdminHeader from "../AdminHeader";
import AdminFooter from "../AdminFooter";
import "../admin.css";

export default function EditAdopt() {
  const { id } = useParams();
  const navi = useNavigate();

  const [petName, setPetName] = useState("");
  const [catId, setCatId] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [desc, setDesc] = useState("");
  const [petPic, setPetPic] = useState("");
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/category")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/adoption/${id}`)
      .then((res) => {
        const data = res.data;
        setPetName(data.pname || "");
        setCatId(data.acat || "");
        setAge(data.age || "");
        setGender(data.gender || "");
        setDesc(data.desc || "");
        setPetPic(data.pic || "");
      })
      .catch((err) => console.error("Error fetching adoption:", err));
  }, [id]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPetPic(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const isValidInput = (str) => str && str.trim().length > 0;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !isValidInput(petName) ||
      !isValidInput(catId) ||
      !isValidInput(age) ||
      !isValidInput(gender) ||
      !isValidInput(desc) ||
      !petPic
    ) {
      setMessage("Please fill all fields properly (no spaces only)");
      return;
    }

    try {
      await axios.put(`http://localhost:5000/adoption/${id}`, {
        pname: petName.trim(),
        acat: catId.trim(),
        age: age.trim(),
        gender: gender.trim(),
        desc: desc.trim(),
        pic: petPic,
      });

      setMessage("Adoption entry updated successfully!");
      setTimeout(() => navi("/showadopt"), 1200);
    } catch (err) {
      console.error("Error updating adoption:", err);
      setMessage("Failed to update adoption entry");
    }
  };

  return (
    <div className="admin-layout">
      <AdminHeader />

      <main className="content" >
        <h2 className="page-title fw-bold" style={{ padding: "10px" }}>Edit Adoption</h2>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-sm rounded p-4"
          style={{ maxWidth: "900px", width: "550px", margin: "auto" }}
        >
          <div className="mb-3">
            <label className="form-label fw-semibold">Pet Name</label>
            <input
              type="text"
              className="form-control"
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
              placeholder="Enter pet name"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Category</label>
            <select
              className="form-control"
              value={catId}
              onChange={(e) => setCatId(e.target.value)}
              required
            >
              <option value="">-- Select Category --</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Age (in years)</label>
            <input
              type="number"
              className="form-control"
              min={0}
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter pet age"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Gender</label>
            <select
              className="form-control"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">-- Select Gender --</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Description</label>
            <textarea
              className="form-control"
              rows="3"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Enter pet description"
              required
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Pet Picture</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          {petPic && (
            <div className="mb-3 text-center">
              <p className="fw-semibold">Preview:</p>
              <img
                src={petPic}
                alt="preview"
                className="img-thumbnail"
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            </div>
          )}

          <div className="form-actions mt-2 mb-0 text-center">
            <button type="submit" className="btn btn-edit me-4">
              Update Adoption
            </button>
            <button
              type="button"
              className="btn btn-add mt-2"
              onClick={() => navi("/showadopt")}
            >
              Cancel
            </button>
          </div>

          {message && (
            <p className="mt-3 text-center fw-semibold">{message}</p>
          )}
        </form>
      </main>

      <AdminFooter />
    </div>
  );
}
