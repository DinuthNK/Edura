import express from 'express';

import { addCourse, updateRoleToEducator } from '../controllers/educatorController.js';
import upload from '../configs/multer.js';
import { protectEducator } from '../middlewares/AuthMIddleware.js';

const educatorRouter = express.Router();

// Protect this route with Clerk
educatorRouter.get('/update-role',  updateRoleToEducator);
educatorRouter.post('/add-course', upload.single('image'),
 protectEducator, addCourse)



export default educatorRouter;
