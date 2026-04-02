import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const API = "http://localhost:5000/api/auth";

/* ─── Inject styles once ─── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

  .auth-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.75);
    backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 500;
    padding: 20px;
  }

  .auth-box {
    background: #18181b;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 24px;
    padding: 40px 36px;
    width: 100%;
    max-width: 400px;
    position: relative;
    box-shadow: 0 40px 80px rgba(0,0,0,0.6);
    font-family: 'DM Sans', sans-serif;
  }

  .auth-close {
    position: absolute;
    top: 16px;
    right: 16px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.08);
    color: #a1a1aa;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background .15s, color .15s;
    line-height: 1;
  }
  .auth-close:hover { background: rgba(239,68,68,0.15); color: #f87171; }

  .auth-logo {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 28px;
  }
  .auth-logo-dot {
    width: 30px; height: 30px;
    border-radius: 8px;
    background: #f97316;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: 15px;
    color: #fff;
  }
  .auth-logo-text {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: 16px;
    color: #fff;
  }
  .auth-logo-text span { color: #f97316; }

  .auth-tag {
    display: inline-block;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: .08em;
    text-transform: uppercase;
    color: #f97316;
    background: rgba(249,115,22,0.12);
    padding: 4px 12px;
    border-radius: 999px;
    margin-bottom: 10px;
  }

  .auth-title {
    font-family: 'Syne', sans-serif;
    font-size: 1.6rem;
    font-weight: 800;
    color: #f4f4f5;
    letter-spacing: -.025em;
    margin-bottom: 6px;
  }

  .auth-sub {
    color: #71717a;
    font-size: 14px;
    margin-bottom: 28px;
  }

  .auth-field {
    width: 100%;
    background: rgba(255,255,255,0.05);
    border: 1.5px solid rgba(255,255,255,0.08);
    border-radius: 12px;
    padding: 13px 16px;
    color: #f4f4f5;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    outline: none;
    transition: border-color .2s, box-shadow .2s;
    margin-bottom: 12px;
    box-sizing: border-box;
  }
  .auth-field::placeholder { color: #52525b; }
  .auth-field:focus {
    border-color: #f97316;
    box-shadow: 0 0 0 3px rgba(249,115,22,.12);
  }

  .auth-btn {
    width: 100%;
    padding: 13px;
    border-radius: 12px;
    border: none;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    font-weight: 600;
    font-size: 15px;
    background: #f97316;
    color: #fff;
    margin-top: 4px;
    transition: background .15s, box-shadow .15s, transform .1s;
  }
  .auth-btn:hover:not(:disabled) {
    background: #fb923c;
    box-shadow: 0 0 20px rgba(249,115,22,.35);
    transform: translateY(-1px);
  }
  .auth-btn:disabled { opacity: .5; cursor: not-allowed; }

  .auth-divider {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 20px 0;
    color: #3f3f46;
    font-size: 12px;
  }
  .auth-divider::before,
  .auth-divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(255,255,255,0.07);
  }

  .auth-switch {
    text-align: center;
    color: #71717a;
    font-size: 13px;
    margin-top: 18px;
  }
  .auth-link {
    background: none;
    border: none;
    color: #f97316;
    cursor: pointer;
    font-weight: 600;
    font-size: 13px;
    font-family: 'DM Sans', sans-serif;
    padding: 0;
    transition: color .15s;
  }
  .auth-link:hover { color: #fb923c; text-decoration: underline; }

  .auth-error {
    background: rgba(239,68,68,0.1);
    border: 1px solid rgba(239,68,68,0.25);
    border-radius: 10px;
    color: #f87171;
    font-size: 13px;
    padding: 10px 14px;
    margin-bottom: 14px;
  }

  .role-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-bottom: 20px;
  }
  .role-tile {
    background: rgba(255,255,255,0.04);
    border: 1.5px solid rgba(255,255,255,0.08);
    border-radius: 14px;
    padding: 20px 12px;
    cursor: pointer;
    text-align: center;
    font-family: 'DM Sans', sans-serif;
    color: #a1a1aa;
    transition: border-color .2s, background .2s, color .2s, transform .15s;
  }
  .role-tile:hover {
    border-color: #f97316;
    background: rgba(249,115,22,0.07);
    color: #f4f4f5;
    transform: translateY(-2px);
  }
  .role-tile-icon { font-size: 28px; margin-bottom: 8px; }
  .role-tile-label { font-weight: 600; font-size: 14px; }
  .role-tile-desc  { font-size: 11px; color: #52525b; margin-top: 4px; }

  /* ── success / welcome overlay ── */
  .auth-result-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.8);
    backdrop-filter: blur(10px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 600;
    padding: 20px;
  }
  .auth-result-box {
    background: #18181b;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 24px;
    padding: 48px 36px;
    text-align: center;
    max-width: 360px;
    width: 100%;
    box-shadow: 0 40px 80px rgba(0,0,0,0.6);
    font-family: 'DM Sans', sans-serif;
  }
  .auth-result-icon {
    width: 72px; height: 72px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 32px;
    margin: 0 auto 20px;
  }
  .auth-result-icon.success { background: rgba(34,197,94,0.12); border: 1px solid rgba(34,197,94,0.25); }
  .auth-result-icon.welcome { background: rgba(249,115,22,0.12); border: 1px solid rgba(249,115,22,0.25); }
  .auth-result-title {
    font-family: 'Syne', sans-serif;
    font-size: 1.4rem;
    font-weight: 800;
    color: #f4f4f5;
    margin-bottom: 8px;
    letter-spacing: -.02em;
  }
  .auth-result-sub {
    color: #71717a;
    font-size: 14px;
    line-height: 1.6;
    margin-bottom: 28px;
  }
  .auth-result-sub b { color: #f97316; font-weight: 600; }
`;

if (!document.getElementById("authpage-style")) {
  const s = document.createElement("style");
  s.id = "authpage-style";
  s.textContent = css;
  document.head.appendChild(s);
}

/* ─── Variants ─── */
const backdropV = { hidden: { opacity: 0 }, visible: { opacity: 1 }, exit: { opacity: 0 } };
const boxV      = { hidden: { opacity: 0, scale: .93, y: 16 }, visible: { opacity: 1, scale: 1, y: 0, transition: { duration: .3, ease: "easeOut" } }, exit: { opacity: 0, scale: .93, y: 16, transition: { duration: .2 } } };
const fadeUp    = { hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: .35, ease: "easeOut" } } };
const stagger   = { visible: { transition: { staggerChildren: .07 } } };

/* ════════════════════════════════════════════════ */
export default function AuthPage({ onClose, role: defaultRole, startOnRegister }) {
  const [view,        setView       ] = useState("login");   // "login" | "roleSelect" | "register"
  const [role,        setRole       ] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [userData,    setUserData   ] = useState(null);
  const [loading,     setLoading    ] = useState(false);
  const [error,       setError      ] = useState("");
  const [form,        setForm       ] = useState({ name: "", shop_name: "", phone: "", email: "", password: "", identifier: "" });

  useEffect(() => {
    if (startOnRegister) {
      setRole(defaultRole || "dealer");
      setView("register");
    } else {
      setView("login");
      setRole(null);
    }
  }, [startOnRegister, defaultRole]);

  const resetForm = () => {
    setForm({ name: "", shop_name: "", phone: "", email: "", password: "", identifier: "" });
    setError("");
  };

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleLogin = async () => {
    setLoading(true); setError("");
    try {
      const res  = await fetch(`${API}/login`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ identifier: form.identifier, password: form.password }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");
      localStorage.setItem("user", JSON.stringify(data.user));
      setUserData(data.user);
      resetForm();
      setShowWelcome(true);
    } catch (err) { setError(err.message); }
    finally       { setLoading(false); }
  };

  const handleRegister = async () => {
    setError("");
    if (role === "dealer" && !form.shop_name) { setError("Shop name is required for dealer"); return; }
    setLoading(true);
    try {
      const payload = { name: form.name, phone: form.phone, email: form.email, password: form.password, role, ...(role === "dealer" && { shop_name: form.shop_name }) };
      const res  = await fetch(`${API}/register`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");
      resetForm();
      setShowSuccess(true);
    } catch (err) { setError(err.message); }
    finally       { setLoading(false); }
  };

  /* ── Logo snippet ── */
  const Logo = () => (
    <div className="auth-logo">
      <div className="auth-logo-dot">C</div>
      <span className="auth-logo-text">CarMarket<span>Place</span></span>
    </div>
  );

  /* ── Close button ── */
  const CloseBtn = () => (
    <button className="auth-close" onClick={() => onClose?.()}>✕</button>
  );

  /* ══════ SUCCESS ══════ */
  if (showSuccess) return (
    <motion.div className="auth-result-backdrop" variants={backdropV} initial="hidden" animate="visible" exit="exit">
      <motion.div className="auth-result-box" variants={boxV} initial="hidden" animate="visible">
        <div className="auth-result-icon success">✅</div>
        <div className="auth-result-title">Registration Successful!</div>
        <p className="auth-result-sub">Your account has been created. You can now sign in.</p>
        <button className="auth-btn" onClick={() => { setShowSuccess(false); setView("login"); setRole(null); }}>
          Go to Login →
        </button>
      </motion.div>
    </motion.div>
  );

  /* ══════ WELCOME ══════ */
  if (showWelcome) return (
    <motion.div className="auth-result-backdrop" variants={backdropV} initial="hidden" animate="visible" exit="exit">
      <motion.div className="auth-result-box" variants={boxV} initial="hidden" animate="visible">
        <div className="auth-result-icon welcome">👋</div>
        <div className="auth-result-title">Welcome back, {userData?.name?.split(" ")[0]}!</div>
        <p className="auth-result-sub">Signed in as <b>{userData?.role?.toUpperCase()}</b>. Ready to find some parts?</p>
        <button className="auth-btn" onClick={() => { setShowWelcome(false); onClose?.(); }}>
          Continue →
        </button>
      </motion.div>
    </motion.div>
  );

  /* ══════ MAIN MODAL ══════ */
  return (
    <AnimatePresence>
      <motion.div className="auth-backdrop" variants={backdropV} initial="hidden" animate="visible" exit="exit" onClick={() => onClose?.()}>
        <motion.div className="auth-box" variants={boxV} initial="hidden" animate="visible" exit="exit" onClick={e => e.stopPropagation()}>
          <CloseBtn />

          <AnimatePresence mode="wait">

            {/* ── LOGIN ── */}
            {view === "login" && (
              <motion.div key="login" variants={stagger} initial="hidden" animate="visible" exit={{ opacity: 0, x: -20 }}>
                <motion.div variants={fadeUp}><Logo /></motion.div>
                <motion.div variants={fadeUp}><span className="auth-tag">Welcome back</span></motion.div>
                <motion.h2 className="auth-title" variants={fadeUp}>Sign in to your account</motion.h2>
                <motion.p className="auth-sub"  variants={fadeUp}>Enter your credentials to continue</motion.p>

                <motion.div variants={fadeUp}>
                  {error && <div className="auth-error">⚠️ {error}</div>}

                  <input className="auth-field" name="identifier" placeholder="Email or Phone" value={form.identifier} onChange={handleChange} autoComplete="username" />
                  <input className="auth-field" type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} autoComplete="current-password" />

                  <button className="auth-btn" disabled={loading} onClick={handleLogin}>
                    {loading ? "Signing in…" : "Sign In →"}
                  </button>

                  <div className="auth-switch">
                    Don't have an account?{" "}
                    <button className="auth-link" onClick={() => { setView("roleSelect"); setRole(null); setError(""); }}>
                      Create one
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* ── ROLE SELECT ── */}
            {view === "roleSelect" && (
              <motion.div key="roleSelect" variants={stagger} initial="hidden" animate="visible" exit={{ opacity: 0, x: -20 }}>
                <motion.div variants={fadeUp}><Logo /></motion.div>
                <motion.div variants={fadeUp}><span className="auth-tag">Get started</span></motion.div>
                <motion.h2 className="auth-title" variants={fadeUp}>Create an account</motion.h2>
                <motion.p className="auth-sub"  variants={fadeUp}>Choose how you'd like to join</motion.p>

                <motion.div className="role-grid" variants={stagger}>
                  <motion.button variants={fadeUp} className="role-tile" onClick={() => { setRole("user"); setView("register"); }}>
                    <div className="role-tile-icon">🙋</div>
                    <div className="role-tile-label">Buyer</div>
                    <div className="role-tile-desc">Search & purchase parts</div>
                  </motion.button>
                  <motion.button variants={fadeUp} className="role-tile" onClick={() => { setRole("dealer"); setView("register"); }}>
                    <div className="role-tile-icon">🏪</div>
                    <div className="role-tile-label">Dealer</div>
                    <div className="role-tile-desc">List & sell your inventory</div>
                  </motion.button>
                </motion.div>

                <div className="auth-switch">
                  Already have an account?{" "}
                  <button className="auth-link" onClick={() => { setView("login"); setError(""); }}>Sign in</button>
                </div>
              </motion.div>
            )}

            {/* ── REGISTER ── */}
            {view === "register" && (
              <motion.div key="register" variants={stagger} initial="hidden" animate="visible" exit={{ opacity: 0, x: -20 }}>
                <motion.div variants={fadeUp}><Logo /></motion.div>
                <motion.div variants={fadeUp}>
                  <span className="auth-tag">{role === "dealer" ? "Dealer Registration" : "Create Account"}</span>
                </motion.div>
                <motion.h2 className="auth-title" variants={fadeUp}>
                  {role === "dealer" ? "Join as a Dealer" : "Create your account"}
                </motion.h2>
                <motion.p className="auth-sub" variants={fadeUp}>Fill in the details below to get started</motion.p>

                <motion.div variants={fadeUp}>
                  {error && <div className="auth-error">⚠️ {error}</div>}

                  <input className="auth-field" name="name" placeholder={role === "dealer" ? "Owner Name" : "Full Name"} value={form.name} onChange={handleChange} autoComplete="name" />
                  {role === "dealer" && (
                    <input className="auth-field" name="shop_name" placeholder="Shop Name" value={form.shop_name} onChange={handleChange} />
                  )}
                  <input className="auth-field" name="phone" placeholder="Mobile Number" value={form.phone} onChange={handleChange} autoComplete="tel" />
                  <input className="auth-field" name="email" placeholder="Email Address" value={form.email} onChange={handleChange} autoComplete="email" />
                  <input className="auth-field" type="password" name="password" placeholder="Create Password" value={form.password} onChange={handleChange} autoComplete="new-password" />

                  <button className="auth-btn" disabled={loading} onClick={handleRegister}>
                    {loading ? "Creating account…" : "Create Account →"}
                  </button>

                  <div className="auth-switch" style={{ marginTop: 14 }}>
                    <button className="auth-link" onClick={() => { setView("roleSelect"); setError(""); }}>
                      ← Change role
                    </button>
                    {" · "}
                    <button className="auth-link" onClick={() => { setView("login"); setError(""); }}>
                      Sign in instead
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}

          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}