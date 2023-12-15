import express from 'express';
import UserController from '../Controllers/auth.controller';

const router = express.Router();

router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);

export default router;