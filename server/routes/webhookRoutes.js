import express from "express";
import { stripeWebhooks } from "../controllers/stripeController.js";

const router = express.Router();

// Stripe requires raw body for signature verification
router.post("/stripe", express.raw({ type: "application/json" }), stripeWebhooks);

export default router;
