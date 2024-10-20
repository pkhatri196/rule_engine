const express = require("express");
const ruleRoutes = require("./routes/rules");
const app = express();
const cors = require("cors");

app.use(cors());
// Middleware
app.use(express.json());

// API Routes
app.use("/rules", ruleRoutes);

module.exports = app;
