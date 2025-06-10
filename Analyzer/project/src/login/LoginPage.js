import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './login.css'

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);
      localStorage.setItem("token", res.data.token);
      alert(`${res.data.username} Logged in successfully!`);
      navigate("/dashboard"); // or ResumeFilterPage
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="page">
      <div className="log" style={{ padding: "30px" }}>
        <h1>Login</h1>
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
          <button type="submit" className="sub-btn">Login</button>
          <p>Don't have an account?</p>
          <button
            type="button"
            className="log-btn"
            onClick={() => navigate('/')}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}