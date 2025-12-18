import React, { useEffect, useState } from "react";
import "../Request.css";
import RequestCard from "../Component/RequestCard";

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setRequests([
  {
    id: 1,
    productName: "Brake Pad",
    category: "Brakes",
    car: "Honda City",
    year: "2020",
    quantity: 2,
    condition: "New",
    budget: 3000,
    description: "Original quality brake pads required",
    images: [
      "https://via.placeholder.com/300x200?text=Brake+1",
      "https://via.placeholder.com/300x200?text=Brake+2",
      "https://via.placeholder.com/300x200?text=Brake+3",
    ],
    user: {
      name: "Rahul Sharma",
      city: "Delhi",
    },
  },
  {
    id: 2,
    productName: "Clutch Plate",
    category: "Transmission",
    car: "Hyundai i20",
    year: "2019",
    quantity: 1,
    condition: "New",
    budget: 4500,
    description: "Need genuine clutch plate",
    images: [
      "https://via.placeholder.com/300x200?text=Clutch+1",
      "https://via.placeholder.com/300x200?text=Clutch+2",
    ],
    user: {
      name: "Amit Verma",
      city: "Noida",
    },
  },
]);

      setLoading(false);
    }, 800);
  }, []);

  if (loading) return <p className="loading">Loading requests...</p>;
  if (requests.length === 0)
    return <p className="empty">No requests available</p>;

  return (
    <div className="requests-page">
      <h2 className="page-title">Live Customer Requests</h2>

      {/* 🔥 GRID WRAPPER (IMPORTANT) */}
      <div className="requests-grid">
        {requests.map((req) => (
          <RequestCard key={req.id} data={req} />
        ))}
      </div>
    </div>
  );
};

export default Requests;
