import { PrismaClient } from '@prisma/client';
import { PrismaService } from '~/shared/infrastructure/database/prisma/prisma.service';
import { faker } from '@faker-js/faker';
import { NotFoundError } from '~/shared/domain/errors/not-found-error';
import { PrismaUserRepository } from '../../prisma.user.repository';
import { UserMapper } from '../../../mappers/user-mapper';
import { User } from '~/users/domain/entities/user.entity';

describe('PrismaUserRepository integration tests', () => {
  let prisma: PrismaClient;
  let prismaService: PrismaService;
  let repository: PrismaUserRepository;

  beforeAll(async () => {
    prisma = new PrismaClient();
    prismaService = new PrismaService();
    repository = new PrismaUserRepository(prismaService);
    await prisma.$connect();
  });

  afterEach(async () => {
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should return a user when a valid ID is provided', async () => {
    const user = await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      },
    });

    const result = await repository.findById(user.id);

    expect(result).toEqual(
      expect.objectContaining({
        id: user.id,
        name: user.name,
        email: user.email,
      }),
    );
  });

  it('should throw NotFoundError if user with given ID does not exist', async () => {
    const nonExistentId = faker.string.uuid();

    await expect(repository.findById(nonExistentId)).rejects.toThrow(
      NotFoundError,
    );
  });

  it('should create a new user and return it', async () => {
    const data = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const result = await repository.create(data);

    expect(result).toMatchObject({
      name: data.name,
      email: data.email,
    });

    const userInDb = await prisma.user.findUnique({
      where: { email: data.email },
    });

    expect(userInDb).not.toBeNull();
    expect(userInDb?.name).toBe(data.name);
  });

  it('should find a user by email', async () => {
    const email = faker.internet.email();
    const createdUser = await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        email,
        password: faker.internet.password(),
      },
    });

    const user = await repository.findByEmail(email);

    expect(user).toEqual(UserMapper.toOutput(createdUser));
  });

  it('should return null when user is not found by email', async () => {
    const user = await repository.findByEmail('nonexistent@email.com');
    expect(user).toBeNull();
  });

  it('should return true if email exists', async () => {
    const email = faker.internet.email();

    await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        email,
        password: faker.internet.password(),
      },
    });

    const exists = await repository.emailExists(email);
    expect(exists).toBe(true);
  });

  it('should return false if email does not exist', async () => {
    const exists = await repository.emailExists('unknown@email.com');
    expect(exists).toBe(false);
  });

  it('should return paginated users ordered by createdAt asc', async () => {
    const users = Array.from({ length: 20 }, () => ({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    }));

    await prisma.user.createMany({
      data: users,
    });

    const result = await repository.search({
      page: 1,
      pageSize: 10,
      orderBy: 'createdAt',
      orderDirection: 'asc',
    });

    expect(result.length).toBe(10);
    expect(result[0].createdAt <= result[1].createdAt).toBe(true);
  });

  it('should return paginated users ordered by name desc', async () => {
    const users = Array.from({ length: 15 }, () => ({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    }));

    await prisma.user.createMany({
      data: users,
    });

    const result = await repository.search({
      page: 2,
      pageSize: 5,
      orderBy: 'name',
      orderDirection: 'desc',
    });

    expect(result.length).toBe(5);
    expect(result[0].name >= result[1].name).toBe(true); // Descending order
  });

  it('should return empty array if page exceeds users', async () => {
    await prisma.user.createMany({
      data: [
        {
          id: faker.string.uuid(),
          name: faker.person.fullName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
          createdAt: faker.date.past(),
          updatedAt: faker.date.recent(),
        },
      ],
    });

    const result = await repository.search({
      page: 10,
      pageSize: 5,
    });

    expect(result.length).toBe(0);
  });

  it('should update a user name and email', async () => {
    const createdUser = await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      },
    });

    const newName = faker.person.fullName();
    const newEmail = faker.internet.email();

    const updateData: User.UpdateProps = {
      id: createdUser.id,
      name: newName,
      email: newEmail,
    };

    await repository.update(updateData);

    const updated = await prisma.user.findUnique({
      where: { id: createdUser.id },
    });

    expect(updated).toBeDefined();
    expect(updated?.name).toBe(newName);
    expect(updated?.email).toBe(newEmail);
    expect(updated?.password).toBe(createdUser.password);
  });

  it('should throw an error if user does not exist', async () => {
    const nonExistentId = faker.string.uuid();

    await expect(
      repository.update({
        id: nonExistentId,
        name: 'Should Fail',
      }),
    ).rejects.toThrow(`Error updating user with ID ${nonExistentId}`);
  });

  it('should delete a user by ID', async () => {
    const createdUser = await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      },
    });

    await repository.delete(createdUser.id);

    const user = await prisma.user.findUnique({
      where: { id: createdUser.id },
    });

    expect(user).toBeNull();
  });

  it('should throw an error when trying to delete non-existent user', async () => {
    const fakeId = faker.string.uuid();

    await expect(repository.delete(fakeId)).rejects.toThrow(
      `Error deleting user with ID ${fakeId}`,
    );
  });
});
