/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable prettier/prettier */
import { JwtPayload } from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request{
            user : JwtPayload;
        }
    }
}