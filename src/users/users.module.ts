import { Module } from '@nestjs/common';
import { SignUp } from './application/usecases/signup.usecase';
import { PrismaUserRepository } from './infrastructure/prisma/repositories/prisma.user.repository';
import { BcryptJsHashProvider } from '~/shared/infrastructure/providers/bcryptjs-hash.provider';
import { UserRepository } from './domain/repositories/user.repository';
import { HashProvider } from '~/shared/application/providers/hash.provider';
import { GetUser } from './application/usecases/getuser.usecase';
import { ListUsers } from './application/usecases/listusers.usecase';
import { UserController } from './presentation/controllers/user.controller';
import { PrismaService } from '~/shared/infrastructure/database/prisma/prisma.service';
import { DatabaseModule } from '~/shared/infrastructure/database/database.module';
import { UpdateUser } from './application/usecases/update-user.usecase';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [
    {
      provide: 'PrismaService',
      useClass: PrismaService,
    },
    {
      provide: 'UserRepository',
      useFactory: (prismaService: PrismaService) => {
        return new PrismaUserRepository(prismaService);
      },
      inject: ['PrismaService'],
    },
    {
      provide: 'HashProvider',
      useClass: BcryptJsHashProvider,
    },
    {
      provide: GetUser.Usecase,
      useFactory: (userRepository: UserRepository) => {
        return new GetUser.Usecase(userRepository);
      },
      inject: ['UserRepository'],
    },
    {
      provide: ListUsers.Usecase,
      useFactory: (userRepository: UserRepository) => {
        return new ListUsers.Usecase(userRepository);
      },
      inject: ['UserRepository'],
    },
    {
      provide: SignUp.Usecase,
      useFactory: (
        userRepository: UserRepository,
        hashProvider: HashProvider,
      ) => {
        return new SignUp.Usecase(userRepository, hashProvider);
      },
      inject: ['UserRepository', 'HashProvider'],
    },
    {
      provide: UpdateUser.Usecase,
      useFactory: (userRepository: UserRepository) => {
        return new UpdateUser.Usecase(userRepository);
      },
      inject: ['UserRepository'],
    },
  ],
})
export class UsersModule {}
