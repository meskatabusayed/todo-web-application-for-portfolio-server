/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */

import { todoServices } from './todo.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import status from 'http-status';

const createTodo = catchAsync(async (req, res) => {
  const  todoData = req.body;
  const result = await todoServices.createTodoIntoDB(todoData);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Todo created successfully',
    data: result,
  });
});

const getAllTodo = catchAsync(async (req, res) => {
  const result = await todoServices.getAllTodosFromDB();
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'todos are retrieve successfully',
    data: result,
  });
});

const getSingleTodo = catchAsync(async (req, res) => {
  const { todoId } = req.params;
  const result = await todoServices.getSingleTodosFromDB(todoId);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Todo mis Retrieve successfully',
    data: result,
  });
});
export const todoControllers = {
  createTodo,
  getAllTodo,
  getSingleTodo,
};
