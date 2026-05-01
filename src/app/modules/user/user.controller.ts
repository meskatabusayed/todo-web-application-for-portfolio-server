/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { userServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import status from 'http-status';
import catchAsync from '../../utils/catchAsync';

const createUser = catchAsync(async (req, res) => {
  const result = await userServices.createUserIntoDB(req.body);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'User created successfully',
    data: result,
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const result = await userServices.createAdminIntoDB(req.body);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Admin created successfully',
    data: result,
  });
});

const getAllUser = catchAsync(async (req, res) => {
  const result = await userServices.getAllUserFromDB();
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Users retrieve successfully',
    data: result,
  });
});

const getSingleUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await userServices.getSingleUserFromDB(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'User retrieve successfully',
    data: result,
  });
});


const updateUser = catchAsync(async (req, res) => {
  const { userId } = req.params;   
  const payload = req.body;  
  const result = await userServices.updateUserInDB(userId as string, payload);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'User updated successfully',
    data: result,
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const { userId } = req.params;

  const result = await userServices.deleteUserFromDB(userId as string);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'User deleted successfully',
    data: result,
  });
});

export const userControllers = {
  createUser,
  createAdmin,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser 
};
