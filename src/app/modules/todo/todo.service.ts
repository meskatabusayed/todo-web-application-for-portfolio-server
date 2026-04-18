/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable prettier/prettier */
import { TTodo } from './todo.interface';
import { TodoModel } from './todo.model';

const createTodoIntoDB = async (payload: TTodo) => {
  const result = await TodoModel.create(payload);
  return result;
};

const getAllTodosFromDB = async () => {
  const result = await TodoModel.find();
  return result;
};

const getSingleTodosFromDB = async (id: any) => {
  const result = await TodoModel.findOne({ id });
  return result;
};

const updateTodoInDB = async (id: string, payload: TTodo) => {
  const result = await TodoModel.findOneAndUpdate(
    { _id :  id },          
    payload,         
    { new: true }    
  );
  return result;
  
};

const deleteTodoFromDB = async (id: string) => {
  const result = await TodoModel.findOneAndUpdate(
    { _id: id },                 
    { isDeleted: true },         
    { new: true }
  );
  return result;
};


export const todoServices = {
  createTodoIntoDB,
  getAllTodosFromDB,
  getSingleTodosFromDB,
  updateTodoInDB,
  deleteTodoFromDB

};
