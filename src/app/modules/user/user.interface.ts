/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Model } from "mongoose";

/* eslint-disable prettier/prettier */
export interface IUser  {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  isActive: boolean;
  isDeleted: boolean;
};

export interface UserModelType extends Model<IUser> {
  isUserExistByCustomID(id: string): Promise<IUser | null>;
  isUserDeActive(id: string): Promise<boolean>;
  isUserDeleted(id : string) : Promise<boolean>;
  isPasswordMatched(plainTextPassword : string , hashedPassword : string) : Promise<boolean>;

}
