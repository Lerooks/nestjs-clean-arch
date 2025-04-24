import { SearchUsersQuerySchema } from '~/users/application/validators/search-users-query.schema';
import { ZodError } from 'zod';
import { User } from '~/users/domain/entities/user.entity';

export class SearchUsersQuery {
  private readonly params: User.SearchParams;

  private constructor(params: User.SearchParams) {
    this.params = params;
  }

  static fromObject(data: unknown): SearchUsersQuery {
    try {
      const parsed = SearchUsersQuerySchema.parse(data);
      return new SearchUsersQuery(parsed);
    } catch (e) {
      const error = e as ZodError;
      throw new Error(
        `Invalid query parameters: ${error.issues.map(issue => issue.message).join(', ')}`,
      );
    }
  }

  toObject(): User.SearchParams {
    return this.params;
  }

  get page() {
    return this.params.page;
  }

  get pageSize() {
    return this.params.pageSize;
  }

  get orderBy() {
    return this.params.orderBy;
  }

  get orderDirection() {
    return this.params.orderDirection;
  }
}
