import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export function SwaggerApiBadRequest(description = 'Bad Request') {
  return applyDecorators(
    ApiResponse({
      status: 400,
      description,
      schema: {
        properties: {
          message: {
            type: 'string',
            example: 'Invalid query parameters',
          },
          error: {
            type: 'string',
            example: description,
          },
          statusCode: {
            type: 'number',
            example: 400,
          },
        },
      },
    }),
  );
}
