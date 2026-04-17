/* eslint-disable prettier/prettier */
import { z } from 'zod';

export const createUserValidationSchema = z.object({
  body: z.object({
    id: z.string().min(1, 'User ID is required'),

    name: z
      .string()
      .min(2, 'Name must be at least 2 characters long')
      .max(50, 'Name cannot exceed 50 characters'),

    email: z.string().min(1, 'Email is required').email('Please provide a valid email address'),

    password: z.string().min(6, 'Password must be at least 6 characters long'),

    role: z
      .enum(['user', 'admin'], {
        message: "Role must be either 'user' or 'admin'",
      })
      .optional(),

    isActive: z.boolean().optional(),

    isDeleted: z.boolean().optional(),
  }),
});
