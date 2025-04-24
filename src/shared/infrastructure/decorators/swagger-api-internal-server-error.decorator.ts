import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export function SwaggerApiInternalServerError(
  description = 'Internal server error',
) {
  return applyDecorators(
    ApiResponse({
      status: 500,
      description,
      schema: {
        properties: {
          message: {
            type: 'string',
            example: 'Internal server error',
          },
          error: {
            type: 'string',
            example: description,
          },
          statusCode: {
            type: 'number',
            example: 500,
          },
        },
      },
    }),
  );
}
