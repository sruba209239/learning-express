var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  // res.send("respond with a resource");
  res.json([
    {
      id: 123,
      name: "name 1",
      done: false,
    },
  ]);
});

module.exports = router;
