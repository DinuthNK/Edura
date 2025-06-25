import { Webhook } from "svix";
import User from "../models/User.js";

export const clerkWebhooks = async (req, res) => {
  try {
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    const evt = wh.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { data, type } = evt;

    console.log(`🔔 Webhook received: ${type} | ID: ${data.id}`);

    if (type === "user.created") {
      await User.create({
        _id: data.id,
        email: data.email_addresses?.[0]?.email_address || "",
        name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
        imageUrl: data.image_url || "",
      });
    }

    if (type === "user.updated") {
      await User.findByIdAndUpdate(data.id, {
        email: data.email_addresses?.[0]?.email_address || "",
        name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
        imageUrl: data.image_url || "",
      });
    }

    if (type === "user.deleted") {
      const deleted = await User.findByIdAndDelete(data.id);
      if (!deleted) {
        console.warn(`⚠️ User not found for deletion: ${data.id}`);
      }
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("❌ Webhook error:", err.message);
    res.status(400).json({ success: false, message: err.message });
  }
};
