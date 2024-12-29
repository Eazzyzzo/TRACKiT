const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Define allowed origins (local and production)
const allowedOrigins = ['http://localhost:3000',  // Local React app
  'https://trackit-activity-84w9wisxf-israels-projects-d88997c7.vercel.app',  // Vercel frontend
  'http://localhost:5000'  // Your local backend (for internal requests)
];

// Configure CORS dynamically
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    // Check if the origin is in the allowedOrigins array
    if (allowedOrigins.includes(origin)) {
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

// Debug to see if MONGO_URI is correctly loaded
console.log('Mongo URI:', process.env.MONGO_URI);

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const activityRoutes = require('./routes/activities');

// Define routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/activities', activityRoutes);

// Root route to handle requests to the home page
app.get('/', (req, res) => {
  res.send('Welcome to the TRACKiT API');
});

// Mongoose connection
mongoose.set('strictQuery', false); // Suppress deprecation warning

mongoose.connect(process.env.MONGO_URI, {
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
.catch(err => {
  console.error('Database connection error:', err);
});
