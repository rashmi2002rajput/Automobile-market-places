const bcrypt = require("bcryptjs");
const pool = require("../db");

// REGISTER CONTROLLER
exports.register = async (req, res) => {
  try {
    const { name, email, password, role, phone, shop_name } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email & password required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      `INSERT INTO users (name, email, password, role, phone, shop_name)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [name, email, hashedPassword, role, phone, shop_name]
    );

    res.status(201).json({
      message: "User registered successfully",
      userId: result.insertId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Registration failed" });
  }
};

// LOGIN CONTROLLER
// LOGIN CONTROLLER
// LOGIN CONTROLLER
exports.login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    // 🔍 email OR phone
    const [rows] = await pool.query(
      "SELECT * FROM users WHERE email = ? OR phone = ?",
      [identifier, identifier]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = rows[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login failed" });
  }
};


