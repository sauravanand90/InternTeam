import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import './login.css'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    console.log("Navigating to login...");
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      alert("Registered successfully! Please login.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="page">
      <div className="log" style={{ padding: "30px" }}>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            {/* <label><strong>Name</strong></label> */}
            <input
              type="text"
              name="name"
              placeholder="User Name"
              autoComplete="off"
              className="form"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            {/* <label><strong>Email</strong></label> */}
            <input
              type="email"
              name="email"
              placeholder="Email"
              autoComplete="off"
              className="form"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            {/* <label><strong>Password</strong></label> */}
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="form"
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="sub-btn">Register</button>
          <p>Already have an account?</p>
          <button
            type="button"
            className="log-btn"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}