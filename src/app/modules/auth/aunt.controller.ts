/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import { authServices } from "./auth.service";
import sendResponse from "../../utils/sendResponse";

const loginUser = catchAsync(async(req , res) => {
    const result = await authServices.loginUser(req.body);
    sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'User Login successfully',
    data: result,
  });
});

const changePassword = catchAsync(async (req, res) => {
  const { ...passwordData } = req.body;

  const result = await authServices.changePassword(req.user, passwordData);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Password is updated succesfully!',
    data: result,
  });
});
export const authControllers = {
    loginUser,
    changePassword,

}