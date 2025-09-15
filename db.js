const mongoose = require("mongoose");

const connectDB = async () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  try {
    await mongoose.connect(process.env.MONGODB_URL, connectionParams);
    console.log("Connected to database");
  } catch (error) {
    console.error("Could not connect to database", error);
    process.exit(1); 
  }
};

module.exports = connectDB;