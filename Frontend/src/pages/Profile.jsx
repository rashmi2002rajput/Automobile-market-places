import { useState } from "react";
import "../Profile.css";

const DealerProfile = () => {
  const [dealer, setDealer] = useState({
    shopName: "Auto World",
    ownerName: "Rohit Sharma",
    phone: "9876543210",
    city: "Delhi",
    description: "Trusted auto parts dealer since 2012",
  });

  const handleChange = (e) => {
    setDealer({ ...dealer, [e.target.name]: e.target.value });
  };

  return (
    <div className="dealer-profile-wrapper">
      <div className="dealer-profile-card">
        <h2>Edit Dealer Profile</h2>
        <p className="sub-text">
          This information will be visible to customers with your products
        </p>

        <div className="dealer-form">
          <input
            name="shopName"
            value={dealer.shopName}
            onChange={handleChange}
            placeholder="Shop Name"
          />

          <input
            name="ownerName"
            value={dealer.ownerName}
            onChange={handleChange}
            placeholder="Owner Name"
          />

          <input
            name="phone"
            value={dealer.phone}
            onChange={handleChange}
            placeholder="Phone Number"
          />

          <input
            name="city"
            value={dealer.city}
            onChange={handleChange}
            placeholder="City"
          />
        </div>

        <textarea
          name="description"
          value={dealer.description}
          onChange={handleChange}
          placeholder="Describe your shop"
          rows="4"
        />

        <div className="action-bar">
          <button className="save-btn">Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default DealerProfile;
