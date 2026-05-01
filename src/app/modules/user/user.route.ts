/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import express from 'express';
import { userControllers } from './user.controller';

const router = express.Router();

router.post('/create-user', userControllers.createUser);
router.post('/create-admin', userControllers.createAdmin);
router.get('/', userControllers.getAllUser);
router.get('/:id', userControllers.getSingleUser);
router.patch('/:userId' , userControllers.updateUser);
router.delete('/:userId' , userControllers.deleteUser);
export const userRouter = router;
