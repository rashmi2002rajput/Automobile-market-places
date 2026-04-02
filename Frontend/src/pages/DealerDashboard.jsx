import React from "react";

/* ─── Inject styles once ─── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

  .dd-wrap {
    font-family: 'DM Sans', sans-serif;
    background: #09090b;
    min-height: 100vh;
    padding: 40px 36px;
    color: #f4f4f5;
  }

  .dd-header {
    margin-bottom: 36px;
  }

  .dd-tag {
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

  .dd-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(1.6rem, 3vw, 2.2rem);
    font-weight: 800;
    letter-spacing: -.025em;
    color: #f4f4f5;
    margin: 0 0 6px;
  }

  .dd-sub {
    color: #52525b;
    font-size: 14px;
  }

  .dd-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
    margin-bottom: 40px;
  }

  .dd-stat-card {
    background: #18181b;
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 20px;
    padding: 28px 24px;
    position: relative;
    overflow: hidden;
    transition: border-color .25s, transform .25s, box-shadow .25s;
    cursor: default;
  }
  .dd-stat-card:hover {
    border-color: #f97316;
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(249,115,22,0.1);
  }
  .dd-stat-card::after {
    content: '';
    position: absolute;
    bottom: -20px;
    right: -20px;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: rgba(249,115,22,0.06);
    transition: transform .3s;
  }
  .dd-stat-card:hover::after { transform: scale(1.6); }

  .dd-stat-icon {
    font-size: 22px;
    margin-bottom: 16px;
    display: block;
  }

  .dd-stat-label {
    font-size: 12px;
    font-weight: 600;
    letter-spacing: .06em;
    text-transform: uppercase;
    color: #52525b;
    margin-bottom: 8px;
  }

  .dd-stat-value {
    font-family: 'Syne', sans-serif;
    font-size: 2.4rem;
    font-weight: 800;
    color: #f4f4f5;
    line-height: 1;
    letter-spacing: -.03em;
  }

  .dd-stat-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 11px;
    font-weight: 600;
    color: #22c55e;
    background: rgba(34,197,94,0.1);
    border-radius: 999px;
    padding: 3px 10px;
    margin-top: 10px;
  }

  .dd-sections {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
  }

  .dd-section-card {
    background: #18181b;
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 20px;
    padding: 28px 24px;
  }

  .dd-section-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .dd-section-title {
    font-family: 'Syne', sans-serif;
    font-size: 15px;
    font-weight: 700;
    color: #e4e4e7;
  }

  .dd-section-link {
    background: none;
    border: none;
    color: #f97316;
    font-family: 'DM Sans', sans-serif;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    padding: 0;
    transition: color .15s;
  }
  .dd-section-link:hover { color: #fb923c; text-decoration: underline; }

  .dd-activity-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 0;
    border-bottom: 1px solid rgba(255,255,255,0.05);
  }
  .dd-activity-item:last-child { border-bottom: none; padding-bottom: 0; }

  .dd-activity-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .dd-activity-text {
    flex: 1;
    font-size: 13px;
    color: #a1a1aa;
    line-height: 1.4;
  }
  .dd-activity-text b { color: #e4e4e7; font-weight: 500; }

  .dd-activity-time {
    font-size: 11px;
    color: #3f3f46;
    white-space: nowrap;
  }

  .dd-quick-btn {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 12px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 12px;
    padding: 14px 16px;
    color: #a1a1aa;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    margin-bottom: 10px;
    transition: background .15s, border-color .15s, color .15s, transform .1s;
    text-align: left;
  }
  .dd-quick-btn:last-child { margin-bottom: 0; }
  .dd-quick-btn:hover {
    background: rgba(249,115,22,0.07);
    border-color: rgba(249,115,22,0.3);
    color: #f4f4f5;
    transform: translateX(3px);
  }
  .dd-quick-btn-icon {
    width: 34px;
    height: 34px;
    border-radius: 9px;
    background: rgba(249,115,22,0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    flex-shrink: 0;
  }
`;

if (!document.getElementById("dealer-dashboard-style")) {
  const s = document.createElement("style");
  s.id = "dealer-dashboard-style";
  s.textContent = css;
  document.head.appendChild(s);
}

/* ─── Data ─── */
const stats = [
  { icon: "📬", label: "Live Requests", value: 3,  badge: "+2 today"   },
  { icon: "📦", label: "Products",      value: 5,  badge: "2 low stock" },
  { icon: "🛒", label: "Orders",        value: 4,  badge: "1 pending"   },
];

const activity = [
  { color: "#f97316", text: <><b>New request</b> for Brake Pads (Toyota Corolla)</>,  time: "2m ago"  },
  { color: "#22c55e", text: <><b>Order #1042</b> marked as delivered</>,               time: "1h ago"  },
  { color: "#3b82f6", text: <><b>Product</b> "Air Filter K&N" updated</>,              time: "3h ago"  },
  { color: "#a855f7", text: <><b>New order</b> received for Spark Plug set</>,         time: "5h ago"  },
  { color: "#f97316", text: <><b>Request</b> from user closed — no match</>,           time: "Yesterday" },
];

const quickActions = [
  { icon: "➕", label: "Add New Product"      },
  { icon: "📋", label: "View All Requests"    },
  { icon: "🚚", label: "Manage Orders"        },
  { icon: "👤", label: "Edit Dealer Profile"  },
];

/* ════════════════════════════════════════════════ */
const DealerDashboard = () => (
  <div className="dd-wrap">

    {/* ── Header ── */}
    <div className="dd-header">
      <span className="dd-tag">Dealer Panel</span>
      <h1 className="dd-title">Dashboard</h1>
      <p className="dd-sub">Here's what's happening with your store today.</p>
    </div>

    {/* ── Stats ── */}
    <div className="dd-stats">
      {stats.map(s => (
        <div key={s.label} className="dd-stat-card">
          <span className="dd-stat-icon">{s.icon}</span>
          <div className="dd-stat-label">{s.label}</div>
          <div className="dd-stat-value">{s.value}</div>
          <div className="dd-stat-badge">↑ {s.badge}</div>
        </div>
      ))}
    </div>

    {/* ── Sections ── */}
    <div className="dd-sections">

      {/* Recent Activity */}
      <div className="dd-section-card">
        <div className="dd-section-head">
          <span className="dd-section-title">Recent Activity</span>
          <button className="dd-section-link">View all</button>
        </div>
        {activity.map((a, i) => (
          <div key={i} className="dd-activity-item">
            <div className="dd-activity-dot" style={{ background: a.color }} />
            <span className="dd-activity-text">{a.text}</span>
            <span className="dd-activity-time">{a.time}</span>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="dd-section-card">
        <div className="dd-section-head">
          <span className="dd-section-title">Quick Actions</span>
        </div>
        {quickActions.map(q => (
          <button key={q.label} className="dd-quick-btn">
            <div className="dd-quick-btn-icon">{q.icon}</div>
            {q.label}
            <span style={{ marginLeft: "auto", color: "#3f3f46", fontSize: 16 }}>›</span>
          </button>
        ))}
      </div>

    </div>
  </div>
);

export default DealerDashboard;