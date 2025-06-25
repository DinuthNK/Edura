// backend/routes/clerkRoutes.js
import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Route to handle incoming Clerk webhook
router.post('/', async (req, res) => {
  try {
    const { id, email_addresses, image_url, first_name, last_name } = req.body;

    // Validate required fields from Clerk
    const email = email_addresses?.[0]?.email_address;
    if (!id || !email) {
      return res.status(400).json({ error: 'Missing required Clerk user data' });
    }

    // Check if user already exists
    const existingUser = await User.findById(id);
    if (existingUser) {
      return res.status(200).json({ message: 'User already exists' });
    }

    // Create new user document
    const newUser = new User({
      _id: id,
      name: `${first_name || ''} ${last_name || ''}`.trim(),
      email,
      imageUrl: image_url,
    });

    // Save user to database
    await newUser.save();
    res.status(201).json({ message: 'User saved to MongoDB' });

  } catch (error) {
    console.error('Error saving Clerk user:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
