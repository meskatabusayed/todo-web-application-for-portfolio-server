/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Model } from "mongoose";
import { USER_ROLE } from "./user.const";

/* eslint-disable prettier/prettier */
export interface IUser  {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  passwordChangedAt? : Date;
  isActive: boolean;
  isDeleted: boolean;
};

export type TUserRole = keyof typeof USER_ROLE;

export interface UserModelType extends Model<IUser> {
  isUserExistByCustomID(id: string): Promise<IUser | null>;
  isUserDeActive(id: string): Promise<boolean>;
  isUserDeleted(id : string) : Promise<boolean>;
  isPasswordMatched(plainTextPassword : string , hashedPassword : string) : Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(passwordChangedTimestamp : Date , jwtIssuedTimestamp: number) : boolean;

}
