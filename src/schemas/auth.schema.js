import z from 'zod';

const passwordSchema = z
  .string('password must be a string')
  .regex(
    /^[0-9a-zA-Z]{6,}$/,
    'Password must have at least 6 characters and contain only letter and number',
  );

export const registerSchema = z.object({
  email: z.email('invalid email address'),
  passwordHash: passwordSchema,
  name: z.string().nullable().optional(),
});

export const loginSchema = z.object({
  email: z.email('invalid email address'),
  passwordHash: z
    .string('password must be a string')
    .min(1, 'Password is required'),
});
