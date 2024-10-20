import React, { useState } from "react";

const EvaluateRule = ({ onEvaluate }) => {
  const [userData, setUserData] = useState({
    age: "",
    department: "",
    salary: "",
    experience: "",
  });

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEvaluate(userData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        name="age"
        value={userData.age}
        onChange={handleChange}
        placeholder="Age"
      />
      <input
        type="text"
        name="department"
        value={userData.department}
        onChange={handleChange}
        placeholder="Department"
      />
      <input
        type="number"
        name="salary"
        value={userData.salary}
        onChange={handleChange}
        placeholder="Salary"
      />
      <input
        type="number"
        name="experience"
        value={userData.experience}
        onChange={handleChange}
        placeholder="Experience"
      />
      <button type="submit">Evaluate Rule</button>
    </form>
  );
};

export default EvaluateRule;
