import { ZodError } from 'zod';
import { UpdateUserCommandSchema } from '~/users/application/validators/update-user-command.schema';
import { User } from '~/users/domain/entities/user.entity';

export class UpdateUserCommand implements User.UpdateProps {
  id: string;
  name: string;

  constructor(props: User.UpdateProps) {
    this.id = props.id;
    this.name = props.name;
  }

  static fromObject(data: unknown): UpdateUserCommand {
    try {
      const parsed = UpdateUserCommandSchema.parse(data);
      return new UpdateUserCommand(parsed);
    } catch (e) {
      const error = e as ZodError;
      throw new Error(
        `Invalid props: ${error.issues.map(issue => issue.message).join(', ')}`,
      );
    }
  }
}
