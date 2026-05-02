/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import express from 'express';
import { userControllers } from './user.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { userValidations } from './user.validation';

const router = express.Router();

router.post('/create-user', validateRequest(userValidations.createUserValidationSchema), userControllers.createUser);
router.post('/create-admin',validateRequest(userValidations.createUserValidationSchema), userControllers.createAdmin);
router.get('/', auth() ,  userControllers.getAllUser);
router.get('/:id', userControllers.getSingleUser);
router.patch('/:userId' , userControllers.updateUser);
router.delete('/:userId' , userControllers.deleteUser);
export const userRouter = router;
