/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable prettier/prettier */
import mongoose from 'mongoose';
import generateId from '../counter/counter.utils';
import { TTodo } from './todo.interface';
import { TodoModel } from './todo.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { todoSearchFields } from './todo.constant';


const createTodoIntoDB = async (payload: TTodo) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // Step 1: Generate ID
    const id = await generateId("todo", "td" , session);

    // Step 2: Create Todo inside transaction
    const result = await TodoModel.create(
      [
        {
          ...payload,
          id,
        },
      ],
      { session }
    );

    // Step 3: Commit
    await session.commitTransaction();
    session.endSession();

    return result[0];
  } catch (error) {
    // Rollback
    await session.abortTransaction();
    session.endSession();

    throw error;
  }
};

const getAllTodosFromDB = async (query: Record<string, unknown>) => {
  const queryBuilder = new QueryBuilder(
    TodoModel.find(),
    query
  );

  const result = await queryBuilder
    .search(todoSearchFields) 
    .filter()
    .sort()
    .paginate()
    .fields()
    .modelQuery;

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
