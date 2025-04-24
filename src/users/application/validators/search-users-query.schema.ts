import { z } from 'zod';

export const SearchUsersQuerySchema = z.object({
  page: z.number().min(1).optional(),
  pageSize: z.number().min(1).max(100).optional(),
  orderBy: z.enum(['createdAt', 'name', 'email']).optional(),
  orderDirection: z.enum(['asc', 'desc']).optional(),
});

export type SearchUsersQueryInput = z.infer<typeof SearchUsersQuerySchema>;
