import React, { useState } from "react";
import RuleForm from "./components/RuleForm";
import CombineRules from "./components/CombineRules";
import EvaluateRule from "./components/EvaluateRule";

function App() {
  const [ast, setAST] = useState(null);
  const [evaluationResult, setEvaluationResult] = useState(null);
  const [ruleId, setRuleId] = useState(null);

  const createRule = async (ruleString) => {
    const response = await fetch("http://localhost:5000/rules/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ruleString, name: "Sample Rule" }),
    });
    const data = await response.json();
    setAST(data.ast); // Set the AST for frontend display
    setRuleId(data.ruleId); // Store the ruleId from the DB for later evaluation
    alert("Rule Created!");
  };

  const combineRules = async (rules) => {
    const response = await fetch("http://localhost:5000/rules/combine", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rules }),
    });
    const data = await response.json();
    setAST(data.ast);
    alert("Rules Combined!");
  };

  const evaluateRule = async (userData) => {
    const response = await fetch("http://localhost:5000/rules/evaluate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ruleId, userData }), // Use ruleId from DB
    });
    const result = await response.json();
    setEvaluationResult(result.evaluation);
  };

  return (
    <div className="App">
      <h1>Rule Engine Application</h1>

      <h2>Create Rule</h2>
      <RuleForm onSubmit={createRule} />

      <h2>Combine Rules</h2>
      <CombineRules onCombine={combineRules} />

      <h2>Evaluate Rule</h2>
      {ast && <EvaluateRule onEvaluate={evaluateRule} />}

      {evaluationResult !== null && (
        <h3>Evaluation Result: {evaluationResult ? "True" : "False"}</h3>
      )}
    </div>
  );
}

export default App;
