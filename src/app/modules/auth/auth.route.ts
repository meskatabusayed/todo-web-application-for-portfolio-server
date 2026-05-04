/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
import express from 'express';
import { authControllers } from './aunt.controller';
import validateRequest from '../../middlewares/validateRequest';
import { authValidation } from './auth.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.const';

const router = express.Router();

router.post('/login' , validateRequest(authValidation.loginValidationSchema), authControllers.loginUser);

router.post('/change-password' , auth(USER_ROLE.user , USER_ROLE.admin), validateRequest(authValidation.changePasswordValidationSchema) , authControllers.changePassword);

export const authRouter = router;