const express = require("express");
const cors = require("cors");
const campaignRoutes = require("./routes/upload");  // Adjust the path if your routes are located elsewhere
const dotenv = require("dotenv");
const path = require("path");

// Initialize environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)
app.use(express.json()); // Parse incoming JSON requests

// Serve static files (e.g., images, files uploaded via Cloudinary)
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/api/campaigns", campaignRoutes);

// Default route for testing
app.get("/", (req, res) => {
  res.send("Welcome to the crowdfunding backend API!");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
