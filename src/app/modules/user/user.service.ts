/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable prettier/prettier */

import generateId from '../counter/counter.utils';
import { TUser } from './user.interface';
import { UserModel } from './user.model';

const createUserIntoDB = async (userData: TUser) => {
  const id = await generateId('user' , 'us');
  const result = await UserModel.create({
    ...userData,
    id
  });
  return result;
};

const getAllUserFromDB = async () => {
  const result = await UserModel.find();
  return result;
};

const getSingleUserFromDB = async (id: any) => {
  const result = await UserModel.findById(id);
  return result;
};

const updateUserInDB = async (id: string, payload: TUser) => {
  const result = await UserModel.findOneAndUpdate(
    { _id :  id },          
    payload,         
    { new: true }    
  );
  return result;
  
};

const deleteUserFromDB = async (id: string) => {
  const result = await UserModel.findOneAndUpdate(
    { _id: id },                 
    { isDeleted: true },         
    { new: true }
  );
  return result;
};

export const userServices = {
  createUserIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  updateUserInDB,
  deleteUserFromDB,
};
