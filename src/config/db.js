const mongoose = require('mongoose');

mongoose.set("strictQuery", false);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.LOCAL_URI);
    console.log('Connected to database!');
  } catch (error) {
    console.error('Connection to database failed:', error.message);
  }
};

module.exports = connectDB;