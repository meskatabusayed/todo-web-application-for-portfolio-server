/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable prettier/prettier */

import mongoose from 'mongoose';
import generateId from '../counter/counter.utils';
import { IUser } from './user.interface';
import { UserModel } from './user.model';

const createUserIntoDB = async (userData: IUser) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // same session pass
    const id = await generateId("user", "us", session);

    const result = await UserModel.create(
      [
        {
          ...userData,
          id,
        },
      ],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    return result[0];
  } catch (error) {
    await session.abortTransaction(); // rollback
    session.endSession();

    throw error;
  }
};

const createAdminIntoDB = async (userData: IUser) => {
  const session = await mongoose.startSession();

  try {
    let createdUser;

    await session.withTransaction(async () => {
      const adminData = {
        ...userData,
        role: "admin",
      };

      const id = await generateId("admin", "ad", session);

      const result = await UserModel.create(
        [
          {
            ...adminData,
            id,
          },
        ],
        { session }
      );

      createdUser = result[0];
    });

    return createdUser;
  } catch (error : any) {
    throw new Error(error);
  } finally {
    session.endSession(); 
  }
};

const getAllUserFromDB = async () => {
  const result = await UserModel.find();
  return result;
};

const getSingleUserFromDB = async (id: any) => {
  const result = await UserModel.findById(id);
  return result;
};

const updateUserInDB = async (id: string, payload: IUser) => {
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
  createAdminIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  updateUserInDB,
  deleteUserFromDB,

};
