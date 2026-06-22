import 'dotenv/config';
import z from 'zod';

const envSchemas = z.object({
  PORT: z.coerce.number().int().positive().max(65535),
  DATABASE_URL: z.url(),
  JWT_SECRET: z.string().min(32),
  jwt_EXPIRES_IN: z.coerce.number().int().positive(),
});

const result = envSchemas.safeParse(process.env);
if (!result.success) {
  console.log('env validation failed');
  console.error(z.flattenError(result.error));
  process.exit(1);
}

export const env = result.data;
