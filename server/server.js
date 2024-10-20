const app = require("./app");
const connectDB = require("./db/connect");
const dotenv = require("dotenv");

dotenv.config();



const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
