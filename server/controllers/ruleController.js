const {
  parseRuleString,
  combineRuleASTs,
  evaluateAST,
} = require("../models/ruleUtils");
const Rule = require("../models/ruleModel");

// Create rule and store in DB
exports.createRule = async (req, res) => {
  const { ruleString, name } = req.body;
  
  try {
    const ast = parseRuleString(ruleString); // Generate AST from rule string
    const newRule = new Rule({ name : ruleString , ast });
    await newRule.save();
    res.json({ message: "Rule created successfully", ast });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// Combine multiple rules and store combined AST
exports.combineRules = async (req, res) => {
  const { rules } = req.body;
  try {
    const ast = combineRuleASTs(rules);
    const combinedRule = new Rule({ name: "Combined Rule", ast });
    await combinedRule.save();
    res.json({ message: "Rules combined successfully", ast });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Evaluate rule from DB
exports.evaluateRule = async (req, res) => {
  const { ruleId, userData } = req.body;
  try {
    const rule = await Rule.findById(ruleId);
    if (!rule) return res.status(404).json({ error: "Rule not found" });
    const result = evaluateAST(rule.ast, userData);
    res.json({ evaluation: result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
