const DealerInfoCard = ({ dealer }) => {
  return (
    <div className="dealer-info-card">
      <h2>{dealer.shopName}</h2>

      <p className="dealer-owner">
        Owner: <strong>{dealer.ownerName}</strong>
      </p>

      <p className="dealer-location">
        📍 {dealer.city}
      </p>

      {dealer.verified && (
        <span className="dealer-badge">Verified Dealer</span>
      )}

      <p className="dealer-desc">{dealer.description}</p>
    </div>
  );
};

export default DealerInfoCard;
