import { ApiPropertyOptional } from '@nestjs/swagger';
import { User } from '~/users/domain/entities/user.entity';

export class ListUsersDto implements User.SearchParams {
  @ApiPropertyOptional({
    description: 'Page number for pagination',
    default: 1,
    minimum: 1,
  })
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Number of items per page',
    minimum: 1,
    default: 10,
  })
  pageSize?: number = 10;

  @ApiPropertyOptional({
    description: 'Field to order by',
    enum: ['createdAt', 'name', 'email'],
  })
  orderBy?: 'createdAt' | 'name' | 'email';

  @ApiPropertyOptional({
    description: 'Direction of ordering',
    enum: ['asc', 'desc'],
  })
  orderDirection?: 'asc' | 'desc';
}
