/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/consistent-type-imports */
import { NextFunction, Request, Response } from 'express';

import catchAsync from '../utils/catchAsync';

import status from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';
import AppError from '../error/AppError';
import { UserModel } from '../modules/user/user.model';


const auth = (...requiredRoles: TUserRole[]) => {
  //console.log("roles" , ...requiredRoles)
  
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    console.log("req" , req.headers.authorization);
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(status.UNAUTHORIZED, 'You are Not Authorized');
    }

    const decode = jwt.verify(
      token,
      config.jwt_access_secret as string
    ) as JwtPayload;
   

    const {role , id , iat} = decode;
    const user = await UserModel.isUserExistByCustomID(id);

    if (!user) {
      throw new AppError(status.NOT_FOUND, 'This user is not found !!!');
    }
    // checking if the user is already deleted
  
    const isDeleted = user?.isDeleted;
  
    if (isDeleted) {
      throw new AppError(status.FORBIDDEN, 'This user is deleted !');
    }
  

    if(user.passwordChangedAt && UserModel.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt , iat as number)){

      throw new AppError(status.UNAUTHORIZED, 'You are Not Authorized');
    }
  

  

    if (requiredRoles && !requiredRoles.includes(role.toLowerCase())) {
      throw new AppError(status.UNAUTHORIZED, 'You are Not Authorized!!');
    }

    req.user = decode as JwtPayload;
    next();
  });
};

export default auth;