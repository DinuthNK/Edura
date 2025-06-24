import express from 'express';
import { Webhook } from 'svix';
import { buffer } from 'micro';
import User from '../models/userModel.js'; // Your Mongoose User model

const router = express.Router();

router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const payload = req.body;
  const headers = req.headers;

  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

  let evt;
  try {
    evt = wh.verify(payload, headers);
  } catch (err) {
    console.error('Webhook verification failed:', err.message);
    return res.status(400).send('Invalid webhook');
  }

  const eventType = evt.type;
  const data = evt.data;

  if (eventType === 'user.created' || eventType === 'user.updated') {
    const { id, email_addresses, first_name, last_name } = data;

    const email = email_addresses[0]?.email_address || '';

    await User.findOneAndUpdate(
      { clerkId: id },
      {
        clerkId: id,
        email,
        firstName: first_name,
        lastName: last_name,
      },
      { upsert: true, new: true }
    );
  }

  res.status(200).json({ success: true });
});

export default router;
