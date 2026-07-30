import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// @route POST /api/auth/register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const user = await User.create({ name, email, password });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token
  });
});

// @route POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const trimmedEmail = email?.trim();
  const trimmedPassword = password?.trim();

  console.log('📩 Login attempt for:', trimmedEmail);
  console.log('🔑 Password received:', trimmedPassword);

  const user = await User.findOne({ email: trimmedEmail });

  if (!user) {
    console.log('❌ User NOT found');
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  console.log('✅ User found. Stored Hash:', user.password);
  const isMatch = await user.matchPassword(trimmedPassword);
  console.log('🔐 Match result:', isMatch);

  if (isMatch) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token
    });
  } else {
    console.log('❌❌ PASSWORD MISMATCH');
    res.status(401).json({ message: 'Invalid email or password' });
  }
});

// 🔥 🔥 🔥 YEHI LINE SABSE IMPORTANT HAI 🔥 🔥 🔥
export default router;