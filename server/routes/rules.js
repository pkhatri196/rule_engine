const express = require("express");
const {
  createRule,
  combineRules,
  evaluateRule,
} = require("../controllers/ruleController");
const router = express.Router();

// Create rule and store in DB
router.post("/create", createRule);

// Combine rules and store in DB
router.post("/combine", combineRules);

// Evaluate rule from DB
router.post("/evaluate", evaluateRule);

module.exports = router;
