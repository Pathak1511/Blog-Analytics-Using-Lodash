const express = require("express");
const blogController = require("./../controller/blogController");
const router = express.Router();

/// Requirement 1 and 2 in the same route
/// Note : if query is not "privacy" then bydefault it return blogs analytics
router.get("/blog-stats", blogController.analytics, blogController.getBlog);

module.exports = router;
