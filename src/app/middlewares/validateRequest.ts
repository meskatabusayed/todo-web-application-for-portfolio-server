/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/consistent-type-imports */
import { NextFunction, Request, Response } from 'express';
import { ZodObject } from 'zod';
import catchAsync from '../utils/catchAsync';

const validateRequest = (schema: ZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const parsedData = await schema.parseAsync({
      body: req.body,
      cookies : req.cookies,
    });

    req.body = parsedData.body; 

    next();
  });
};

export default validateRequest;