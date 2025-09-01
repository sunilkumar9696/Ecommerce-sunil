// src/server.js
import dotenv from 'dotenv';
dotenv.config();
import app from './src/app.js';
import connectDB from './src/config/db.js';

console.log("API KEY from env:", process.env.CLOUDINARY_API_KEY);
// Set the port from .env or fallback to 5000
const PORT = process.env.PORT || 5000

// Connect to MongoDB and then start the server 
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1); // Exit on error
  }
};

startServer();