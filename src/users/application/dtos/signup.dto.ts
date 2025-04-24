import { ApiProperty } from '@nestjs/swagger';
import { User } from '~/users/domain/entities/user.entity';

export class SignUpDto implements User.CreateProps {
  @ApiProperty({
    description: 'The name of the user.',
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    description: 'The email address of the user.',
    example: 'johndoe@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'The password for the user account.',
    example: 'StrongPassword123',
  })
  password: string;

  constructor(name: string, email: string, password: string) {
    this.name = name;
    this.email = email;
    this.password = password;
  }
}
