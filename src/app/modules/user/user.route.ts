/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import express from 'express';
import { userControllers } from './user.controller';

const router = express.Router();

router.post('/create-user', userControllers.createUser);
router.get('/', userControllers.getAllUser);
router.get('/:id', userControllers.getSingleUser);

export const userRouter = router;
