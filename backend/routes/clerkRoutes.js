import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Clerk Webhook Handler
router.post('/', async (req, res) => {
  try {
    const { object, type, data } = req.body;

    // Handle user.created event from Clerk
    if (object === 'event' && type === 'user.created') {
      const userData = data;

      const newUser = new User({
        _id: userData.id,
        name: `${userData.first_name} ${userData.last_name}`,
        email: userData.email_addresses[0].email_address,
        imageUrl: userData.image_url,
        enrolledCourses: [],
      });

      await newUser.save();
      console.log('✅ Clerk user saved to MongoDB:', newUser);
      return res.status(201).json({ message: 'User created' });
    }

    res.status(200).json({ message: 'No action taken' });
  } catch (error) {
    console.error('❌ Error in Clerk webhook:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
