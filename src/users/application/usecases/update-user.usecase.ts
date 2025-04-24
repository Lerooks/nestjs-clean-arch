import { BadRequestError } from '~/shared/domain/errors/bad-request-error';
import { User } from '~/users/domain/entities/user.entity';
import { UserRepository } from '~/users/domain/repositories/user.repository';

export namespace UpdateUser {
  export type InputProps = User.UpdateProps;

  export type OutputProps = User.OutputProps;

  export class Usecase {
    constructor(private userRepository: UserRepository) {}

    async execute(input: InputProps): Promise<OutputProps> {
      if (!input.id || !input.name) {
        throw new BadRequestError('Invalid input');
      }

      const props: User.UpdateProps = {
        id: input.id,
        name: input.name,
      };

      const user = await this.userRepository.update(props);

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
