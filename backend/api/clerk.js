import { Webhook } from "svix";
import connectDB from "../configs/mongodb";
import User from "../models/User";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  await connectDB();

  const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

  try {
    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });
  } catch (error) {
    console.error("Webhook verification failed:", error);
    return res.status(400).json({ success: false, message: "Invalid signature" });
  }

  const { type, data } = req.body;

  try {
    if (type === "user.created") {
      await User.create({
        _id: data.id,
        email: data.email_addresses?.[0]?.email_address || "",
        name: `${data.first_name} ${data.last_name}`.trim(),
        imageUrl: data.image_url || "",
      });
      return res.json({ success: true });
    }

    if (type === "user.updated") {
      await User.findByIdAndUpdate(
        data.id,
        {
          email: data.email_addresses?.[0]?.email_address || "",
          name: `${data.first_name} ${data.last_name}`.trim(),
          imageUrl: data.image_url || "",
        },
        { new: true }
      );
      return res.json({ success: true });
    }

    if (type === "user.deleted") {
      await User.findByIdAndDelete(data.id);
      return res.json({ success: true });
    }

    return res.status(400).json({ success: false, message: "Unhandled event type" });
  } catch (err) {
    console.error("DB operation error:", err);
    return res.status(500).json({ success: false, message: "Database error" });
  }
}
