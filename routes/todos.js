var express = require("express");
var router = express.Router();
var createError = require("http-errors");

const todos = [{ id: 123, name: "helloo", targetDate: new Date(), done: true }];
/* GET users listing. */
router.get("/", function (req, res, next) {
  // res.send("respond with a resource");
  // connect to some db to retrieve the data
  res.json([
    {
      id: 123,
      name: "name 1",
      targetDate: new Date(),
      done: false,
    },
  ]);
});

router.get("/:id", function (req, res, next) {
  // res.send("respond with a resource");
  // connect to some db to retrieve the data
  const result = todos.find((todo) => todo.id === Number(req.params.id));

  if (!result) {
    return next(createError(404, "Todo Not Found!"));
  }
  res.json(result);
});

// Post - create a new todo
router.post("/", function (req, res, next) {
  res
    .status(201)
    .header("Location", req.url + req.body.id)
    .json({
      id: 121,
      name: "watch avatar 2",
      targetDate: new Date(),
      done: true,
    });
});

router.delete("/:id", function (req, res, next) {
  const result = todos.find((todo) => todo.id === +req.params.id);
  if (!result) {
    return next(
      createError(404, "No todo found to delete", {
        error: "No todo found to delete",
      })
    );
  }
  res.status(204);
});

module.exports = router;
