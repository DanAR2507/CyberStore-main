import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async (uri, callback) => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // тайм-аут выбора сервера
      socketTimeoutMS: 45000, // тайм-аут операций с сокетом
      // Другие опции подключения могут быть добавлены здесь
      authSource: "admin",
      user: "danilaar",
      pass: "zxcv123",
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;