import express from 'express';
import { requireAuth } from '@clerk/express';
import { updateRoleToEducator } from '../controllers/educatorController.js';

const educatorRouter = express.Router();

// Protect this route with Clerk
educatorRouter.get('/update-role', requireAuth(), updateRoleToEducator);

export default educatorRouter;
