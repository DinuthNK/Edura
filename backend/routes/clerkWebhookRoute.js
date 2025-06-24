import express from "express";
import { clerkWebhooks } from "../controllers/clerkWebhookController.js";

const router = express.Router();

// Clerk sends raw body, not JSON
import bodyParser from "body-parser";
router.post(
  "/clerk",
  bodyParser.raw({ type: "application/json" }),
  clerkWebhooks
);

export default router;
