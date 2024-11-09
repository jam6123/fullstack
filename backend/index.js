require('dotenv').config();
// This "express-async-errors" package automatically calls the "next(error)" when there's an error in our handlers/middlewares.
require('express-async-errors');

const helmet = require('helmet')
const errorHandler = require('./handler/errorHandler');
const notFoundHandler = require('./handler/notFoundHandler');
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');
const connectDb = require('./db');
const validateReqBody = require('./helpers/validateReqBody');

const PORT = process.env.PORT || 7000;

const corsOptions = {
  // These "credentials" and "origin" are required to allow cookies to be sent to the client.
  // Also the fetch api of the client must have the option "credentials: "include"".
  origin: ["http://192.168.50.31:5173", "http://localhost:5173"],
  credentials: true,
  exposedHeaders: ["xsrf-token", "x-ratelimit-remaining"]    // The response headers that we can access in client javascript.
};

app.use(helmet())
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json({ verify: validateReqBody }));

// user routes
app.use('/api/users', userRoutes);

// 404 - Not Found (if any routes above doesn't match or url matched but no http verb handler. )
app.use(notFoundHandler);

// This is required to process the error we're throwing in our middlwares/handlers.
app.use(errorHandler);

(async function startServer() {
  await connectDb();
  app.listen(PORT, () => console.log(`Server is now running on http://localhost:${PORT}`));
})()


