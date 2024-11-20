import { z } from 'zod';

const userValidationSchema = z.object({
  username: z
    .string()
    .min(4, { message: 'Username must be at least 4 characters long.' }),
  email: z
    .string()
    .email({ message: 'Invalid email address.' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long.' }),
  confirmPassword: z
    .string()
    .min(6, { message: 'Confirm password must be at least 6 characters long.' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match.',
  path: ['confirmPassword'],
});

export const validateUserData = (userData) => {
  try {
    userValidationSchema.parse(userData);
    return { success: true }; 
  } catch (error) {
    return { success: false, errors: error.errors }; 
  }
};
