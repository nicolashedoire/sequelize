const express = require("express");
const router = express.Router();
const path = require("path");

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log(
    " Request: ",
    req.url,
    " Method: ",
    req.method,
    "Time: ",
    Date.now()
  );
  next();
});
// define the home page route
router.get("/", function (req, res) {
  res.sendFile(`${__dirname}/public/index.html`);
});

module.exports = router;
