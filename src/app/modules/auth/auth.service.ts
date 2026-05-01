/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/consistent-type-imports */
import status from "http-status";
import AppError from "../../error/AppError";
import { TLoginUser } from "./auth.interface";
import { UserModel } from "../user/user.model";
import jwt from 'jsonwebtoken';
import config from "../../config";


export const loginUser = async (payload: TLoginUser) => {
  const { id, password } = payload;

  //1. Check user exists + get password
  const user = await UserModel.isUserExistByCustomID(id);

  if (!user) {
    throw new AppError(status.NOT_FOUND, "User not found");
  }

  //2. Check if deleted
  const isDeleted = await UserModel.isUserDeleted(id);
  if (isDeleted) {
    throw new AppError(status.FORBIDDEN, "User is deleted");
  }

  // 3. Check if deactivated
  const isInactive = await UserModel.isUserDeActive(id);
  if (isInactive) {
    throw new AppError(status.FORBIDDEN, "User is Blocked");
  }

  // 4. Check password
  const isPasswordMatched = await UserModel.isPasswordMatched(
    password,
    user.password
  );
;

  if (!isPasswordMatched) {
    throw new AppError(status.UNAUTHORIZED, "Invalid credentials");
  }

  // 5. Create JWT payload
  const jwtPayload = {
    id: user.id,
    role: user.role,
  };

  // 6. Generate tokens
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret!, {
    expiresIn: "1d",
  });



 
  return {
    accessToken
  }

};

export const authServices = {
    loginUser,

}