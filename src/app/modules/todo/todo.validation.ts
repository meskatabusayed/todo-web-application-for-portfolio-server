/* eslint-disable prettier/prettier */
import { z } from 'zod';

const createTodoValidationSchema = z.object({
  body: z.object({
    id: z.string().trim().min(1, { message: "Todo ID is required" }),
    title: z.string().min(3).max(100),
    description: z.string().max(500).optional(),
    status: z.enum(["pending", "completed"]).default("pending"),
    isDeleted: z.boolean().optional(),
  }),
});

export const todoValidations = {
  createTodoValidationSchema,

}
