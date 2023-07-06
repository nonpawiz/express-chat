var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET;
const connection = require("../db");
const comparePassword = require("../services/compare_password");

router.post("/login", async (req, res) => {
  // const { username, password } = req.body;
  // if (username === "admin" && password === "12345") {
  //   const token = jwt.sign({ username }, secretKey, { expiresIn: "1h" });
  //   res.json({ token });
  // } else {
  //   res.status(401).json({ message: "Invalid username or password" });
  // }

  const { username, password } = req.body
  const user = await connection("users").where("name", username).first();
  try {
    await comparePassword(password, user.password);
    // const token = jwt.sign({ username }, secretKey, { expiresIn: "1h" });
    // res.json({ token });
    // user.token = token;
    res.status(200).json(user);
  } catch (error) {
    console.error("Error during login:", error);
    res.status(401).json({ message: "Invalid username or password" });
  }
});

module.exports = router;
