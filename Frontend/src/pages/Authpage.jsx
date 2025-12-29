import React, { useState, useEffect } from "react";
import "../App.css";

const API = "http://localhost:5000/api/auth";

export default function AuthPage({ onClose, role: defaultRole, startOnRegister }) {
  const [isRegister, setIsRegister] = useState(false);
  const [role, setRole] = useState(null);

  const [showSuccess, setShowSuccess] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  const [userData, setUserData] = useState(null);

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

  const resetForm = () => {
    setForm({
      name: "",
      shop_name: "",
      phone: "",
      email: "",
      password: "",
      identifier: "",
    });
    setError("");
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  /* ================= LOGIN ================= */
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
      if (!res.ok) throw new Error(data.message || "Login failed");

      localStorage.setItem("user", JSON.stringify(data.user));

      setUserData(data.user);
      setShowWelcome(true);
      resetForm();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ================= REGISTER ================= */
  const handleRegister = async () => {
    setError("");

    if (role === "dealer" && !form.shop_name) {
      setError("Shop name is required for dealer");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        name: form.name,
        phone: form.phone,
        email: form.email,
        password: form.password,
        role,
        ...(role === "dealer" && { shop_name: form.shop_name }),
      };

      const res = await fetch(`${API}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");

      setShowSuccess(true);
      resetForm();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ================= AUTH MODAL ================= */}
      {!showSuccess && !showWelcome && (
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
      )}

      {/* ================= REGISTER SUCCESS MODAL ================= */}
      {showSuccess && (
        <div className="success-backdrop">
          <div className="success-modal">
            <div className="success-icon">✔</div>
            <h2>Registration Successful</h2>
            <p>Thank you for registration</p>

            <button
              onClick={() => {
                setShowSuccess(false);
                setIsRegister(false);
                setRole(null);
              }}
            >
              Go to Login
            </button>
          </div>
        </div>
      )}

      {/* ================= LOGIN WELCOME MODAL ================= */}
      {showWelcome && (
        <div className="success-backdrop">
          <div className="success-modal">
            <div className="success-icon">🎉</div>
            <h2>Welcome {userData?.name}</h2>
            <p>
              You are logged in as <b>{userData?.role.toUpperCase()}</b>
            </p>

            <button
              onClick={() => {
                setShowWelcome(false);
                onClose();
              }}
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </>
  );
}
