import mongoose from 'mongoose';

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    console.warn('⚠️ MONGO_URI is not defined. Skipping database connection.');
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

    mongoose.connection.on('error', (error) => {
      console.error(`❌ MongoDB Connection Error: ${error.message}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️ MongoDB disconnected. Reconnect attempts will continue.');
    });
  } catch (error) {
    console.error(`❌ Database Connection Failed: ${error.message}`);
    console.warn('⚠️ Continuing without a database connection for now.');
  }
};

export default connectDB;