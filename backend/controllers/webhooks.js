import { Webhook } from 'svix';
import User from '../models/User.js';

export const clerkWebhooks = async (req, res) => {
  console.log('Webhook body:', req.body);

  const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

  try {
    await whook.verify(JSON.stringify(req.body), {
      'svix-id': req.headers['svix-id'],
      'svix-timestamp': req.headers['svix-timestamp'],
      'svix-signature': req.headers['svix-signature'],
    });
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return res.status(400).json({ success: false, message: 'Invalid signature' });
  }

  const { type, data } = req.body;

  console.log('Event type:', type);

  try {
    if (type === 'user.created') {
      if (!data || !data.id) {
        return res.status(400).json({ success: false, message: 'Invalid user data' });
      }

      const userData = {
        _id: data.id,
        email: data.email_addresses?.[0]?.email_address || '',
        name: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
        imageUrl: data.image_url || '',
      };

      console.log('Creating user:', userData);
      await User.create(userData);

      return res.json({ success: true });
    }

    if (type === 'user.updated') {
      if (!data || !data.id) {
        return res.status(400).json({ success: false, message: 'Invalid user data' });
      }

      const userData = {
        email: data.email_addresses?.[0]?.email_address || '',
        name: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
        imageUrl: data.image_url || '',
      };

      console.log('Updating user:', data.id, userData);
      await User.findByIdAndUpdate(data.id, userData, { new: true, runValidators: true });

      return res.json({ success: true });
    }

    if (type === 'user.deleted') {
      if (!data || !data.id) {
        return res.status(400).json({ success: false, message: 'Invalid user data' });
      }

      console.log('Deleting user:', data.id);
      await User.findByIdAndDelete(data.id);

      return res.json({ success: true });
    }

    console.log('Unhandled event type:', type);
    return res.status(400).json({ success: false, message: 'Unhandled event type' });
  } catch (err) {
    console.error('Database operation failed:', err);
    return res.status(500).json({ success: false, message: 'Database error' });
  }
};
