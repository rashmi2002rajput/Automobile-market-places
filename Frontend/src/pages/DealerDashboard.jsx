import React from "react";

const DealerDashboard = () => {
  const stats = [
    { title: "Live Requests", value: 3 },
    { title: "Products", value: 5 },
    { title: "Orders", value: 4 },
  ];

  return (
    <>
      <h2>Dashboard</h2>

      <div style={styles.stats}>
        {stats.map((s) => (
          <div key={s.title} style={styles.card}>
            <p>{s.title}</p>
            <h2>{s.value}</h2>
          </div>
        ))}
      </div>
    </>
  );
};

export default DealerDashboard;

const styles = {
  stats: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
    gap: "20px",
  },
  card: {
    background: "#fff",
    padding: "25px",
    borderRadius: "18px",
  },
};
