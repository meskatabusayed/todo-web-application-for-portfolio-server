/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import express from 'express';
import { todoControllers } from './todo.controller';
import validateRequest from '../../middlewares/validateRequest';
import { todoValidations } from './todo.validation';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post('/create-todo', auth(), validateRequest(todoValidations.createTodoValidationSchema), todoControllers.createTodo);
router.get('/', todoControllers.getAllTodo);
router.get('/:todoId', todoControllers.getSingleTodo);
router.patch('/:todoId' , todoControllers.updateTodo);
router.delete('/:todoId' , todoControllers.deleteTodo);


export const todoRouters = router;
