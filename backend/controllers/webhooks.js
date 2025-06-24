import { Webhook } from "svix";
import User from "../models/User.js";

export const clerkWebhooks = async (req, res) => {
  console.log("📩 Clerk webhook received");

  try {
    // Verify the raw webhook payload
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    const evt = wh.verify(req.body, {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { type, data } = evt;
    console.log("✅ Event type:", type);

    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses?.[0]?.email_address || "",
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          imageUrl: data.image_url || "",
        };

        await User.create(userData);
        console.log("💾 User created:", userData);
        break;
      }

      case "user.updated": {
        const updateData = {
          email: data.email_addresses?.[0]?.email_address || "",
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          imageUrl: data.image_url || "",
        };

        await User.findByIdAndUpdate(data.id, updateData);
        console.log("🔁 User updated:", data.id);
        break;
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        console.log("🗑️ User deleted:", data.id);
        break;
      }

      default:
        console.log("ℹ️ Unhandled event type:", type);
        break;
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("❌ Webhook error:", error.message);
    return res.status(400).json({ success: false, message: error.message });
  }
};
