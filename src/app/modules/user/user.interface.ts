/* eslint-disable prettier/prettier */
export type TUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  isActive: boolean;
  isDeleted: boolean;
};
