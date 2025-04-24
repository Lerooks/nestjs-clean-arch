import { Injectable } from '@nestjs/common';
import { PaginationProps } from '~/shared/application/dto/pagination-props';
import { User } from '~/users/domain/entities/user.entity';
import { UserRepository } from '~/users/domain/repositories/user.repository';

export namespace ListUsers {
  export type OutputProps = PaginationProps<User.OutputProps>;

  @Injectable()
  export class Usecase {
    constructor(private userRepository: UserRepository) {}

    async execute(params: User.SearchParams): Promise<OutputProps> {
      const users = await this.userRepository.search(params);

      return {
        total: users.length,
        page: params.page || 1,
        items: users,
      };
    }
  }
}
