import React, { useState, useEffect } from "react";
import "../App.css";

const API = "http://localhost:5000/api/auth"; // ✅ FIXED

export default function AuthPage({ onClose, role: defaultRole, startOnRegister }) {
  const [isRegister, setIsRegister] = useState(false);
  const [role, setRole] = useState(null);

  const [form, setForm] = useState({
    name: "",
    shop_name: "",
    phone: "",
    email: "",
    password: "",
    identifier: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (startOnRegister) {
      setIsRegister(true);
      setRole(defaultRole || "dealer");
    } else {
      setIsRegister(false);
      setRole(null);
    }
  }, [startOnRegister, defaultRole]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* 🔐 LOGIN */
  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier: form.identifier,
          password: form.password,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Login successful");
      onClose();
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  /* 📝 REGISTER */
  const handleRegister = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          shop_name: role === "dealer" ? form.shop_name : null,
          phone: form.phone,
          email: form.email,
          password: form.password,
          role,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      alert("Registration successful. Please login.");
      setIsRegister(false);
      setRole(null);
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="container">
        <div className={`card ${isRegister ? "flip" : ""}`}>

          {/* LOGIN */}
          <div className="side front">
            <div className="close-btn" onClick={onClose}>✕</div>
            <h2>Login</h2>

            <input
              name="identifier"
              placeholder="Email or Phone"
              value={form.identifier}
              onChange={handleChange}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />

            {error && <p className="error">{error}</p>}

            <button onClick={handleLogin} disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>

            <p className="switch-text">
              Don’t have an account?{" "}
              <span onClick={() => setIsRegister(true)}>Register</span>
            </p>
          </div>

          {/* REGISTER */}
          <div className="side back">
            <div className="close-btn" onClick={onClose}>✕</div>
            <h2>Register</h2>

            {!role && (
              <div className="role-select">
                <div className="role-card" onClick={() => setRole("user")}>👤 User</div>
                <div className="role-card" onClick={() => setRole("dealer")}>🏪 Dealer</div>
              </div>
            )}

            {role && (
              <>
                <input
                  name="name"
                  placeholder={role === "dealer" ? "Owner Name" : "Full Name"}
                  value={form.name}
                  onChange={handleChange}
                />

                {role === "dealer" && (
                  <input
                    name="shop_name"
                    placeholder="Shop Name"
                    value={form.shop_name}
                    onChange={handleChange}
                  />
                )}

                <input
                  name="phone"
                  placeholder="Mobile Number"
                  value={form.phone}
                  onChange={handleChange}
                />

                <input
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                />

                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                />

                {error && <p className="error">{error}</p>}

                <button onClick={handleRegister} disabled={loading}>
                  {loading ? "Please wait..." : "Register"}
                </button>

                <p className="switch-text">
                  ← <span onClick={() => setRole(null)}>Change Role</span>
                </p>
              </>
            )}

            <p className="switch-text">
              Already have an account?{" "}
              <span onClick={() => setIsRegister(false)}>Login</span>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
