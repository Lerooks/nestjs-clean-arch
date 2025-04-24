import { User } from '~/users/domain/entities/user.entity';

export class UserMapper {
  static toOutput(user: User.Props): User.OutputProps {
    try {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
      };
    } catch {
      throw new Error('Invalid user data');
    }
  }

  static toOutputMany(users: User.Props[]): User.OutputProps[] {
    return users.map(user => this.toOutput(user));
  }
}
