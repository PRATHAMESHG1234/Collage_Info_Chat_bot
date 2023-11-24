const mongoose = require('mongoose');
require('dotenv').config({ path: './config.env' });

async function connectDb() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Set the strictQuery option to false to prepare for the future change
    mongoose.set('strictQuery', false);

    console.log('MongoDB connected');
  } catch (error) {
    console.log('MongoDB connection error:', error);
    process.exit(1);
  }
}

module.exports = connectDb;
