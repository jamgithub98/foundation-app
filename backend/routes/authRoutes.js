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

// @route PUT /api/auth/change-password
// @desc Change password of logged-in admin
// @access Private
router.put('/change-password', protect, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: 'Please provide current and new password' });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({ message: 'New password must be at least 6 characters long' });
  }

  const user = await User.findById(req.user._id);

  // Check if current password matches
  const isMatch = await user.matchPassword(currentPassword);
  if (!isMatch) {
    return res.status(401).json({ message: 'Current password is incorrect' });
  }

  // Update password (User model's pre('save') hook will automatically hash it)
  user.password = newPassword;
  await user.save();

  res.json({ message: 'Password changed successfully' });
});

// @route POST /api/auth/admin/register
// @desc Add a new admin user (only by existing admin)
// @access Private/Admin
router.post('/admin/register', protect, async (req, res) => {
  const { name, email, password } = req.body;

  // Check if logged-in user is actually an admin (optional, since we have isAdmin field)
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: 'Not authorized. Admin only.' });
  }

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please provide name, email, and password' });
  }

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'User with this email already exists' });
  }

  // Create new admin user
  const user = await User.create({
    name,
    email,
    password,
    isAdmin: true // New users are also admins
  });

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    message: 'New admin user created successfully'
  });
});
export default router;