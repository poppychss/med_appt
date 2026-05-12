import React, { useState } from "react";
import "./Sign_Up.css";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";

const Sign_Up = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showerr, setShowerr] = useState("");

  const navigate = useNavigate();

  // ✅ Phone validation: exactly 10 digits
  const validatePhone = (phone) => /^[0-9]{10}$/.test(phone);

  const register = async (e) => {
    e.preventDefault();

    // ❌ Validate phone before API call
    if (!validatePhone(phone)) {
      setShowerr("Phone number must be exactly 10 digits.");
      return;
    }

    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        phone,
      }),
    });

    const json = await response.json();

    if (json.authtoken) {
      sessionStorage.setItem("auth-token", json.authtoken);
      sessionStorage.setItem("name", name);
      sessionStorage.setItem("phone", phone);
      sessionStorage.setItem("email", email);

      navigate("/");
      window.location.reload();
    } else {
      if (json.errors) {
        setShowerr(json.errors[0].msg);
      } else {
        setShowerr(json.error || "Registration failed");
      }
    }
  };

  return (
    <div className="container" style={{ marginTop: "5%" }}>
      <div className="signup-grid">
        <div className="signup-text">
          <h1>Sign Up</h1>
        </div>

        <div className="signup-text1" style={{ textAlign: "left" }}>
          Already a member?{" "}
          <span>
            <a href="/login" style={{ color: "#2190FF" }}>
              Login
            </a>
          </span>
        </div>
        <div className="signup-form">
          <form onSubmit={register}>

            {/* Name */}
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
                placeholder="Enter your name"
                required
              />
            </div>

            {/* Email */}
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Phone */}
            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="form-control"
                placeholder="Enter 10-digit phone number"
                required
              />
            </div>

            {/* Password */}
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                placeholder="Enter your password"
                required
              />
            </div>

            {/* Error message */}
            {showerr && (
              <div style={{ color: "red", marginBottom: "10px" }}>
                {showerr}
              </div>
            )}

            {/* Submit button */}
            <div className="btn-group">
              <button type="submit" className="btn btn-primary">
                Sign Up
              </button>
              <button
                type="reset"
                className="btn btn-danger"
                onClick={() => {
                  setName("");
                  setEmail("");
                  setPhone("");
                  setPassword("");
                  setShowerr("");
                }}
              >
                Reset
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Sign_Up;