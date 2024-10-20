const mongoose = require("mongoose");

// Define a schema for the Rule
const ruleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  ast: {
    type: Object,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create a Mongoose model from the schema
const Rule = mongoose.model("Rule", ruleSchema);


// Export the model and utility functions
module.exports = Rule;
