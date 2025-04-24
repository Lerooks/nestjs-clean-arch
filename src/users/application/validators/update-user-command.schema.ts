import { z } from 'zod';

export const UpdateUserCommandSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(255),
});

export type UpdateUserCommandInput = z.infer<typeof UpdateUserCommandSchema>;
