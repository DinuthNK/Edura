import express from "express";
import { clerkWebhooks } from "../api/clerkWebhook.js";

const router = express.Router();

router.post("/clerkWebhook", clerkWebhooks);

export default router;
