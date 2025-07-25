import stripe from "stripe";
import User from "../models/User.js";
import Course from "../models/Course.js";
import { Purchase } from "../models/Purchase.js";

const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

export const stripeWebhooks = async (req, res) => {
  try {
    const sig = req.headers['stripe-signature'];
    const rawBody = req.rawBody; // You need this raw body from express middleware
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;
    try {
      event = stripeInstance.webhooks.constructEvent(rawBody, sig, endpointSecret);
    } catch (err) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const purchaseId = session.metadata.purchaseId;

      const purchase = await Purchase.findById(purchaseId);
      if (!purchase) return res.status(404).json({ success: false, message: "Purchase not found" });

      const course = await Course.findById(purchase.courseId);
      const user = await User.findById(purchase.userId);

      if (!course || !user) return res.status(404).json({ success: false, message: "Course or user not found" });

      if (!user.enrolledCourses.includes(course._id)) {
        user.enrolledCourses.push(course._id);
        await user.save();
      }

      if (!course.enrolledStudents.includes(user._id)) {
        course.enrolledStudents.push(user._id);
        await course.save();
      }

      purchase.status = 'completed';
      await purchase.save();

      return res.status(200).json({ success: true, message: "Enrollment completed" });
    }

    res.status(200).send("Event received");
  } catch (error) {
    console.error("Webhook error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
