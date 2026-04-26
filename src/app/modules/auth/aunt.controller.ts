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

export const authControllers = {
    loginUser,

}