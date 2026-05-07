/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */

import { todoServices } from './todo.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import status from 'http-status';

const createTodo = catchAsync(async (req, res) => {
  console.log(req.cookies);
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
  const result = await todoServices.getAllTodosFromDB(req.query);
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
    message: 'Todo  Retrieve successfully',
    data: result,
  });
});

const updateTodo = catchAsync(async (req, res) => {
  const { todoId } = req.params; 
      
  const payload = req.body;  
    

  const result = await todoServices.updateTodoInDB(todoId as string, payload);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Todo updated successfully',
    data: result,
  });
});

const deleteTodo = catchAsync(async (req, res) => {
  const { todoId } = req.params;

  const result = await todoServices.deleteTodoFromDB(todoId as string);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Todo deleted successfully',
    data: result,
  });
});


export const todoControllers = {
  createTodo,
  getAllTodo,
  getSingleTodo,
  updateTodo,
  deleteTodo
};
