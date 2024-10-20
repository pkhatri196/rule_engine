import React, { useState } from "react";

const CombineRules = ({ onCombine }) => {
  const [rules, setRules] = useState([]);
  const [currentRule, setCurrentRule] = useState("");

  const addRule = () => {
    setRules([...rules, currentRule]);
    setCurrentRule("");
  };

  const handleCombine = () => {
    if (rules.length > 1) {
      onCombine(rules);
      setRules([]);
    } else {
      alert("Add at least two rules to combine");
    }
  };

  return (
    <div>
      <input
        type="text"
        value={currentRule}
        onChange={(e) => setCurrentRule(e.target.value)}
        placeholder="Add rule"
      />
      <button onClick={addRule}>Add Rule</button>
      <ul>
        {rules.map((rule, idx) => (
          <li key={idx}>{rule}</li>
        ))}
      </ul>
      <button onClick={handleCombine}>Combine Rules</button>
    </div>
  );
};

export default CombineRules;
