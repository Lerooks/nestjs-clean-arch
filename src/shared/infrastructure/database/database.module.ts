import { DynamicModule, Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaClient } from '@prisma/client';

@Module({
  imports: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class DatabaseModule {
  static forTest(prismaClient: PrismaClient): DynamicModule {
    return {
      module: DatabaseModule,
      providers: [
        {
          provide: PrismaService,
          useFactory: () => prismaClient as PrismaService,
        },
      ],
    };
  }
}
