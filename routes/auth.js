var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secretKey = "12345";
/* GET auth listing. */
// router.get("/login", function (req, res, next) {
//   res.json("auth");
// });

router.post("/login", (req, res) => {
//   res.json("sdasdsa");
  const { username, password } = req.body;
  if (username === "admin" && password === "12345") {
    // Generate a JWT token
    const token = jwt.sign({ username }, secretKey, { expiresIn: "1h" });
    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid username or password" });
  }
});

module.exports = router;
