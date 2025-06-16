import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './login.css'

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setErrors({
      ...errors,
      [e.target.name]: ""
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);
      localStorage.setItem("token", res.data.token);
     // alert(`${res.data.username} Logged in successfully!`);
      navigate("/dashboard"); // or ResumeFilterPage
    } catch (err) {
      const errorMsg = err.response?.data?.message;
      if (errorMsg?.toLowerCase().includes("password")) {
        setErrors({ password: "Incorrect password" });
      } else if (errorMsg?.toLowerCase().includes("invalid email")) {
        setErrors({ email: "Invalid email format" });
      } else {
        setErrors({ general: errorMsg || "Login failed" });
      }
    } finally {
    setLoading(false);
    }
  };

  return (
    <div className="page">
    <h1 className="main-title">RESUME ANALYZER</h1>
      <div className="log" style={{ padding: "30px" }}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            {/* <label><strong>Email</strong></label> */}
            <input
              type="email"
              name="email"
              placeholder="Email"
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
          <button type="submit" className="sub-btn" disabled={loading}>
            Login
            {loading && <span className="spinner"></span>}  
          </button>
          <p>Don't have an account?  <a href="/">Register</a></p>
          {/* <button
            type="button"
            className="log-btn"
            onClick={() => navigate('/')}
          >
            Register
          </button> */}
          
        </form>
      </div>
    </div>
  );
}