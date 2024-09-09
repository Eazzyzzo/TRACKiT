// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Import routes
const authRoutes = require('./routes/auth'); // Adjust path if your auth.js file is located somewhere else
const userRoutes = require('./routes/users'); // Adjust or add other routes as needed

// Initialize Express app
const app = express();

// Middleware
app.use(express.json()); // Parse incoming JSON requests
app.use(cors()); // Enable Cross-Origin Resource Sharing

// Define routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes); // Example of a user route

// Root route to handle requests to the home page
app.get('/', (req, res) => {
    res.send('Welcome to the TRACKiT API');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to MongoDB');
    // Start the server
    app.listen(3000, () => {
        console.log('Server running on port 3000');
    });
})
.catch(err => {
    console.error('Database connection error:', err);
});
