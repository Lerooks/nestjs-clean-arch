import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export function SwaggerApiForbidden(description = 'Forbidden') {
  return applyDecorators(
    ApiResponse({
      status: 403,
      description,
      schema: {
        properties: {
          message: {
            type: 'string',
            example: 'Forbidden',
          },
          error: {
            type: 'string',
            example: description,
          },
          statusCode: {
            type: 'number',
            example: 403,
          },
        },
      },
    }),
  );
}
