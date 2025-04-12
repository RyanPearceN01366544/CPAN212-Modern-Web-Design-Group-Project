import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://DarkPixel:PUIV0arz2xiWotOS@cpan-212-class-cluster.6ors4.mongodb.net/GroupProject';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
