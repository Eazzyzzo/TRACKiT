const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // User model
const RefreshToken = require('../models/RefreshToken'); // Refresh token model
const router = express.Router();

// Utility functions for generating tokens
const generateAccessToken = (user) => {
  return jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ userId: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};

// Helper functions for token operations
const storeRefreshToken = async (token, userId) => {
  await RefreshToken.create({ token, userId });
};

const verifyRefreshToken = async (token) => {
  return await RefreshToken.findOne({ token });
};

const deleteRefreshToken = async (token) => {
  await RefreshToken.deleteOne({ token });
};

// POST: /api/auth/register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    const accessToken = generateAccessToken(newUser);
    const refreshToken = generateRefreshToken(newUser);

    await storeRefreshToken(refreshToken, newUser._id);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
    res.status(201).json({ accessToken, message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during registration:', error.message);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// POST: /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await storeRefreshToken(refreshToken, user._id);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
    res.json({ accessToken });
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// POST: /api/auth/refresh
router.post('/refresh', async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token not provided' });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    console.log('Decoded refresh token:', decoded); // Debugging

    const storedToken = await verifyRefreshToken(refreshToken);
    if (!storedToken) {
      return res.status(403).json({ message: 'Invalid refresh token' });
    }

    const newAccessToken = generateAccessToken({ _id: decoded.userId });
    const newRefreshToken = generateRefreshToken({ _id: decoded.userId });

    await deleteRefreshToken(refreshToken);
    await storeRefreshToken(newRefreshToken, decoded.userId);

     console.log('New access token:', newAccessToken); // Debugging
    console.log('New refresh token:', newRefreshToken); // Debugging

    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    console.error('Error refreshing token:', error);
    if (error.name === 'TokenExpiredError') {
      return res.status(403).json({ message: 'Refresh token expired' });
    }
    res.status(403).json({ message: 'Invalid refresh token' });
  }
});

// POST: /api/auth/logout
router.post('/logout', async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  try {
    await deleteRefreshToken(refreshToken);

    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Error during logout:', error.message);
    res.status(500).json({ message: 'Server error during logout' });
  }
});

module.exports = router;
