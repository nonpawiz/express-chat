var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secretKey = process.env.JWT_SECRET;

router.post("/login", (req, res) => {
  // const username = req.body.username;
  // const password = req.body.password;
  const { username, password } = req.body;
  if (username === "admin" && password === "12345") {
    const token = jwt.sign({ username }, secretKey, { expiresIn: "1h" });
    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid username or password" });
  }
});

module.exports = router;
