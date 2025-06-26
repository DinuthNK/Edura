import express from 'express';
import { requireAuth } from '@clerk/express';
import { addCourse, updateRoleToEducator } from '../controllers/educatorController.js';
import upload from '../configs/multer.js';
import { protectEducator } from '../middlewares/authMiddleware.js';

const educatorRouter = express.Router();

// Protect this route with Clerk
educatorRouter.get('/update-role', requireAuth(), updateRoleToEducator);
educatorRouter.post('/add-course', upload.single('image'),
 protectEducator, addCourse);



export default educatorRouter;
