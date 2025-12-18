import DealerInfoCard from "../Component/DealerInfoCard";

const DealerPublicProfile = () => {
  const dealerData = {
    shopName: "Auto World",
    ownerName: "Rohit Sharma",
    city: "Delhi",
    verified: true,
    description: "Trusted auto parts dealer since 2012",
  };

  const products = [
    {
      id: 1,
      name: "Brake Pads",
      price: 1200,
      image: "https://via.placeholder.com/300",
    },
    {
      id: 2,
      name: "Clutch Plate",
      price: 4500,
      image: "https://via.placeholder.com/300",
    },
  ];

  return (
    <div className="dealer-public-page">
      <DealerInfoCard dealer={dealerData} />

      <h3 className="section-title">Products from this Dealer</h3>

      <div className="product-grid">
        {products.map((p) => (
          <div key={p.id} className="product-card">
            <img src={p.image} alt={p.name} />
            <h4>{p.name}</h4>
            <p>₹ {p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DealerPublicProfile;
