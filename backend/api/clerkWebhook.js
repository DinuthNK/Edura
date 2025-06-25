import { Webhook } from "svix";
import User from "../models/User.js" // change if path differs
import connectDB from "../config/mongoDB.js"; // or wherever your DB connect file is

export const config = {
  api: {
    bodyParser: false, // IMPORTANT: svix needs raw body
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Only POST allowed");

  await connectDB(); // connect MongoDB

  let rawBody = "";
  req.on("data", (chunk) => {
    rawBody += chunk.toString();
  });

  req.on("end", async () => {
    try {
      const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

      const evt = webhook.verify(rawBody, {
        "svix-id": req.headers["svix-id"],
        "svix-timestamp": req.headers["svix-timestamp"],
        "svix-signature": req.headers["svix-signature"],
      });

      const { data, type } = evt;

      switch (type) {
        case "user.created":
          await User.create({
            _id: data.id,
            email: data.email_addresses[0].email_address,
            name: `${data.first_name} ${data.last_name}`,
            imageUrl: data.image_url,
          });
          break;

        case "user.updated":
          await User.findByIdAndUpdate(data.id, {
            email: data.email_addresses[0].email_address,
            name: `${data.first_name} ${data.last_name}`,
            imageUrl: data.image_url,
          });
          break;

        case "user.deleted":
          await User.findByIdAndDelete(data.id);
          break;
      }

      res.status(200).json({ success: true });
    } catch (err) {
      console.error("Webhook error:", err.message);
      res.status(400).json({ success: false, message: err.message });
    }
  });
}
