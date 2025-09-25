require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());         
app.use(express.json()); 

// Start server
app.listen(PORT, () => {
  console.log(`Server is now running on http://localhost:${PORT}`);
});
