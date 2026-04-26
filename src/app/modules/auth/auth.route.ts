/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
import express from 'express';
import { authControllers } from './aunt.controller';
import validateRequest from '../../middlewares/validateRequest';
import { authValidation } from './auth.validation';

const router = express.Router();

router.post('/login' , validateRequest(authValidation.loginValidationSchema), authControllers.loginUser);

export const authRouter = router;