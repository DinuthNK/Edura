import express  from 'express'
import { updateRoleToEducator } from '../controllers/educatorController.js'
import { requireAuth } from '@clerk/express';

const educatorRouter = express.Router()

//add educator role


educatorRouter.get('/update-role', requireAuth(), updateRoleToEducator);


export default educatorRouter;