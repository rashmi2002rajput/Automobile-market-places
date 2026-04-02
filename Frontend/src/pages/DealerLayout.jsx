import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

/* ─── Inject styles once ─── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

  .dl-wrapper {
    display: flex;
    min-height: 100vh;
    background: #09090b;
    font-family: 'DM Sans', sans-serif;
  }

  /* ── Sidebar ── */
  .dl-sidebar {
    width: 256px;
    min-width: 256px;
    background: #111113;
    border-right: 1px solid rgba(255,255,255,0.07);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 28px 16px 24px;
    position: sticky;
    top: 0;
    height: 100vh;
    overflow-y: auto;
  }

  /* Brand */
  .dl-brand {
    display: flex;
    align-items: center;
    gap: 9px;
    padding: 0 8px;
    margin-bottom: 28px;
  }
  .dl-brand-dot {
    width: 30px; height: 30px;
    border-radius: 8px;
    background: #f97316;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: 15px;
    color: #fff;
    flex-shrink: 0;
  }
  .dl-brand-text {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: 15px;
    color: #fff;
    letter-spacing: -.02em;
  }
  .dl-brand-text span { color: #f97316; }

  /* Profile box */
  .dl-profile {
    background: rgba(249,115,22,0.07);
    border: 1px solid rgba(249,115,22,0.15);
    border-radius: 16px;
    padding: 18px 14px;
    text-align: center;
    margin-bottom: 24px;
  }
  .dl-avatar {
    width: 52px; height: 52px;
    border-radius: 50%;
    background: rgba(249,115,22,0.15);
    border: 2px solid rgba(249,115,22,0.3);
    margin: 0 auto 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 22px;
  }
  .dl-profile-name {
    font-family: 'Syne', sans-serif;
    font-size: 14px;
    font-weight: 700;
    color: #f4f4f5;
    margin-bottom: 3px;
  }
  .dl-profile-loc {
    font-size: 12px;
    color: #52525b;
  }
  .dl-profile-badge {
    display: inline-block;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: .06em;
    text-transform: uppercase;
    color: #f97316;
    background: rgba(249,115,22,0.12);
    padding: 3px 10px;
    border-radius: 999px;
    margin-top: 8px;
  }

  /* Nav section label */
  .dl-nav-label {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: .1em;
    text-transform: uppercase;
    color: #3f3f46;
    padding: 0 12px;
    margin-bottom: 6px;
  }

  /* Menu item */
  .dl-menu-item {
    display: flex;
    align-items: center;
    gap: 11px;
    width: 100%;
    padding: 11px 12px;
    border-radius: 12px;
    border: none;
    background: transparent;
    color: #71717a;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    margin-bottom: 2px;
    transition: background .15s, color .15s, transform .1s;
    text-align: left;
  }
  .dl-menu-item:hover:not(.active) {
    background: rgba(255,255,255,0.05);
    color: #e4e4e7;
  }
  .dl-menu-item.active {
    background: rgba(249,115,22,0.12);
    color: #f97316;
    font-weight: 600;
  }
  .dl-menu-icon {
    width: 30px; height: 30px;
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    font-size: 15px;
    background: rgba(255,255,255,0.04);
    flex-shrink: 0;
    transition: background .15s;
  }
  .dl-menu-item.active .dl-menu-icon {
    background: rgba(249,115,22,0.15);
  }
  .dl-menu-pip {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #f97316;
    margin-left: auto;
    flex-shrink: 0;
  }

  /* Logout */
  .dl-logout {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    padding: 11px 12px;
    border-radius: 12px;
    border: 1px solid rgba(239,68,68,0.2);
    background: rgba(239,68,68,0.06);
    color: #f87171;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: background .15s, border-color .15s, transform .1s;
    margin-top: 8px;
  }
  .dl-logout:hover {
    background: rgba(239,68,68,0.12);
    border-color: rgba(239,68,68,0.4);
    transform: translateY(-1px);
  }

  /* ── Main ── */
  .dl-main {
    flex: 1;
    overflow-y: auto;
    min-height: 100vh;
  }

  /* ── Top bar inside main ── */
  .dl-topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 32px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    background: rgba(9,9,11,0.8);
    backdrop-filter: blur(12px);
    position: sticky;
    top: 0;
    z-index: 10;
  }
  .dl-topbar-title {
    font-family: 'Syne', sans-serif;
    font-size: 15px;
    font-weight: 700;
    color: #e4e4e7;
  }
  .dl-topbar-right {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .dl-notif-btn {
    width: 36px; height: 36px;
    border-radius: 10px;
    border: 1px solid rgba(255,255,255,0.07);
    background: rgba(255,255,255,0.04);
    color: #71717a;
    font-size: 16px;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    position: relative;
    transition: background .15s, color .15s;
  }
  .dl-notif-btn:hover { background: rgba(255,255,255,0.08); color: #e4e4e7; }
  .dl-notif-pip {
    position: absolute;
    top: 6px; right: 6px;
    width: 7px; height: 7px;
    border-radius: 50%;
    background: #f97316;
    border: 2px solid #111113;
  }
  .dl-content {
    padding: 32px;
  }

  /* ── Responsive ── */
  @media (max-width: 768px) {
    .dl-sidebar { display: none; }
    .dl-content { padding: 20px 16px; }
  }
`;

if (!document.getElementById("dealer-layout-style")) {
  const s = document.createElement("style");
  s.id = "dealer-layout-style";
  s.textContent = css;
  document.head.appendChild(s);
}

/* ─── Menu config ─── */
const menu = [
  { name: "Dashboard", path: "/dealer/dashboard", icon: "📊", pip: false },
  { name: "Requests",  path: "/dealer/requests",  icon: "📬", pip: true  },
  { name: "Products",  path: "/dealer/products",  icon: "📦", pip: false },
  { name: "Profile",   path: "/dealer/profile",   icon: "👤", pip: false },
];

/* ════════════════════════════════════════════════ */
const DealerLayout = () => {
  const navigate  = useNavigate();
  const location  = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const activeName = menu.find(m => location.pathname.startsWith(m.path))?.name ?? "Dashboard";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="dl-wrapper">

      {/* ── Sidebar ── */}
      <aside className="dl-sidebar">
        <div>
          {/* Brand */}
          <div className="dl-brand">
            <div className="dl-brand-dot">C</div>
            <span className="dl-brand-text">CarMarket<span>Place</span></span>
          </div>

          {/* Profile */}
          <div className="dl-profile">
            <div className="dl-avatar">🏪</div>
            <div className="dl-profile-name">{user?.shop_name || "Auto World"}</div>
            <div className="dl-profile-loc">{user?.city || "Delhi"}</div>
            <span className="dl-profile-badge">Dealer</span>
          </div>

          {/* Nav */}
          <div className="dl-nav-label">Navigation</div>
          {menu.map(item => (
            <button
              key={item.name}
              className={`dl-menu-item${activeName === item.name ? " active" : ""}`}
              onClick={() => navigate(item.path)}
            >
              <span className="dl-menu-icon">{item.icon}</span>
              {item.name}
              {item.pip && activeName !== item.name && (
                <span className="dl-menu-pip" />
              )}
            </button>
          ))}
        </div>

        {/* Logout */}
        <div>
          <button className="dl-logout" onClick={handleLogout}>
            <span style={{ fontSize: 16 }}>🚪</span>
            Logout
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="dl-main">
        {/* Top bar */}
        <div className="dl-topbar">
          <span className="dl-topbar-title">{activeName}</span>
          <div className="dl-topbar-right">
            <button className="dl-notif-btn" title="Notifications">
              🔔
              <span className="dl-notif-pip" />
            </button>
            <button
              className="dl-notif-btn"
              title="Back to Home"
              onClick={() => navigate("/")}
            >
              🏠
            </button>
          </div>
        </div>

        <div className="dl-content">
          <Outlet />
        </div>
      </main>

    </div>
  );
};

export default DealerLayout;