// Import required modules
const express = require("express");
const axios = require("axios");

// Create an Express app
const app = express();
const PORT = 3000;

// Set EJS as the view engine
app.set("view engine", "ejs");

// Enable parsing of form data (if needed later)
app.use(express.urlencoded({ extended: true }));

// Replace this with your real OpenUV API key
const API_KEY = "openuv-35g35rmbl5szbq-io";

// Home route - renders UV index based on lat/lng query params
app.get("/", async (req, res) => {
  // Get latitude and longitude from query params or use NYC as default
  const lat = req.query.lat || 40.7128;
  const lng = req.query.lng || -74.0060;

  try {
    // Call OpenUV API with coordinates and your API key in headers
    const response = await axios.get(`https://api.openuv.io/api/v1/uv?lat=${lat}&lng=${lng}`, {
      headers: {
        "x-access-token": API_KEY
      }
    });

    // Extract UV index from the response
    const uvIndex = response.data.result.uv;

    // Render the page and pass UV data + coordinates
    res.render("index", { uv: uvIndex, lat, lng });

  } catch (error) {
    // If API call fails, log the error and show a message
    console.error(error.message);
    res.send("Error fetching UV index.");
  }
});

// Start the server on port 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
