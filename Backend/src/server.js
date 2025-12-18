const express = require("express");
const cors = require("cors");
require("dotenv").config();

// 👇 DB connect (GOOD)
require("./db");

const authRoutes = require("./routes/auth.routes");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ test route
app.get("/", (req, res) => {
  res.send("🚀 Backend running");
});

// ✅ auth routes
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("🚀 Backend server running on port", PORT);
});
