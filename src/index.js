require("dotenv").config();
const express = require("express");
const cors = require('cors');
const connectDB = require('./config/db');
const authRouter = require('./routes/auth');
const settingsRouter = require('./routes/settings');
const landingpageRouter = require('./routes/landing');
const aboutpageRouter = require('./routes/about');
const contactpageRouter = require('./routes/contact');
const departmentRouter = require('./routes/department');

const AuthMiddleware = require('./middleware/auth');

const app = express();
const port = process.env.PORT || 3000;

// Connect to the database
connectDB();

app.use(express.json());

// CORS configuration
app.use(cors());

// Mount the auth router
app.use('/auth', authRouter);

// Mount the settings router
app.use('/api/settings',AuthMiddleware, settingsRouter);

// Mount the department router
app.use('/api/settings',AuthMiddleware, departmentRouter);

// Mount the landing page router
app.use('/api/settings/landing-page',AuthMiddleware,landingpageRouter);

// Mount the about page router
app.use('/api/settings/about-page', AuthMiddleware, aboutpageRouter);

// Mount the contact page router 
app.use('/api/settings/contact-page', AuthMiddleware, contactpageRouter);

// Mount the contact page router 
// app.use('/api/settings/department', AuthMiddleware, contactpageRouter);

// Other code for setting up the Express app goes here
app.listen(port, () => {
  console.log(`App is currently running on port https://localhost:${port}`);
});

// Add routes
app.get("/", (req, res) => {
  res.send("Landing page for CIS");
});
