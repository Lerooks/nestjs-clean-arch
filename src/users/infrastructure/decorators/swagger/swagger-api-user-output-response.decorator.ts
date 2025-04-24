import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export interface Props {
  description?: string;
  status?: number;
}

export function SwaggerApiUserOutputResponse({
  description = 'User response',
  status = 200,
}: Props = {}) {
  return applyDecorators(
    ApiResponse({
      status,
      description,
      schema: {
        properties: {
          id: {
            type: 'string',
            example: '5e3b3e10-9d7f-4c57-b919-b0d34e18725e',
          },
          name: { type: 'string', example: 'John Doe' },
          email: { type: 'string', example: 'john.doe@example.com' },
          createdAt: { type: 'string', example: '2024-01-01T00:00:00.000Z' },
          updatedAt: { type: 'string', example: '2024-01-01T00:00:00.000Z' },
        },
        type: 'object',
      },
    }),
  );
}
