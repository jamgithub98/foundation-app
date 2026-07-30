import express from 'express';
import cloudinary from '../config/cloudinary.js';
import upload from '../middleware/upload.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, (req, res, next) => {
  // Multer ka error handle karne ke liye wrapper
  upload.single('image')(req, res, (err) => {
    if (err) {
      console.error('🔥 Multer Error:', err.message);
      return res.status(400).json({ message: err.message || 'File upload error' });
    }
    next();
  });
}, async (req, res) => {
  try {
    console.log('🔥 Upload route hit.');
    
    // Check karo ki file aayi ya nahi
    if (!req.file) {
      console.log('❌ No file received');
      return res.status(400).json({ message: 'No file uploaded' });
    }

    console.log('📁 File path:', req.file.path);
    console.log('📁 File size:', req.file.size);

    // Cloudinary par upload karo
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'foundation_projects',
    });
    
    console.log('✅ Cloudinary Success:', result.secure_url);
    res.json({ imageUrl: result.secure_url });
  } catch (error) {
    console.error('❌ Cloudinary Error Details:', error);
    // Proper message return karo
    res.status(500).json({ 
      message: error.message || 'Cloudinary upload failed',
      details: error
    });
  }
});

export default router;