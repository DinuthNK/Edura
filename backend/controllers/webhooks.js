import { Webhook } from "svix";
import User from "../models/User.js";

export const clerkWebhooks = async (req, res) => {
  try {
    const svix = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"]
    };

    const payload = req.body; // Buffer, because of express.raw()

    const event = svix.verify(payload, headers);

    const { data, type } = event;

    switch (type) {
      case 'user.created': {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          imageUrl: data.image_url
        };
        await User.create(userData);
        return res.status(200).json({});
      }

      case 'user.updated': {
        const userData = {
          email: data.email_addresses[0].email_address,
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          imageUrl: data.image_url
        };
        await User.findByIdAndUpdate(data.id, userData);
        return res.status(200).json({});
      }

      case 'user.deleted': {
        await User.findByIdAndDelete(data.id);
        return res.status(200).json({});
      }

      default:
        return res.status(400).json({ error: "Unhandled event type" });
    }
  } catch (error) {
    console.error("Webhook Error:", error.message);
    return res.status(400).json({ success: false, message: error.message });
  }
};
