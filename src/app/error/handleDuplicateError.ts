/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/consistent-type-imports */
import { TErrorSources, TGenericErrorResponse } from '../interface/error';


const handleDuplicateError = (
  err: any
): TGenericErrorResponse => {
  const match = err.message.match(/"([^"]*)"/);
  const extecdMessage = match && match[1];
  const errorSources: TErrorSources = [
    {
      path: ' ',
      message: `${extecdMessage} is Already Exist!`,
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation Error',
    errorSources,
  };
};

export default handleDuplicateError;