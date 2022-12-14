import express from 'express';
import controller from '../controllers/messagesController';

const router = express.Router();

router.post('/addmsg', controller.addMessage);
router.post('/getmsg', controller.getAllMessages);

export default router;