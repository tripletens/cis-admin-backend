require("dotenv").config();
const express = require("express");

const app = express();
const port = process.env.PORT || 3000;
const connectDB = require('./config/db');
const authRouter = require('./routes/auth');
const cors = require('cors');

// connect to database 
connectDB();

app.use(express.json());

// // cors 
app.use(cors(
  {
    origin: 'http://localhost:3000/',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    headers: {
      'Content-Type': 'application/json',
      // Add other headers if needed
    }
  }
));

// Mount the auth router
app.use('/auth', authRouter);

// result const 
let result = {
  status : null,
  message : null,
  data : null,
  token : null
};

// other code for setting up the express app goes here

app.listen(port, () => {
  console.log(`App is currently running on port https://localhost:${port}`);
});

// add routes
app.get("/", (req, res) => {
  res.send("landing page for cis ");
});
