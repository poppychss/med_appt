import React, { useState } from "react";
import "./Login.css";
import { API_URL } from "../config";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const json = await response.json();

    if (json.authtoken) {
      // ✅ SAVE AUTH DATA (THIS IS WHAT YOUR NAVBAR NEEDS)
      sessionStorage.setItem("auth-token", json.authtoken);
      sessionStorage.setItem("email", email);

      // redirect home
      window.location.href = "/";
    } else {
      alert(json.error || "Invalid credentials");
    }
  } catch (error) {
    console.error(error);
    alert("Server error");
  }
};

  return (
    <div className="container">
      <div className="login-grid">
        <div className="login-text">
          <h2>Login</h2>
        </div>

        <div className="login-text">
          Are you a new member?{" "}
          <span>
            <a href="/signup" style={{ color: "#2190FF" }}>
              Sign Up Here
            </a>
          </span>
        </div>

        <br />

        <div className="login-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="btn-group">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
              <button type="reset" className="btn btn-danger">
                Reset
              </button>
            </div>

            <br />

            <div className="login-text">Forgot Password?</div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;