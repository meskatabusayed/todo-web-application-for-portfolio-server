/* eslint-disable prettier/prettier */
import z from "zod";


const loginValidationSchema = z.object({
    body : z.object({
        id: z
    .string()
    .min(1, { message: "ID is required" })
    .trim(),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(100, { message: "Password is too long" })
    .trim(),
    })

})

export const authValidation = {
    loginValidationSchema,
}