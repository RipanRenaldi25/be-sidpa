import express from 'express';
import UserController from '../Controllers/user.controller';

const router = express.Router();

router.get('/:nik', UserController.getUserByNik);


export default router;