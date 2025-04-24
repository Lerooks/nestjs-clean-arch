import { HashProvider } from '~/shared/application/providers/hash.provider';
import { BadRequestError } from '~/shared/domain/errors/bad-request-error';
import { User } from '~/users/domain/entities/user.entity';
import { UserRepository } from '~/users/domain/repositories/user.repository';

export namespace SignUp {
  export type InputProps = User.CreateProps;

  export type OutputProps = User.OutputProps;

  export class Usecase {
    constructor(
      private userRepository: UserRepository,
      private hashProvider: HashProvider,
    ) {}

    async execute(input: InputProps | undefined): Promise<OutputProps> {
      if (!input) {
        throw new BadRequestError('Invalid input');
      }

      const emailExists = await this.userRepository.emailExists(input.email);

      if (emailExists) {
        throw new BadRequestError('Email already exists');
      }

      const hashedPassword = await this.hashProvider.generateHash(
        input.password,
      );

      const props: User.CreateProps = {
        name: input.name,
        email: input.email,
        password: hashedPassword,
      };

      const user = await this.userRepository.create(props);

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
