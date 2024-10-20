import React, { useState } from "react";

const RuleForm = ({ onSubmit }) => {
  const [ruleString, setRuleString] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(ruleString);
    setRuleString("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={ruleString}
        onChange={(e) => setRuleString(e.target.value)}
        placeholder="Enter rule string"
        required
      />
      <button type="submit">Create Rule</button>
    </form>
  );
};

export default RuleForm;
