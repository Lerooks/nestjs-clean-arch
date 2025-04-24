import { compare, hash } from 'bcryptjs';
import { HashProvider } from '~/shared/application/providers/hash.provider';

export class BcryptJsHashProvider implements HashProvider {
  generateHash(password: string): Promise<string> {
    return hash(password, 10);
  }

  compareHash(password: string, hashedPassword: string): Promise<boolean> {
    return compare(password, hashedPassword);
  }
}
