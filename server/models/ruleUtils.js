// Utility functions for rule parsing and evaluation

// Function to create a node of the AST
const createNode = (type, left = null, right = null, value = null) => {
  return { type, left, right, value };
};

// Function to parse a rule string into an AST
const parseRuleString = (ruleString) => {
  const tokens = tokenize(ruleString);
  const ast = buildAST(tokens);
  return ast;
};

// Simple tokenization function (can be expanded for more complex rules)
const tokenize = (ruleString) => {
  // This regex splits on spaces and also captures parentheses and operators
  const regex = /\s*(=>|<|<=|>|>=|==|!=|&&|\|\||[()])\s*|(\w+|\d+|'[^']*')/g;
  const tokens = [];
  let match;

  while ((match = regex.exec(ruleString))) {
    if (match[1]) {
      tokens.push(match[1]); // Operator or parentheses
    }
    if (match[2]) {
      tokens.push(match[2]); // Operand (variable or value)
    }
  }

  return tokens;
};

// Function to build the AST from tokens
const buildAST = (tokens) => {
  let current = 0;

  const walk = () => {
    let token = tokens[current];

    // Handle parentheses
    if (token === "(") {
      current++;
      const node = walk();
      current++; // Skip ')'
      return node;
    }

    // Handle operators
    if (token === "AND" || token === "OR") {
      current++;
      const left = walk();
      const right = walk();
      return createNode(token, left, right);
    }

    // Handle comparison operands (age, department, etc.)
    if (/\w+/.test(token)) {
      const value = tokens[current + 2]; // Expecting a value after the variable
      current += 4; // Skip the variable, operator, and value
      return createNode("operand", null, null, {
        variable: token,
        operator: tokens[current - 2],
        value,
      });
    }

    // Advance current token
    current++;
    return null;
  };

  return walk();
};

// Function to combine multiple ASTs into one
const combineRuleASTs = (rules) => {
  // This example assumes that rules is an array of ASTs
  if (rules.length === 0) return null;

  // Start combining with the first rule
  let combinedAST = rules[0];

  for (let i = 1; i < rules.length; i++) {
    combinedAST = createNode("AND", combinedAST, rules[i]);
  }

  return combinedAST;
};

// Function to evaluate an AST against user data
const evaluateAST = (ast, userData) => {
  if (!ast) return false;

  switch (ast.type) {
    case "AND":
      return (
        evaluateAST(ast.left, userData) && evaluateAST(ast.right, userData)
      );
    case "OR":
      return (
        evaluateAST(ast.left, userData) || evaluateAST(ast.right, userData)
      );
    case "operand":
      return evaluateCondition(ast.value, userData);
    default:
      return false;
  }
};

// Function to evaluate a condition (for example, age > 30)
const evaluateCondition = ({ variable, operator, value }, userData) => {
  const userValue = userData[variable];

  switch (operator) {
    case ">":
      return userValue > value;
    case ">=":
      return userValue >= value;
    case "<":
      return userValue < value;
    case "<=":
      return userValue <= value;
    case "==":
      return userValue == value; // Use == for loose comparison
    case "!=":
      return userValue != value; // Use != for loose comparison
    default:
      return false;
  }
};

module.exports = { parseRuleString, combineRuleASTs, evaluateAST };
