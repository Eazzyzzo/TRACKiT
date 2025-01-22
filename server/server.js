const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Log incoming request origins for debugging
app.use((req, res, next) => {
  console.log(`Incoming request origin: ${req.headers.origin}`);
  next();
});

// Define allowed origins dynamically
const allowedOrigins = [
  'http://localhost:3000',                 // Local React app
  'https://trackit-12uzkey66-israels-projects-d88997c7.vercel.app',         // vercel frontend
  'http://localhost:5000',                 // Local backend
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    // Check if the origin is in the allowedOrigins array
    if (allowedOrigins.includes(origin) || origin === process.env.FRONTEND_URL) {
      return callback(null, true); // Origin is allowed
    } else {
      // Block request if the origin is not allowed
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
  },
  credentials: true, // Allow credentials (cookies, Authorization headers)
};

// Middleware
app.use(express.json());
app.use(cors(corsOptions)); // Use CORS with dynamic origin checking

// Debug MongoDB URI (optional for production; remove in live environments)
//console.log('Mongo URI:', process.env.MONGO_URI);

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const activityRoutes = require('./routes/activities');

// Define API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/activities', activityRoutes);

// Serve React frontend
app.use(express.static(path.join(__dirname, '../client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

// Connect to MongoDB and start the server
mongoose.set('strictQuery', false); // Suppress deprecation warning

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });
