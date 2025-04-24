import { Injectable } from '@nestjs/common';
import { PrismaService } from '~/shared/infrastructure/database/prisma/prisma.service';
import { User } from '~/users/domain/entities/user.entity';
import { UserRepository } from '~/users/domain/repositories/user.repository';
import { NotFoundError } from '~/shared/domain/errors/not-found-error';
import { UserMapper } from '~/users/infrastructure/prisma/mappers/user-mapper';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: User.CreateProps): Promise<User.OutputProps> {
    try {
      const user = await this.prisma.user.create({
        data,
      });

      return UserMapper.toOutput(user);
    } catch {
      throw new Error('Error creating user');
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.user.delete({
        where: { id },
      });
    } catch {
      throw new Error(`Error deleting user with ID ${id}`);
    }
  }

  async emailExists(email: string): Promise<boolean> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email },
        select: { id: true },
      });

      return !!user;
    } catch {
      throw new Error(`Error checking if email exists: ${email}`);
    }
  }

  async search(params: User.SearchParams): Promise<User.OutputProps[]> {
    try {
      const page = Number(params.page) || 1;
      const pageSize = Number(params.pageSize) || 10;
      const orderBy = params.orderBy || 'createdAt';
      const orderDirection = params.orderDirection || 'asc';

      const skip = (page - 1) * pageSize;

      const users = await this.prisma.user.findMany({
        skip,
        take: pageSize,
        orderBy: {
          [orderBy]: orderDirection,
        },
      });

      return UserMapper.toOutputMany(users);
    } catch {
      throw new Error('Error searching users');
    }
  }

  async findByEmail(email: string): Promise<User.OutputProps | null> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email },
      });

      if (!user) return null;

      return UserMapper.toOutput(user);
    } catch {
      throw new NotFoundError(`Error finding user with email ${email}`);
    }
  }

  async findById(id: string): Promise<User.OutputProps | null> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
      });

      return UserMapper.toOutput(user as User.Props);
    } catch {
      throw new NotFoundError(`User with ID ${id} not found`);
    }
  }

  async update(props: User.UpdateProps): Promise<User.OutputProps> {
    try {
      const { id, ...data } = props;

      const user = await this.prisma.user.update({
        where: { id },
        data,
      });

      return UserMapper.toOutput(user);
    } catch {
      throw new Error(`Error updating user with ID ${props.id}`);
    }
  }
}
