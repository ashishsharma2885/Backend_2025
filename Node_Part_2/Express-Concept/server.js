require('dotenv').config();
const express = require('express');
const {configureCors} = require('./config/cors.config')
const { requestLogger, addTimeStamp } = require('./middlewares/customMiddleware')
const {globalErrorhandler} = require('./middlewares/errorHandler')
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// express json middleware
app.use(requestLogger)
app.use(addTimeStamp)

// Middleware
app.use(configureCors());         
app.use(express.json()); 

app.use(globalErrorhandler)

// Start server
app.listen(PORT, () => {
  console.log(`Server is now running on http://localhost:${PORT}`);
});
