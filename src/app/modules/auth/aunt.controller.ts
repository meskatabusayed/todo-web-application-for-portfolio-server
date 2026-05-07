/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import { authServices } from "./auth.service";
import sendResponse from "../../utils/sendResponse";
import config from "../../config";

const loginUser = catchAsync(async(req , res) => {
    const result = await authServices.loginUser(req.body);
    const {refreshToken , accessToken} = result;

    res.cookie('refreshToken' , refreshToken , {
      secure : config.node_env === 'production',
      httpOnly : true 
    });

    sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'User Login successfully',
    data: {
      accessToken
    },
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

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  
  
  const result = await authServices.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Access token is retrieved succesfully!',
    data: result,
  });
});

const forgetPassword = catchAsync(async (req, res) => {
  const userId = req.body.id;
  const result = await authServices.forgetPassword(userId);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Reset link is generated succesfully!',
    data: result,
  });
});

const resetPassword = catchAsync(async (req, res) => {
  const token = req.headers.authorization;

  const result = await authServices.resetPassword(req.body, token as string);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Password reset successful!',
    data: result,
  });
});

export const authControllers = {
    loginUser,
    changePassword,
    refreshToken, 
    forgetPassword,
    resetPassword,
}