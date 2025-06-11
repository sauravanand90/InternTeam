import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import './login.css'

export default function RegisterPage() {
  const [errors, setErrors] = useState({});
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
    setErrors({});
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      alert("Registered successfully! Please login.");
      navigate("/login");
    } catch (err) {
     const msg = err.response?.data?.message || "Registration failed";
     if (msg.includes("email")) {
        setErrors({ email: msg });
      } else if (msg.toLowerCase().includes("password")) {
        setErrors({ password: msg });
      } else {
        setErrors({ general: msg });
      }
    }
  };

  return (
    <div className="page">
    <h1 className="main-title">RESUME ANALYZER</h1>
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
            {errors.name && <p className="error">{errors.name}</p>}
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
            {errors.email && <p className="error">{errors.email}</p>}
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
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
          {errors.general && <p className="error">{errors.general}</p>}
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