import React, { useState } from "react";
import "../Product.css";


const Products = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    brand: "",
    category: "",
    stock: "",
    description: "",
    images: [],
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "images") {
      setForm({ ...form, images: Array.from(files) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const addProduct = () => {
    if (!form.name || !form.price || form.images.length === 0) {
      alert("Please fill required fields");
      return;
    }
    setProducts([...products, { ...form, id: Date.now() }]);
    setForm({
      name: "",
      price: "",
      brand: "",
      category: "",
      stock: "",
      description: "",
      images: [],
    });
  };

  return (
    <div className="products-page">
      <h1 className="page-title">🛒 Product Management</h1>
      <p className="page-subtitle">Add & manage your auto parts inventory</p>

      {/* ADD PRODUCT */}
      <div className="glass-card">
        <h2>Add New Product</h2>

        <div className="form-grid">
          <input name="name" placeholder="Product Name *" value={form.name} onChange={handleChange} />
          <input name="price" type="number" placeholder="Price (₹) *" value={form.price} onChange={handleChange} />
          <input name="brand" placeholder="Brand" value={form.brand} onChange={handleChange} />
          <input name="category" placeholder="Category" value={form.category} onChange={handleChange} />
          <input name="stock" type="number" placeholder="Stock" value={form.stock} onChange={handleChange} />
        </div>

        <textarea
          name="description"
          placeholder="Product Description"
          value={form.description}
          onChange={handleChange}
        />

        <label className="upload-box">
          📸 Upload Images
          <input type="file" name="images" multiple hidden onChange={handleChange} />
        </label>

        {form.images.length > 0 && (
          <div className="preview">
            {form.images.map((img, i) => (
              <img key={i} src={URL.createObjectURL(img)} alt="preview" />
            ))}
          </div>
        )}

        <button className="primary-btn" onClick={addProduct}>
          ➕ Add Product
        </button>
      </div>

      {/* PRODUCT LIST */}
      {products.length > 0 && (
        <>
          <h2 className="section-title">My Products</h2>
          <div className="product-grid">
            {products.map((p) => (
              <div key={p.id} className="product-card">
                <img src={URL.createObjectURL(p.images[0])} alt={p.name} />
                <h3>{p.name}</h3>
                <p className="price">₹{p.price}</p>
                <span className="meta">
                  {p.brand} • {p.category}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Products;
