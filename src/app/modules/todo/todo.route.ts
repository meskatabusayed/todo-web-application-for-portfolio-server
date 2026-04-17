/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import express from 'express';
import { todoControllers } from './todo.controller';
import validateRequest from '../../middlewares/validateRequest';
import { todoValidations } from './todo.validation';

const router = express.Router();

router.post('/create-todo', validateRequest(todoValidations.createTodoValidationSchema), todoControllers.createTodo);
router.get('/', todoControllers.getAllTodo);
router.get('/:todoId', todoControllers.getSingleTodo);

export const todoRouters = router;
