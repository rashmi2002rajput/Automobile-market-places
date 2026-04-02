// import React, { useState, useRef, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import AuthPage from "./Authpage";

// const Home = () => {
//   const navigate = useNavigate();

//   const [user, setUser] = useState(null);
//   const [search, setSearch] = useState("");
//   const [showAuth, setShowAuth] = useState(false);
//   const [authRole, setAuthRole] = useState("common");
//   const [startOnRegister, setStartOnRegister] = useState(false);
//   const [showProfileMenu, setShowProfileMenu] = useState(false);
//   const [showLogoutModal, setShowLogoutModal] = useState(false);
//   const [animKey, setAnimKey] = useState(0);

//   const howItWorksRef = useRef(null);

//   useEffect(() => {
//     const savedUser = localStorage.getItem("user");
//     if (savedUser) {
//       setUser(JSON.parse(savedUser));
//     }
//   }, []);

//   const categories = [
//     "Engine Parts",
//     "Brake System",
//     "Electrical",
//     "Suspension",
//     "Body Parts",
//     "Accessories",
//   ];

//   const steps = [
//     { title: "Search Parts", desc: "Find parts easily", icon: "🔍" },
//     { title: "Compare Dealers", desc: "Best offers", icon: "🤝" },
//     { title: "Buy or Request", desc: "Fast delivery", icon: "🚚" },
//   ];

//   const fadeUp = {
//     hidden: { opacity: 0, y: 40 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.6, ease: "easeOut" },
//     },
//   };

//   const stagger = {
//     visible: { transition: { staggerChildren: 0.15 } },
//   };

//   const openLogin = () => {
//     setAuthRole("common");
//     setStartOnRegister(false);
//     setShowAuth(true);
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     setUser(null);
//     setShowLogoutModal(false);
//     setShowProfileMenu(false);
//     setAnimKey((p) => p + 1);
//     navigate("/");
//   };

//   const handleSearch = () => {
//     if (user?.role === "dealer") {
//       navigate("/dealer/products", { state: { searchTerm: search } });
//     } else {
//       navigate("/products", { state: { searchTerm: search } });
//     }
//   };

//   const handleCategoryClick = (category) => {
//     if (user?.role === "dealer") {
//       navigate("/dealer/products", { state: { category } });
//     } else {
//       navigate("/products", { state: { category } });
//     }
//   };

//   const styles = {
//     page: {
//       fontFamily: "Segoe UI, sans-serif",
//       background: "#f5f7fa",
//       minHeight: "100vh",
//     },

//     navbar: {
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//       padding: "14px 40px",
//       background: "#020617",
//       color: "#fff",
//       position: "sticky",
//       top: 0,
//       zIndex: 100,
//       gap: 20,
//       flexWrap: "wrap",
//     },

//     brand: {
//       color: "#38bdf8",
//       cursor: "pointer",
//       margin: 0,
//       fontWeight: 700,
//       fontSize: "2rem",
//       whiteSpace: "nowrap",
//     },

//     navCenter: {
//       display: "flex",
//       alignItems: "center",
//       gap: 14,
//       flexWrap: "wrap",
//       justifyContent: "center",
//       flex: 1,
//     },

//     navRight: {
//       display: "flex",
//       alignItems: "center",
//       gap: 12,
//       position: "relative",
//       flexWrap: "wrap",
//     },

//     navLink: {
//       background: "transparent",
//       color: "#e2e8f0",
//       border: "none",
//       cursor: "pointer",
//       fontSize: "15px",
//       fontWeight: 500,
//       padding: "8px 10px",
//     },

//     navBtn: {
//       padding: "10px 22px",
//       borderRadius: 25,
//       border: "none",
//       cursor: "pointer",
//       background: "#38bdf8",
//       fontWeight: 600,
//       color: "#000",
//     },

//     section: { padding: "70px 40px" },

//     grid: {
//       display: "grid",
//       gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
//       gap: 25,
//     },

//     card: {
//       background: "#fff",
//       padding: 25,
//       borderRadius: 18,
//       textAlign: "center",
//       boxShadow: "0 10px 25px rgba(0,0,0,.08)",
//       cursor: "pointer",
//     },

//     footer: {
//       background: "#020617",
//       color: "#cbd5f5",
//       padding: 35,
//       textAlign: "center",
//       marginTop: 60,
//     },

//     modalBackdrop: {
//       position: "fixed",
//       inset: 0,
//       background: "rgba(0,0,0,.6)",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       zIndex: 1000,
//     },

//     modal: {
//       background: "#fff",
//       padding: 30,
//       borderRadius: 14,
//       textAlign: "center",
//       width: 320,
//     },

//     dealerBox: {
//       background: "linear-gradient(135deg,#4f46e5,#6366f1)",
//       color: "#fff",
//       padding: "70px 40px",
//       textAlign: "center",
//       borderRadius: 25,
//       margin: "40px",
//     },

//     profileWrap: {
//       position: "relative",
//     },

//     profileMenu: {
//       position: "absolute",
//       top: "52px",
//       right: 0,
//       background: "#fff",
//       color: "#111",
//       minWidth: "190px",
//       borderRadius: 12,
//       boxShadow: "0 10px 25px rgba(0,0,0,.15)",
//       overflow: "hidden",
//       zIndex: 999,
//     },

//     profileMenuItem: {
//       padding: "12px 16px",
//       cursor: "pointer",
//       borderBottom: "1px solid #eee",
//       background: "#fff",
//       fontSize: "14px",
//     },
//   };

//   const guestLinks = [
//     { label: "Home", path: "/" },
//     { label: "Products", path: "/products" },
//     { label: "About", path: "/about" },
//     { label: "Contact", path: "/contact" },
//   ];

//   const userLinks = [
//     { label: "Home", path: "/" },
//     { label: "Products", path: "/products" },
//     { label: "My Orders", path: "/orders" },
//     { label: "Wishlist", path: "/wishlist" },
//   ];

//   const dealerLinks = [
//     { label: "Home", path: "/" },
//     { label: "Products", path: "/dealer/products" },
//     { label: "Requests", path: "/dealer/requests" },
//     { label: "Dashboard", path: "/dealer/dashboard" },
//   ];

//   const currentLinks =
//     user?.role === "dealer"
//       ? dealerLinks
//       : user?.role === "user"
//       ? userLinks
//       : guestLinks;

//   return (
//     <div style={styles.page}>
//       <motion.nav
//         style={styles.navbar}
//         initial={{ y: -80, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//       >
//         <h2 style={styles.brand} onClick={() => navigate("/")}>
//           CarMarketPlace
//         </h2>

//         <div style={styles.navCenter}>
//           {currentLinks.map((item) => (
//             <button
//               key={item.label}
//               style={styles.navLink}
//               onClick={() => navigate(item.path)}
//             >
//               {item.label}
//             </button>
//           ))}
//         </div>

//         {!user ? (
//           <div style={styles.navRight}>
//             <button style={styles.navBtn} onClick={openLogin}>
//               Login / Register
//             </button>
//           </div>
//         ) : (
//           <div style={styles.navRight}>
//             <div style={styles.profileWrap}>
//               <button
//                 style={styles.navBtn}
//                 onClick={() => setShowProfileMenu((prev) => !prev)}
//               >
//                 My Account
//               </button>

//               <AnimatePresence>
//                 {showProfileMenu && (
//                   <motion.div
//                     style={styles.profileMenu}
//                     initial={{ opacity: 0, y: 8 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: 8 }}
//                   >
//                     {user?.role === "dealer" ? (
//                       <>
//                         <div
//                           style={styles.profileMenuItem}
//                           onClick={() => {
//                             setShowProfileMenu(false);
//                             navigate("/dealer/profile");
//                           }}
//                         >
//                           Dealer Profile
//                         </div>

//                         <div
//                           style={styles.profileMenuItem}
//                           onClick={() => {
//                             setShowProfileMenu(false);
//                             navigate("/dealer/dashboard");
//                           }}
//                         >
//                           Dashboard
//                         </div>

//                         <div
//                           style={styles.profileMenuItem}
//                           onClick={() => {
//                             setShowProfileMenu(false);
//                             navigate("/dealer/requests");
//                           }}
//                         >
//                           Requests
//                         </div>
//                       </>
//                     ) : (
//                       <>
//                         <div
//                           style={styles.profileMenuItem}
//                           onClick={() => {
//                             setShowProfileMenu(false);
//                             navigate("/profile");
//                           }}
//                         >
//                           Profile
//                         </div>

//                         <div
//                           style={styles.profileMenuItem}
//                           onClick={() => {
//                             setShowProfileMenu(false);
//                             navigate("/orders");
//                           }}
//                         >
//                           My Orders
//                         </div>

//                         <div
//                           style={styles.profileMenuItem}
//                           onClick={() => {
//                             setShowProfileMenu(false);
//                             navigate("/wishlist");
//                           }}
//                         >
//                           Wishlist
//                         </div>
//                       </>
//                     )}

//                     <div
//                       style={{ ...styles.profileMenuItem, borderBottom: "none" }}
//                       onClick={() => {
//                         setShowProfileMenu(false);
//                         setShowLogoutModal(true);
//                       }}
//                     >
//                       Logout
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           </div>
//         )}
//       </motion.nav>

//       <motion.section
//         key={animKey}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: false }}
//         variants={fadeUp}
//         style={{
//           padding: "120px 20px",
//           textAlign: "center",
//           background: "#020617",
//           color: "#fff",
//         }}
//       >
//         <motion.h1 variants={fadeUp}>
//           Find Genuine Auto Parts Instantly
//         </motion.h1>

//         <motion.p variants={fadeUp}>
//           Search, compare and buy auto parts
//         </motion.p>

//         <motion.input
//           variants={fadeUp}
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           placeholder="Search part, vehicle or OEM"
//           style={{
//             padding: 14,
//             width: 340,
//             borderRadius: 30,
//             border: "none",
//             marginTop: 25,
//             outline: "none",
//           }}
//         />

//         <motion.div
//           variants={fadeUp}
//           style={{
//             marginTop: 25,
//             display: "flex",
//             gap: 15,
//             justifyContent: "center",
//             flexWrap: "wrap",
//           }}
//         >
//           <button style={styles.navBtn} onClick={handleSearch}>
//             🔍 Search Parts
//           </button>

//           {!user && (
//             <button
//               style={{
//                 ...styles.navBtn,
//                 background: "transparent",
//                 border: "2px solid #38bdf8",
//                 color: "#38bdf8",
//               }}
//               onClick={openLogin}
//             >
//               Become Dealer
//             </button>
//           )}
//         </motion.div>
//       </motion.section>

//       <motion.section
//         style={styles.section}
//         variants={stagger}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: false }}
//       >
//         <h2 style={{ textAlign: "center" }}>Popular Categories</h2>
//         <div style={styles.grid}>
//           {categories.map((c, i) => (
//             <motion.div
//               key={i}
//               style={styles.card}
//               variants={fadeUp}
//               onClick={() => handleCategoryClick(c)}
//               whileHover={{ y: -6 }}
//             >
//               🚗 <h3>{c}</h3>
//             </motion.div>
//           ))}
//         </div>
//       </motion.section>

//       <motion.section
//         ref={howItWorksRef}
//         style={styles.section}
//         variants={stagger}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: false }}
//       >
//         <h2 style={{ textAlign: "center" }}>How It Works</h2>
//         <div style={styles.grid}>
//           {steps.map((s, i) => (
//             <motion.div key={i} style={styles.card} variants={fadeUp}>
//               <div style={{ fontSize: 30 }}>{s.icon}</div>
//               <h3>{s.title}</h3>
//               <p>{s.desc}</p>
//             </motion.div>
//           ))}
//         </div>
//       </motion.section>

//       <div style={styles.dealerBox}>
//         <h2>Are You an Auto Parts Dealer?</h2>
//         <button style={styles.navBtn} onClick={openLogin}>
//           Join as Dealer
//         </button>
//       </div>

//       <footer style={styles.footer}>
//         © 2025 CarMarketPlace · All rights reserved
//       </footer>

//       <AnimatePresence>
//         {showAuth && (
//           <AuthPage
//             role={authRole}
//             startOnRegister={startOnRegister}
//             onClose={() => {
//               setShowAuth(false);
//               const savedUser = localStorage.getItem("user");
//               if (savedUser) {
//                 const parsedUser = JSON.parse(savedUser);
//                 setUser(parsedUser);

//                 if (parsedUser?.role === "dealer") {
//                   navigate("/dealer/dashboard");
//                 } else {
//                   navigate("/");
//                 }
//               }
//               setAnimKey((p) => p + 1);
//             }}
//           />
//         )}
//       </AnimatePresence>

//       <AnimatePresence>
//         {showLogoutModal && (
//           <motion.div
//             style={styles.modalBackdrop}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <motion.div
//               style={styles.modal}
//               initial={{ scale: 0.8 }}
//               animate={{ scale: 1 }}
//             >
//               <h3>Logout</h3>
//               <p>Are you sure?</p>

//               <button style={styles.navBtn} onClick={handleLogout}>
//                 Yes, Logout
//               </button>

//               <br />
//               <br />

//               <button
//                 style={{
//                   padding: "10px 22px",
//                   borderRadius: 25,
//                   border: "2px solid #020617",
//                   background: "transparent",
//                   cursor: "pointer",
//                 }}
//                 onClick={() => setShowLogoutModal(false)}
//               >
//                 Cancel
//               </button>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default Home;


import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import AuthPage from "./Authpage";

/* ─── Google Fonts ─── */
const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href =
  "https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap";
document.head.appendChild(fontLink);

/* ─── CSS injected once ─── */
const css = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #09090b; }

  :root {
    --brand:   #f97316;
    --brand2:  #fb923c;
    --surface: #111113;
    --card:    #18181b;
    --border:  rgba(255,255,255,0.07);
    --text:    #f4f4f5;
    --muted:   #71717a;
    --font-display: 'Syne', sans-serif;
    --font-body:    'DM Sans', sans-serif;
  }

  .nav-link {
    background: transparent;
    border: none;
    cursor: pointer;
    font-family: var(--font-body);
    font-size: 14px;
    font-weight: 500;
    color: #a1a1aa;
    padding: 8px 14px;
    border-radius: 8px;
    transition: color .2s, background .2s;
  }
  .nav-link:hover { color: #fff; background: rgba(255,255,255,0.06); }

  .btn-primary {
    font-family: var(--font-body);
    font-weight: 600;
    font-size: 14px;
    padding: 11px 24px;
    border-radius: 999px;
    border: none;
    cursor: pointer;
    background: var(--brand);
    color: #fff;
    transition: transform .15s, box-shadow .15s, background .15s;
    white-space: nowrap;
  }
  .btn-primary:hover { background: var(--brand2); box-shadow: 0 0 24px rgba(249,115,22,.4); transform: translateY(-1px); }

  .btn-ghost {
    font-family: var(--font-body);
    font-weight: 600;
    font-size: 14px;
    padding: 10px 24px;
    border-radius: 999px;
    border: 1.5px solid var(--border);
    cursor: pointer;
    background: rgba(255,255,255,0.04);
    color: #e4e4e7;
    transition: border-color .2s, background .2s, transform .15s;
    white-space: nowrap;
  }
  .btn-ghost:hover { border-color: var(--brand); background: rgba(249,115,22,0.07); transform: translateY(-1px); }

  .cat-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 32px 20px;
    text-align: center;
    cursor: pointer;
    transition: border-color .25s, transform .25s, box-shadow .25s;
  }
  .cat-card:hover {
    border-color: var(--brand);
    transform: translateY(-6px);
    box-shadow: 0 20px 40px rgba(249,115,22,.12);
  }

  .step-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 36px 28px;
    position: relative;
    overflow: hidden;
    transition: border-color .25s;
  }
  .step-card::before {
    content: attr(data-num);
    position: absolute;
    top: -10px;
    right: 16px;
    font-family: var(--font-display);
    font-size: 80px;
    font-weight: 800;
    color: rgba(249,115,22,0.06);
    line-height: 1;
    pointer-events: none;
  }
  .step-card:hover { border-color: var(--brand); }

  .pm-item {
    display: block;
    width: 100%;
    text-align: left;
    background: transparent;
    border: none;
    border-bottom: 1px solid var(--border);
    color: #e4e4e7;
    font-family: var(--font-body);
    font-size: 14px;
    padding: 13px 18px;
    cursor: pointer;
    transition: background .15s, color .15s;
  }
  .pm-item:last-child { border-bottom: none; }
  .pm-item:hover { background: rgba(249,115,22,0.1); color: var(--brand); }

  .search-input {
    background: rgba(255,255,255,0.06);
    border: 1.5px solid var(--border);
    border-radius: 999px;
    padding: 14px 24px;
    color: #fff;
    font-family: var(--font-body);
    font-size: 15px;
    outline: none;
    width: min(420px, 90vw);
    transition: border-color .2s, box-shadow .2s;
  }
  .search-input::placeholder { color: var(--muted); }
  .search-input:focus { border-color: var(--brand); box-shadow: 0 0 0 3px rgba(249,115,22,.15); }

  .grid-3 {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
  }

  .tag {
    display: inline-block;
    font-family: var(--font-body);
    font-size: 12px;
    font-weight: 600;
    letter-spacing: .08em;
    text-transform: uppercase;
    color: var(--brand);
    background: rgba(249,115,22,0.12);
    padding: 5px 14px;
    border-radius: 999px;
    margin-bottom: 16px;
  }

  @keyframes pulse-ring {
    0%   { transform: scale(1);   opacity: .6; }
    100% { transform: scale(1.6); opacity: 0;  }
  }

  @media (max-width: 640px) {
    .hero-h1 { font-size: clamp(2rem, 8vw, 3.5rem) !important; }
  }
`;

if (!document.getElementById("cmp-home-style")) {
  const s = document.createElement("style");
  s.id = "cmp-home-style";
  s.textContent = css;
  document.head.appendChild(s);
}

/* ─── Animation variants ─── */
const fadeUp = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};
const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ════════════════════════════════════════════════ */
const Home = () => {
  const navigate = useNavigate();

  const [user,            setUser           ] = useState(null);
  const [search,          setSearch         ] = useState("");
  const [showAuth,        setShowAuth       ] = useState(false);
  const [authRole,        setAuthRole       ] = useState("user");
  const [startOnRegister, setStartOnRegister] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [animKey,         setAnimKey        ] = useState(0);

  const howItWorksRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  /* ── Data ── */
  const categories = [
    { label: "Engine Parts",  icon: "⚙️" },
    { label: "Brake System",  icon: "🛞" },
    { label: "Electrical",    icon: "⚡" },
    { label: "Suspension",    icon: "🔩" },
    { label: "Body Parts",    icon: "🚘" },
    { label: "Accessories",   icon: "🎛️" },
  ];

  const steps = [
    { num: "01", title: "Search Parts",      desc: "Describe what you need — OEM number, part name, or vehicle model.",  icon: "🔍" },
    { num: "02", title: "Compare Dealers",   desc: "Get real-time quotes from verified dealers and pick the best offer.", icon: "🤝" },
    { num: "03", title: "Buy or Request",    desc: "Order instantly or send a custom request for rare parts.",            icon: "🚚" },
  ];

  const stats = [
    { val: "50K+", label: "Parts Listed"    },
    { val: "1.2K", label: "Active Dealers"  },
    { val: "98%",  label: "Satisfaction"    },
    { val: "24h",  label: "Avg Delivery"    },
  ];

  /* ── Helpers ── */
  const openLogin  = () => { setAuthRole("user");   setStartOnRegister(false); setShowAuth(true); };
  const openDealer = () => { setAuthRole("dealer"); setStartOnRegister(true);  setShowAuth(true); };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    setShowLogoutModal(false);
    setShowProfileMenu(false);
    setAnimKey(p => p + 1);
    navigate("/");
  };

  const handleSearch = () => {
    const dest = user?.role === "dealer" ? "/dealer/products" : "/products";
    navigate(dest, { state: { searchTerm: search } });
  };

  const handleCategoryClick = (label) => {
    const dest = user?.role === "dealer" ? "/dealer/products" : "/products";
    navigate(dest, { state: { category: label } });
  };

  /* ── Nav links ── */
  const guestLinks  = [{ label: "Home", path: "/" }, { label: "Products", path: "/products" }, { label: "About", path: "/about" }, { label: "Contact", path: "/contact" }];
  const userLinks   = [{ label: "Home", path: "/" }, { label: "Products", path: "/products" }, { label: "My Orders", path: "/orders" }, { label: "Wishlist", path: "/wishlist" }];
  const dealerLinks = [{ label: "Home", path: "/" }, { label: "Products", path: "/dealer/products" }, { label: "Requests", path: "/dealer/requests" }, { label: "Dashboard", path: "/dealer/dashboard" }];
  const currentLinks = user?.role === "dealer" ? dealerLinks : user?.role === "user" ? userLinks : guestLinks;

  /* ─────────────────────────────── RENDER ─────────────────────────────── */
  return (
    <div style={{ fontFamily: "var(--font-body)", background: "#09090b", minHeight: "100vh", color: "var(--text)" }}>

      {/* ── NAVBAR ── */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 32px", height: 64,
          background: "rgba(9,9,11,0.85)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid var(--border)",
          position: "sticky", top: 0, zIndex: 100,
          gap: 16, flexWrap: "wrap",
        }}
      >
        {/* Brand */}
        <button
          onClick={() => navigate("/")}
          style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", gap: 8 }}
        >
          <span style={{
            width: 32, height: 32, borderRadius: 10,
            background: "var(--brand)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 16, fontWeight: 800,
          }}>C</span>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 18, color: "#fff", letterSpacing: "-.02em" }}>
            CarMarket<span style={{ color: "var(--brand)" }}>Place</span>
          </span>
        </button>

        {/* Center links */}
        <div style={{ display: "flex", alignItems: "center", gap: 2, flex: 1, justifyContent: "center", flexWrap: "wrap" }}>
          {currentLinks.map(item => (
            <button key={item.label} className="nav-link" onClick={() => navigate(item.path)}>
              {item.label}
            </button>
          ))}
        </div>

        {/* Right */}
        {!user ? (
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <button className="btn-ghost" onClick={openDealer}>Dealer Login</button>
            <button className="btn-primary" onClick={openLogin}>Sign In</button>
          </div>
        ) : (
          <div style={{ position: "relative" }}>
            <button className="btn-primary" onClick={() => setShowProfileMenu(p => !p)}>
              {user.name?.split(" ")[0] || "Account"} ▾
            </button>

            <AnimatePresence>
              {showProfileMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: .97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: .97 }}
                  transition={{ duration: .15 }}
                  style={{
                    position: "absolute", top: 50, right: 0,
                    background: "#1c1c1f", border: "1px solid var(--border)",
                    borderRadius: 14, minWidth: 200,
                    boxShadow: "0 24px 48px rgba(0,0,0,.5)",
                    overflow: "hidden", zIndex: 999,
                  }}
                >
                  {user?.role === "dealer" ? (
                    <>
                      <button className="pm-item" onClick={() => { setShowProfileMenu(false); navigate("/dealer/profile"); }}>Dealer Profile</button>
                      <button className="pm-item" onClick={() => { setShowProfileMenu(false); navigate("/dealer/dashboard"); }}>Dashboard</button>
                      <button className="pm-item" onClick={() => { setShowProfileMenu(false); navigate("/dealer/requests"); }}>Requests</button>
                    </>
                  ) : (
                    <>
                      <button className="pm-item" onClick={() => { setShowProfileMenu(false); navigate("/profile"); }}>Profile</button>
                      <button className="pm-item" onClick={() => { setShowProfileMenu(false); navigate("/orders"); }}>My Orders</button>
                      <button className="pm-item" onClick={() => { setShowProfileMenu(false); navigate("/wishlist"); }}>Wishlist</button>
                    </>
                  )}
                  <button className="pm-item" style={{ color: "#f87171" }} onClick={() => { setShowProfileMenu(false); setShowLogoutModal(true); }}>
                    Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </motion.nav>

      {/* ── HERO ── */}
      <motion.section
        key={animKey}
        initial="hidden"
        animate="visible"
        variants={stagger}
        style={{
          minHeight: "88vh",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          textAlign: "center",
          padding: "80px 24px",
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(249,115,22,.12) 0%, transparent 70%)",
          position: "relative", overflow: "hidden",
        }}
      >
        {/* Decorative rings */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
          {[360, 560, 760].map((s, i) => (
            <div key={i} style={{
              position: "absolute",
              top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              width: s, height: s,
              borderRadius: "50%",
              border: "1px solid rgba(249,115,22,0.08)",
            }} />
          ))}
        </div>

        <motion.div variants={fadeUp}>
          <span className="tag">🚗 Auto Parts Marketplace</span>
        </motion.div>

        <motion.h1
          className="hero-h1"
          variants={fadeUp}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.6rem, 6vw, 4.5rem)",
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-.03em",
            maxWidth: 780,
            marginBottom: 20,
          }}
        >
          Find Genuine Auto Parts{" "}
          <span style={{ color: "var(--brand)", display: "inline-block" }}>Instantly</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          style={{ color: "var(--muted)", fontSize: 18, maxWidth: 500, lineHeight: 1.7, marginBottom: 36 }}
        >
          Search, compare prices, and buy from verified dealers — all in one place.
        </motion.p>

        <motion.div variants={fadeUp} style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", justifyContent: "center", marginBottom: 20 }}>
          <input
            className="search-input"
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSearch()}
            placeholder="Search part, vehicle or OEM number…"
          />
          <button className="btn-primary" onClick={handleSearch} style={{ padding: "14px 28px", fontSize: 15 }}>
            Search
          </button>
        </motion.div>

        {!user && (
          <motion.p variants={fadeUp} style={{ color: "var(--muted)", fontSize: 14 }}>
            Are you a dealer?{" "}
            <button onClick={openDealer} style={{ background: "none", border: "none", color: "var(--brand)", cursor: "pointer", fontWeight: 600, fontSize: 14, fontFamily: "var(--font-body)" }}>
              Join for free →
            </button>
          </motion.p>
        )}
      </motion.section>

      {/* ── STATS STRIP ── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={stagger}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: 1,
          background: "var(--border)",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        {stats.map((s, i) => (
          <motion.div key={i} variants={fadeUp} style={{ background: "var(--surface)", padding: "36px 20px", textAlign: "center" }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "2.2rem", fontWeight: 800, color: "var(--brand)", lineHeight: 1 }}>{s.val}</div>
            <div style={{ color: "var(--muted)", fontSize: 13, marginTop: 6 }}>{s.label}</div>
          </motion.div>
        ))}
      </motion.section>

      {/* ── CATEGORIES ── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={stagger}
        style={{ padding: "90px 40px", maxWidth: 1200, margin: "0 auto" }}
      >
        <motion.div variants={fadeUp} style={{ textAlign: "center", marginBottom: 52 }}>
          <span className="tag">Browse</span>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 800, letterSpacing: "-.025em" }}>
            Popular Categories
          </h2>
        </motion.div>

        <div className="grid-3">
          {categories.map((c, i) => (
            <motion.div
              key={i}
              className="cat-card"
              variants={fadeUp}
              onClick={() => handleCategoryClick(c.label)}
            >
              <div style={{ fontSize: 36, marginBottom: 14 }}>{c.icon}</div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, color: "#e4e4e7" }}>{c.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── HOW IT WORKS ── */}
      <motion.section
        ref={howItWorksRef}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={stagger}
        style={{ padding: "90px 40px", background: "var(--surface)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <motion.div variants={fadeUp} style={{ textAlign: "center", marginBottom: 52 }}>
            <span className="tag">Process</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 800, letterSpacing: "-.025em" }}>
              How It Works
            </h2>
          </motion.div>

          <div className="grid-3">
            {steps.map((s, i) => (
              <motion.div key={i} className="step-card" variants={fadeUp} data-num={s.num}>
                <div style={{ fontSize: 32, marginBottom: 18 }}>{s.icon}</div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 17, marginBottom: 10, color: "#f4f4f5" }}>{s.title}</div>
                <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.7 }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── DEALER CTA ── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={fadeUp}
        style={{ padding: "90px 40px" }}
      >
        <div style={{
          maxWidth: 900, margin: "0 auto",
          background: "linear-gradient(135deg, rgba(249,115,22,.15) 0%, rgba(249,115,22,.05) 100%)",
          border: "1px solid rgba(249,115,22,.25)",
          borderRadius: 28, padding: "70px 40px",
          textAlign: "center", position: "relative", overflow: "hidden",
        }}>
          {/* glow */}
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 400, height: 400, background: "radial-gradient(circle, rgba(249,115,22,.15) 0%, transparent 70%)", pointerEvents: "none" }} />

          <span className="tag">For Dealers</span>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 800, letterSpacing: "-.025em", marginBottom: 16 }}>
            Are You an Auto Parts Dealer?
          </h2>
          <p style={{ color: "var(--muted)", fontSize: 16, marginBottom: 32, lineHeight: 1.7 }}>
            List your inventory, receive purchase requests, and grow your business with thousands of buyers.
          </p>
          <button className="btn-primary" onClick={openDealer} style={{ padding: "14px 36px", fontSize: 15 }}>
            Join as Dealer — It's Free
          </button>
        </div>
      </motion.section>

      {/* ── FOOTER ── */}
      <footer style={{
        borderTop: "1px solid var(--border)",
        background: "var(--surface)",
        padding: "40px 40px",
        display: "flex", flexWrap: "wrap", gap: 16,
        alignItems: "center", justifyContent: "space-between",
      }}>
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "#fff", fontSize: 15 }}>
          CarMarket<span style={{ color: "var(--brand)" }}>Place</span>
        </span>
        <span style={{ color: "var(--muted)", fontSize: 13 }}>© 2025 CarMarketPlace · All rights reserved</span>
        <div style={{ display: "flex", gap: 20 }}>
          {["Privacy", "Terms", "Support"].map(l => (
            <button key={l} style={{ background: "none", border: "none", color: "var(--muted)", cursor: "pointer", fontSize: 13, fontFamily: "var(--font-body)" }}>{l}</button>
          ))}
        </div>
      </footer>

      {/* ── AUTH MODAL ── */}
      <AnimatePresence>
        {showAuth && (
          <AuthPage
            role={authRole}
            startOnRegister={startOnRegister}
            onClose={() => {
              setShowAuth(false);
              const saved = localStorage.getItem("user");
              if (saved) {
                const parsed = JSON.parse(saved);
                setUser(parsed);
                navigate(parsed?.role === "dealer" ? "/dealer/dashboard" : "/");
              }
              setAnimKey(p => p + 1);
            }}
          />
        )}
      </AnimatePresence>

      {/* ── LOGOUT MODAL ── */}
      <AnimatePresence>
        {showLogoutModal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setShowLogoutModal(false)}
            style={{
              position: "fixed", inset: 0,
              background: "rgba(0,0,0,.7)", backdropFilter: "blur(6px)",
              display: "flex", alignItems: "center", justifyContent: "center",
              zIndex: 1000,
            }}
          >
            <motion.div
              initial={{ scale: .9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: .9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              style={{
                background: "#1c1c1f", border: "1px solid var(--border)",
                borderRadius: 20, padding: "40px 36px",
                textAlign: "center", width: 320,
                boxShadow: "0 40px 80px rgba(0,0,0,.6)",
              }}
            >
              <div style={{ fontSize: 40, marginBottom: 16 }}>👋</div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Logging out?</h3>
              <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 28 }}>You can always sign back in anytime.</p>
              <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
                <button className="btn-ghost" onClick={() => setShowLogoutModal(false)}>Cancel</button>
                <button className="btn-primary" style={{ background: "#ef4444" }} onClick={handleLogout}>Yes, Logout</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;