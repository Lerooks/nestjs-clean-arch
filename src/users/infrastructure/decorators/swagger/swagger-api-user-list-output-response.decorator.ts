import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export function SwaggerApiUsersListOutputResponse(
  description = 'List of users',
) {
  return applyDecorators(
    ApiResponse({
      status: 200,
      description,
      schema: {
        type: 'object',
        properties: {
          total: {
            type: 'number',
            example: 2,
          },
          page: {
            type: 'number',
            example: 1,
          },
          items: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                  example: '5e3b3e10-9d7f-4c57-b919-b0d34e18725e',
                },
                name: { type: 'string', example: 'John Doe' },
                email: { type: 'string', example: 'john.doe@example.com' },
                createdAt: {
                  type: 'string',
                  example: '2024-01-01T00:00:00.000Z',
                },
                updatedAt: {
                  type: 'string',
                  example: '2024-01-01T00:00:00.000Z',
                },
              },
            },
          },
        },
      },
    }),
  );
}
