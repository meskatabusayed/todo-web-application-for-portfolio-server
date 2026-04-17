/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable prettier/prettier */
import { TTodo } from './todo.interface';
import { TodoModel } from './todo.model';

const createTodoIntoDB = async (todo: TTodo) => {
  const result = await TodoModel.create(todo);
  return result;
};

const getAllTodosFromDB = async () => {
  const result = await TodoModel.find();
  return result;
};

const getSingleTodosFromDB = async (id: any) => {
  const result = await TodoModel.findOne({ id });
  console.log(result);
  return result;
};
export const todoServices = {
  createTodoIntoDB,
  getAllTodosFromDB,
  getSingleTodosFromDB,
};
