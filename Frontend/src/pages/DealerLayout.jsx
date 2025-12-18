import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const DealerLayout = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState("Dashboard");

  const menu = [
    { name: "Dashboard", path: "/dealer/dashboard" },
    { name: "Requests", path: "/dealer/requests" },
    { name: "Products", path: "/dealer/products" },
    { name: "Profile", path: "/dealer/profile" },
  ];

  return (
    <div style={styles.wrapper}>
      <aside style={styles.sidebar}>
        <div>
          <h2 style={styles.logo}>CarDealer</h2>

          <div style={styles.profileBox}>
            <div style={styles.avatar}>🏪</div>
            <h4>Auto World</h4>
            <p>Delhi</p>
          </div>

          {menu.map((item) => (
            <div
              key={item.name}
              onClick={() => {
                setActive(item.name);
                navigate(item.path);
              }}
              style={{
                ...styles.menuItem,
                background:
                  active === item.name ? "#4f46e5" : "transparent",
              }}
            >
              {item.name}
            </div>
          ))}
        </div>

        <button style={styles.logout}>Logout</button>
      </aside>

      <main style={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};

export default DealerLayout;

const styles = {
  wrapper: { display: "flex", minHeight: "100vh", background: "#f1f5f9" },
  sidebar: {
    width: "260px",
    background: "#0f172a",
    color: "#fff",
    padding: "25px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  logo: { marginBottom: "20px" },
  profileBox: { textAlign: "center", marginBottom: "30px" },
  avatar: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    background: "#4f46e5",
    margin: "0 auto 10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "26px",
  },
  menuItem: {
    padding: "12px 16px",
    borderRadius: "12px",
    cursor: "pointer",
    marginBottom: "10px",
  },
  logout: {
    padding: "10px",
    borderRadius: "12px",
    background: "#ef4444",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
  main: { flex: 1, padding: "30px" },
};
