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

});

const changePasswordValidationSchema = z.object({
    body : z.object({
        oldPassword: z
        .string({ error: 'Old password must be a string' })
        .min(1, { message: 'Old password is required' })
        .min(6, { message: 'Old password must be at least 6 characters' }),

      newPassword: z
        .string({ error: 'New password must be a string' })
        .min(1, { message: 'New password is required' })
        .min(6, { message: 'New password must be at least 6 characters' })
        .max(100, { message: 'New password is too long' })
        .regex(/^(?=.*[A-Za-z])(?=.*\d)/, {
          message: 'New password must contain at least one letter and one number',
        }),
    })
    .refine((data) => data.oldPassword !== data.newPassword, {
      message: 'New password cannot be the same as old password',
      path: ['newPassword'],
    })
})

export const authValidation = {
    loginValidationSchema,
    changePasswordValidationSchema,
    
}