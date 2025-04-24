import { ZodError } from 'zod';

import { User } from '~/users/domain/entities/user.entity';
import { CreateUserCommandSchema } from '~/users/application/validators/create-user-command.schema';

export class CreateUserCommand implements User.CreateProps {
  name: string;
  email: string;
  password: string;

  constructor(props: User.CreateProps) {
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
  }

  static fromObject(data: unknown): CreateUserCommand {
    try {
      const parsed = CreateUserCommandSchema.parse(data);
      return new CreateUserCommand(parsed);
    } catch (e) {
      const error = e as ZodError;
      throw new Error(`${error.issues.map(issue => issue.message).join(', ')}`);
    }
  }
}
