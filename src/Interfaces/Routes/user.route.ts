import express from 'express';
import UserController from '../Controllers/user.controller';
import { authorizationMidleware } from '../Midlewares/authMidleware';

const router = express.Router();

router.get('/documents', authorizationMidleware(['User']), UserController.getUserDocument);
router.get('/:nik', authorizationMidleware(['Admin', 'User']), UserController.getUserByNik);


export default router;