import { ApiProperty } from '@nestjs/swagger';
import { User } from '~/users/domain/entities/user.entity';

export class UpdateUserDto implements User.UpdateProps {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}
