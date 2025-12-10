import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminHeader from "../AdminHeader";
import AdminFooter from "../AdminFooter";
import { useNavigate } from "react-router-dom";
import "../admin.css";

export default function AddAdopt() {
  const navi = useNavigate();

  const [petName, setPetName] = useState("");
  const [catId, setCatId] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [desc, setDesc] = useState("");
  const [petPic, setPetPic] = useState("");
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/category")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPetPic(reader.result);
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
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
      setMessage("Please fill all fields properly (no empty spaces)");
      return;
    }

    try {
      await axios.post("http://localhost:5000/adoption", {
        pname: petName.trim(),
        acat: catId.trim(),
        age: age.trim(),
        gender: gender.trim(),
        desc: desc.trim(),
        pic: petPic,
      });

      setMessage("Adoption entry added successfully!");
      setPetName("");
      setCatId("");
      setAge("");
      setGender("");
      setDesc("");
      setPetPic("");
      setPreview(null);

      setTimeout(() => navi("/showadopt"), 1000);
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong while adding the record");
    }
  };

  return (
    <div className="admin-layout d-flex flex-column min-vh-100">
      <AdminHeader />
      <main className="content flex-grow-1 d-flex align-items-center justify-content-center py-4">
        <div
          className="form-box"
          style={{
            background: "#fff",
            borderRadius: "16px",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
            padding: "30px 40px",
            width: "100%",
            maxWidth: "700px",
            marginTop:"34px"
          }}
        >
          <h2 className="text-center text-navy fw-bolder mb-4">Add Adoption</h2>
          <form onSubmit={handleSubmit}>

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
                  <option key={cat.id || cat._id} value={cat.id || cat._id}>
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
                placeholder="Enter age in years"
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
                required
              />
            </div>

            {preview && (
              <div className="text-center mb-3">
                <p className="text-muted fw-semibold mb-2">Preview</p>
                <img
                  src={preview}
                  alt="preview"
                  className="img-thumbnail"
                  style={{
                    maxWidth: "200px",
                    borderRadius: "12px",
                    boxShadow: "0 0 6px rgba(0,0,0,0.15)",
                  }}
                />
              </div>
            )}

            <div className="form-actions mt-3 mb-0 text-center">
              <button type="submit" className="btn btn-edit me-3 py-2">
                Add Adoption
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
              <p className="text-center mt-3 fw-semibold text-muted">{message}</p>
            )}
          </form>
        </div>
      </main>
      <AdminFooter />
    </div>
  );
}
