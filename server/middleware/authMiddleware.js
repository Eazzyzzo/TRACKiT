const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    
    if (!token) {
        console.log('No token provided');  // Log if token is missing
        return res.status(403).json({ message: 'No token provided' });
    }

    console.log('Token received:', token);  // Log the received token
    console.log('JWT_SECRET:', process.env.JWT_SECRET);  // Log the JWT secret

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error('Token verification error:', err.message);  // Log the error
            return res.status(401).json({ message: 'Invalid token' });  // Invalid token error
        }

        req.user = { _id: decoded.userId };  // Attach user ID to request
        console.log('Token decoded successfully, user ID:', decoded.userId);  // Log the decoded user ID
        next();  // Proceed
    });
};

module.exports = authMiddleware;
