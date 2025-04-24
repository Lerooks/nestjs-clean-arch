import { User } from '~/users/domain/entities/user.entity';

export interface UserRepository {
  create(data: User.CreateProps): Promise<User.OutputProps>;
  delete(id: string): Promise<void>;
  emailExists(email: string): Promise<boolean>;
  search(params: User.SearchParams): Promise<User.OutputProps[]>;
  findByEmail(email: string): Promise<User.OutputProps | null>;
  findById(id: string): Promise<User.OutputProps | null>;
  update(props: User.UpdateProps): Promise<User.OutputProps>;
}
