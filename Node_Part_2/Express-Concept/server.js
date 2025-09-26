require('dotenv').config();
const express = require('express');
const {configureCors} = require('./config/cors.config')
const { requestLogger, addTimeStamp } = require('./middlewares/customMiddleware')
const {globalErrorhandler} = require('./middlewares/errorHandler')
const { urlVersioning } = require('./middlewares/apiVersioning')
const {createBasicRateLimiter} = require('./middlewares/rateLimiting')
const itemRoutes = require('./routes/item.routes')
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// express json middleware
app.use(requestLogger)
app.use(addTimeStamp)

// Middleware
app.use(configureCors()); 
app.use(createBasicRateLimiter(2, 15*60*100))   // 100 request  per 15 minitues    
app.use(express.json()); 

// app.use(urlVersioning('v1'))
app.use('/api/v1', itemRoutes)

app.use(globalErrorhandler)

// Start server
app.listen(PORT, () => {
  console.log(`Server is now running on http://localhost:${PORT}`);
});
