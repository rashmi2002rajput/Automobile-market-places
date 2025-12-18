import React, { useState, useRef, useEffect } from "react";
import AuthPage from "./Authpage";

const Home = () => {
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");
  const [showAuth, setShowAuth] = useState(false);
  const [authRole, setAuthRole] = useState("user");
  const [startOnRegister, setStartOnRegister] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const howItWorksRef = useRef(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const categories = [
    "Engine Parts",
    "Brake System",
    "Electrical",
    "Suspension",
    "Body Parts",
    "Accessories",
  ];

  const steps = [
    { title: "Search Parts", desc: "Find parts easily", icon: "🔍" },
    { title: "Compare Dealers", desc: "Best offers", icon: "🤝" },
    { title: "Buy or Request", desc: "Fast delivery", icon: "🚚" },
  ];

  const openLogin = () => {
    setAuthRole("user");
    setStartOnRegister(false);
    setShowAuth(true);
  };

  const openDealer = () => {
    setAuthRole("dealer");
    setStartOnRegister(true);
    setShowAuth(true);
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    setShowLogoutModal(false);
    setShowProfileMenu(false);
  };

  const scrollToHowItWorks = () => {
    howItWorksRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const hoverUp = {
    transform: "translateY(-6px)",
    boxShadow: "0 18px 40px rgba(0,0,0,0.15)",
  };

  const dropdownBg = "#0d0f7cff";

  const styles = {
    page: { fontFamily: "Segoe UI", background: "#f5f7fa" },

    navbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "14px 40px",
      background: "#020617",
      color: "#fff",
      position: "sticky",
      top: 0,
      zIndex: 100,
    },

    navRight: { display: "flex", alignItems: "center", gap: 18 },

    navBtn: {
      padding: "8px 18px",
      borderRadius: 20,
      border: "none",
      cursor: "pointer",
      background: "#38bdf8",
      fontWeight: 600,
      transition: "all .3s",
    },

    avatar: {
      width: 38,
      height: 38,
      borderRadius: "50%",
      background: "#38bdf8",
      color: "#020617",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 700,
      cursor: "pointer",
    },

    dropdown: {
      position: "absolute",
      right: 0,
      top: 45,
      background: dropdownBg,
      borderRadius: 10,
      boxShadow: "0 10px 30px rgba(0,0,0,.2)",
      overflow: "hidden",
      minWidth: 160,
    },

    dropItem: {
      padding: "12px 15px",
      cursor: "pointer",
      color: "#fff",
      background: dropdownBg,
      transition: "all .2s",
    },

    section: { padding: "70px 40px" },

    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
      gap: 25,
    },

    card: {
      background: "#fff",
      padding: 25,
      borderRadius: 18,
      textAlign: "center",
      boxShadow: "0 10px 25px rgba(0,0,0,.08)",
      cursor: "pointer",
      transition: "all .3s",
    },

    dealerBox: {
      background: "linear-gradient(135deg,#4f46e5,#6366f1)",
      color: "#fff",
      padding: "70px 40px",
      textAlign: "center",
      borderRadius: 25,
      margin: "40px",
    },

    footer: {
      background: "#020617",
      color: "#cbd5f5",
      padding: 30,
      textAlign: "center",
    },

    modalBackdrop: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,.6)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 200,
    },

    modal: {
      background: "#fff",
      padding: 30,
      borderRadius: 14,
      textAlign: "center",
      width: 300,
    },
  };

  return (
    <div style={styles.page}>
      {/* NAVBAR */}
      <nav style={styles.navbar}>
        <h2 style={{ color: "#38bdf8" }}>CarMarketPlace</h2>

        <div style={styles.navRight}>
          <button
            onClick={scrollToHowItWorks}
            style={{ background: "none", border: "none", color: "#cbd5f5", cursor: "pointer" }}
          >
            How it works
          </button>

          {!user ? (
            <button style={styles.navBtn} onClick={openLogin}>
              Login / Register
            </button>
          ) : (
            <div style={{ position: "relative" }}>
              <div
                style={styles.avatar}
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                {user.name?.charAt(0).toUpperCase()}
              </div>

              {showProfileMenu && (
                <div style={styles.dropdown}>
                  <div
                    style={styles.dropItem}
                    onMouseEnter={(e) => (e.target.style.background = "#38bdf8")}
                    onMouseLeave={(e) => (e.target.style.background = dropdownBg)}
                  >
                    ✏️ Edit Profile
                  </div>

                  <div
                    style={styles.dropItem}
                    onClick={() => setShowLogoutModal(true)}
                    onMouseEnter={(e) => (e.target.style.background = "#ef4444")}
                    onMouseLeave={(e) => (e.target.style.background = dropdownBg)}
                  >
                    🚪 Logout
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* HERO */}
      <section style={{ padding: "110px 20px", textAlign: "center", background: "#020617", color: "#fff" }}>
        <h1>Find Genuine Auto Parts Instantly</h1>
        <p>Search, compare and buy auto parts</p>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search part, vehicle or OEM"
          style={{ padding: 14, width: 320, borderRadius: 30, border: "none", marginTop: 20 }}
        />

        <div style={{ marginTop: 20, display: "flex", gap: 14, justifyContent: "center" }}>
          <button style={styles.navBtn}>Search Parts</button>
          <button
            style={{ ...styles.navBtn, background: "transparent", border: "1px solid #38bdf8", color: "#38bdf8" }}
            onClick={openDealer}
          >
            Become Dealer
          </button>
        </div>
      </section>

      {/* CATEGORIES */}
      <section style={styles.section}>
        <h2 style={{ textAlign: "center" }}>Popular Categories</h2>
        <div style={styles.grid}>
          {categories.map((c, i) => (
            <div
              key={i}
              style={styles.card}
              onMouseEnter={(e) => Object.assign(e.currentTarget.style, hoverUp)}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = styles.card.boxShadow;
              }}
            >
              🚗 <h3>{c}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={styles.section} ref={howItWorksRef}>
        <h2 style={{ textAlign: "center" }}>How It Works</h2>
        <div style={styles.grid}>
          {steps.map((s, i) => (
            <div
              key={i}
              style={styles.card}
              onMouseEnter={(e) => Object.assign(e.currentTarget.style, hoverUp)}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = styles.card.boxShadow;
              }}
            >
              <div style={{ fontSize: 30 }}>{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DEALER CTA */}
      <div style={styles.dealerBox}>
        <h2>Are You an Auto Parts Dealer?</h2>
        <button style={styles.navBtn} onClick={openDealer}>
          Join as Dealer
        </button>
      </div>

      <footer style={styles.footer}>
        © 2025 CarMarketPlace · All rights reserved
      </footer>

      {showAuth && (
        <AuthPage
          role={authRole}
          startOnRegister={startOnRegister}
          onClose={() => {
            setShowAuth(false);
            const savedUser = localStorage.getItem("user");
            if (savedUser) setUser(JSON.parse(savedUser));
          }}
        />
      )}

      {showLogoutModal && (
        <div style={styles.modalBackdrop}>
          <div style={styles.modal}>
            <h3>Logout</h3>
            <p>Are you sure?</p>
            <button style={styles.navBtn} onClick={handleLogout}>
              Yes, Logout
            </button>
            <br /><br />
            <button onClick={() => setShowLogoutModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
