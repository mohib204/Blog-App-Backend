const express = require("express");
const authRoute = require("./authRoutes");
const blogRoute = require("./blogRoutes");

const router = express.Router();

router.use("/auth", authRoute);
router.use("/blog", blogRoute);

module.exports = router;
