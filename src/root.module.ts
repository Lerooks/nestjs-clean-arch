import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './shared/infrastructure/database/database.module';

@Module({
  imports: [UsersModule, DatabaseModule],
})
export class RootModule {}
