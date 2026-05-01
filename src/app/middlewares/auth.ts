/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/consistent-type-imports */
import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import status from 'http-status';
import AppError from '../error/AppError';

const auth = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if(!token){
    throw new AppError(status.UNAUTHORIZED , "You are not Authorized");
  }



    next();
  });
};

export default auth;