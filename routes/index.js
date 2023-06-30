var express = require("express");
var router = express.Router();
const figlet = require("figlet");

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'nonpawiz' });
// });

router.get("/", (req, res) => {
  figlet("Hello World", (err, data) => {
    res.send([
      {
        project: "EXPRESS_BACKEND_API",
        version: "1.0.0",
        author: "nonpawiz",
        year: 2023,
      },
    ]);
  });
});

module.exports = router;
