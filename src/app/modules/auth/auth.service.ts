/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/consistent-type-imports */
import status from "http-status";
import AppError from "../../error/AppError";
import { TLoginUser } from "./auth.interface";
import { UserModel } from "../user/user.model";
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from "../../config";
import bcrypt from 'bcrypt';

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
    expiresIn: "1m",
  });

  const refreshToken = jwt.sign(jwtPayload, config.jwt_access_secret!, {
    expiresIn: "1m",
  });


 
  return {
    accessToken,
    refreshToken
  }

};

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string }
) => {
  // checking if the user is exist
  const user = await UserModel.isUserExistByCustomID(userData.id);

  console.log("user 72" , user);

  if (!user) {
    throw new AppError(status.NOT_FOUND, 'This user is not found !');
  }
  // checking if the user is already deleted

  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(status.FORBIDDEN, 'This user is deleted !');
  }

  // checking if the user is blocked

  const userStatus = user?.isActive;
  console.log("userStatus" , userStatus);

  if (!userStatus) {
    throw new AppError(status.FORBIDDEN, 'This user is blocked ! !');
  }

  //checking if the password is correct

  if (!(await UserModel.isPasswordMatched(payload.oldPassword, user?.password)))
    throw new AppError(status.FORBIDDEN, 'Password do not matched');

  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds)
  );

  await UserModel.findOneAndUpdate(
    {
      id: userData.id,
      role: userData.role,
    },
    {
      password: newHashedPassword,
      passwordChangedAt: new Date(),
    }
  );

  return null;
};

export const authServices = {
    loginUser,
    changePassword,

}