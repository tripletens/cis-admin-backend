require("dotenv").config();
const express = require("express");

const app = express();
const port = process.env.PORT || 3000;
const connectDB = require('./config/db');
const authRouter = require('./routes/auth');

// connect to database 
connectDB();

app.use(express.json());

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
