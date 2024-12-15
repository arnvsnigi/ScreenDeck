require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const os = require('os');
const https = require('https');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Successfully connected to MongoDB Atlas');
  } catch (error) {
    console.error('MongoDB Connection Failed:', error);
    process.exit(1);
  }
};



// Minimal error logging
mongoose.connection.on('error', (err) => {
  console.error('Mongoose Connection Error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.warn('Lost MongoDB connection');
});

// Connect to Database
connectDB();
// In server.js
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString()
  });
  console.log('Mongoose Connection State:', mongoose.connection.readyState);
  // 0 = disconnected
  // 1 = connected
  // 2 = connecting
  // 3 = disconnecting
});
app.get('/test', (req, res) => {
  res.json({ message: 'Server is running successfully!' });
});
// Routes
app.use('/api/users', userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
