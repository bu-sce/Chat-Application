import express from 'express';
import  controller from '../controllers/userController';

const router = express.Router();
router.post('/login', controller.readUser);
router.post('/register', controller.createUser);
router.get('/allusers/:id', controller.readAll); 
router.get('/setAvatar/:id', controller.setAvatar); 
//router.get("/logout/:id", logOut);

export default router;
