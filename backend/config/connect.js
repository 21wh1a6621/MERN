
const mongoose = require('mongoose');

const connectionOfDb = async () => {
  const URL = 'mongodb+srv://shivani:thalapathy@blog.0xgmyp1.mongodb.net/?retryWrites=true&w=majority&appName=blog';
  try {
    const conn = await mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

connectionOfDb();



module.exports = connectionOfDb;