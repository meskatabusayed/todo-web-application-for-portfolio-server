/* eslint-disable prettier/prettier */

export type TTodo = {
  id: string;
  title: string;
  description?: string;
  status: 'pending' | 'completed';
  createdAt?: Date;
  updatedAt?: Date;
};
