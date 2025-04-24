import { z } from 'zod';

export const CreateUserCommandSchema = z.object({
  name: z.string({ required_error: 'Field name is required' }).min(1).max(255),
  email: z.string({ required_error: 'Field email is required' }).email(),
  password: z
    .string({ required_error: 'Field password is required' })
    .min(6)
    .max(255),
});

export type CreateUserCommandInput = z.infer<typeof CreateUserCommandSchema>;
