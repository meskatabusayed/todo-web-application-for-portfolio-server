/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable prettier/prettier */
import { ZodError } from "zod";
import { TErrorSources, TGenericErrorResponse } from "../interface/error";

const handleZodError = (err: ZodError): TGenericErrorResponse => {
  const errorSources: TErrorSources = err.issues.map((issue) => {
    const lastPath = issue.path?.[issue.path.length - 1];

    return {
      path:
        typeof lastPath === "number"
          ? lastPath
          : typeof lastPath === "string"
          ? lastPath
          : String(lastPath ?? ""), // fallback (handles symbol/undefined)
      message: issue.message,
    };
  });

  return {
    statusCode: 400,
    message: "Validation Error",
    errorSources,
  };
};

export default handleZodError;