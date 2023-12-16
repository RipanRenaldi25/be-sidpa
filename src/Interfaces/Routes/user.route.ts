import express from 'express';
import UserController from '../Controllers/user.controller';
import { authorizationMidleware } from '../Midlewares/authMidleware';

const router = express.Router();

router.get('/:nik', authorizationMidleware(["Admin"]), UserController.getUserByNik);


export default router;