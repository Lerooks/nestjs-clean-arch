import { BadRequestError } from '~/shared/domain/errors/bad-request-error';
import { User } from '~/users/domain/entities/user.entity';
import { UserRepository } from '~/users/domain/repositories/user.repository';

export namespace GetUser {
  export interface PathParams {
    id: string;
  }

  export type OutputProps = User.OutputProps;

  export class Usecase {
    constructor(private userRepository: UserRepository) {}

    async execute(params: PathParams): Promise<OutputProps> {
      const user = await this.userRepository.findById(params.id);

      if (!user) {
        throw new BadRequestError('User not found');
      }

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    }
  }
}
