import React from "react";
import "../Request.css";

const RequestCard = ({ data }) => {
  return (
    <div className="request-card">

      {/* 🔥 IMAGES */}
      <div className="request-images">
        {data.images.map((img, index) => (
          <img key={index} src={img} alt={data.productName} />
        ))}
      </div>

      {/* HEADER */}
      <div className="request-header">
        <h3>{data.productName}</h3>
        <span className="category">{data.category}</span>
      </div>

      {/* DETAILS */}
      <div className="request-details">
        <p><strong>Car:</strong> {data.car}</p>
        <p><strong>Year:</strong> {data.year}</p>
        <p><strong>Qty:</strong> {data.quantity}</p>
        <p><strong>Condition:</strong> {data.condition}</p>
        <p><strong>Budget:</strong> ₹{data.budget}</p>
      </div>

      <p className="request-desc">{data.description}</p>

      {/* FOOTER */}
      <div className="request-footer">
        <span className="user">
          {data.user.name} • {data.user.city}
        </span>
        <button className="offer-btn">Send Offer</button>
      </div>
    </div>
  );
};

export default RequestCard;
