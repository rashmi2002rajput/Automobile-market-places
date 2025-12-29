import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AuthPage from "./Authpage";

const Home = () => {
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");
  const [showAuth, setShowAuth] = useState(false);
  const [authRole, setAuthRole] = useState("user");
  const [startOnRegister, setStartOnRegister] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [animKey, setAnimKey] = useState(0);

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

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.15 } },
  };

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
    setAnimKey((p) => p + 1);
  };

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

    navBtn: {
      padding: "10px 22px",
      borderRadius: 25,
      border: "none",
      cursor: "pointer",
      background: "#38bdf8",
      fontWeight: 600,
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
    },

    footer: {
      background: "#020617",
      color: "#cbd5f5",
      padding: 35,
      textAlign: "center",
      marginTop: 60,
    },

    modalBackdrop: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,.6)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },

    modal: {
      background: "#fff",
      padding: 30,
      borderRadius: 14,
      textAlign: "center",
      width: 320,
    },
  };

  return (
    <div style={styles.page}>
      {/* NAVBAR */}
      <motion.nav
        style={styles.navbar}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h2 style={{ color: "#38bdf8" }}>CarMarketPlace</h2>

        {!user ? (
          <button style={styles.navBtn} onClick={openLogin}>
            Login / Register
          </button>
        ) : (
          <button style={styles.navBtn} onClick={() => setShowLogoutModal(true)}>
            Logout
          </button>
        )}
      </motion.nav>

      {/* HERO */}
      <motion.section
        key={animKey}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
        variants={fadeUp}
        style={{
          padding: "120px 20px",
          textAlign: "center",
          background: "#020617",
          color: "#fff",
        }}
      >
        <motion.h1 variants={fadeUp}>
          Find Genuine Auto Parts Instantly
        </motion.h1>

        <motion.p variants={fadeUp}>
          Search, compare and buy auto parts
        </motion.p>

        <motion.input
          variants={fadeUp}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search part, vehicle or OEM"
          style={{
            padding: 14,
            width: 340,
            borderRadius: 30,
            border: "none",
            marginTop: 25,
          }}
        />

        <motion.div
          variants={fadeUp}
          style={{ marginTop: 25, display: "flex", gap: 15, justifyContent: "center" }}
        >
          <button style={styles.navBtn}>🔍 Search Parts</button>
          <button
            style={{
              ...styles.navBtn,
              background: "transparent",
              border: "2px solid #38bdf8",
              color: "#38bdf8",
            }}
            onClick={openDealer}
          >
            Become Dealer
          </button>
        </motion.div>
      </motion.section>

      {/* CATEGORIES */}
      <motion.section
        style={styles.section}
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
      >
        <h2 style={{ textAlign: "center" }}>Popular Categories</h2>
        <div style={styles.grid}>
          {categories.map((c, i) => (
            <motion.div key={i} style={styles.card} variants={fadeUp}>
              🚗 <h3>{c}</h3>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* HOW IT WORKS */}
      <motion.section
        ref={howItWorksRef}
        style={styles.section}
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
      >
        <h2 style={{ textAlign: "center" }}>How It Works</h2>
        <div style={styles.grid}>
          {steps.map((s, i) => (
            <motion.div key={i} style={styles.card} variants={fadeUp}>
              <div style={{ fontSize: 30 }}>{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        © 2025 CarMarketPlace · All rights reserved
      </footer>

      {/* AUTH MODAL */}
      <AnimatePresence>
        {showAuth && (
          <AuthPage
            role={authRole}
            startOnRegister={startOnRegister}
            onClose={() => {
              setShowAuth(false);
              const savedUser = localStorage.getItem("user");
              if (savedUser) setUser(JSON.parse(savedUser));
              setAnimKey((p) => p + 1);
            }}
          />
        )}
      </AnimatePresence>

      {/* LOGOUT MODAL */}
      <AnimatePresence>
        {showLogoutModal && (
          <motion.div
            style={styles.modalBackdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              style={styles.modal}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
            >
              <h3>Logout</h3>
              <p>Are you sure?</p>

              <button style={styles.navBtn} onClick={handleLogout}>
                Yes, Logout
              </button>

              <br /><br />

              <button
                style={{
                  padding: "10px 22px",
                  borderRadius: 25,
                  border: "2px solid #020617",
                  background: "transparent",
                }}
                onClick={() => setShowLogoutModal(false)}
              >
                Cancel
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
