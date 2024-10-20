const {
  create_rule,
  combine_rules,
  evaluate_rule,
} = require("../server/controllers/ruleController");

test("Create AST from rule string", () => {
  const rule = "age > 30 && department === 'Sales'";
  const ast = create_rule(rule);
  expect(ast).toBeDefined();
});

// Other test cases for combine_rules, evaluate_rule
