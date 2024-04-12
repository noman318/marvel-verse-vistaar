import mongoose from "mongoose";

const connectToDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "marvel-verse-vistaar",
    });
    console.log(`Database connnected Successfully ${conn.connection.host}`);
  } catch (error) {
    console.log(`Errror while connecting to DB ${error}`);
  }
};

export default connectToDb;
