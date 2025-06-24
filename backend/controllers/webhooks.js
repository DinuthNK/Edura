import { Webhook } from "svix";
import User from "../models/User.js";

export const clerkWebhooks = async (req, res) => {
  console.log("Webhook payload received:", req.body);

  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    try {
      await whook.verify(JSON.stringify(req.body), {
        "svix-id": req.headers["svix-id"],
        "svix-timestamp": req.headers["svix-timestamp"],
        "svix-signature": req.headers["svix-signature"],
      });
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }

    const { data, type } = req.body;
    console.log("Webhook event type:", type);

    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses?.[0]?.email_address || "",
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          imageUrl: data.image_url || "",
        };
        try {
          await User.create(userData);
          console.log("User created:", userData);
          return res.json({ success: true });
        } catch (err) {
          console.error("Failed to create user:", err);
          return res.status(500).json({ success: false, message: "Failed to create user" });
        }
      }

      case "user.updated": {
        const userData = {
          email: data.email_addresses?.[0]?.email_address || "",
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          imageUrl: data.image_url || "",
        };
        try {
          await User.findByIdAndUpdate(data.id, userData, { new: true, runValidators: true });
          console.log("User updated:", data.id, userData);
          return res.json({ success: true });
        } catch (err) {
          console.error("Failed to update user:", err);
          return res.status(500).json({ success: false, message: "Failed to update user" });
        }
      }

      case "user.deleted": {
        try {
          await User.findByIdAndDelete(data.id);
          console.log("User deleted:", data.id);
          return res.json({ success: true });
        } catch (err) {
          console.error("Failed to delete user:", err);
          return res.status(500).json({ success: false, message: "Failed to delete user" });
        }
      }

      default:
        console.log("Unhandled webhook type:", type);
        return res.status(400).json({ success: false, message: "Unhandled webhook type" });
    }
  } catch (error) {
    console.error("Webhook handler error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
