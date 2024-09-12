// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Debug to see if MONGO_URI is correctly loaded
console.log('Mongo URI:', process.env.MONGO_URI);

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Define routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Root route to handle requests to the home page
app.get('/', (req, res) => {
    res.send('Welcome to the TRACKiT API');
});

// Mongoose connection
mongoose.set('strictQuery', false); // Suppress deprecation warning

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
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
