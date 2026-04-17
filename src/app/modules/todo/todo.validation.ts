/* eslint-disable prettier/prettier */
import { z } from 'zod';

 const createTodoValidationSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(3, 'Title must be at least 3 characters long')
      .max(100, 'Title cannot exceed 100 characters'),

    description: z.string().max(500, 'Description cannot exceed 500 characters').optional(),
  }),
});

export const todoValidations = {
  createTodoValidationSchema,

}
