import { PrismaClient } from '@prisma/client';
import { UserMapper } from '../../user-mapper';
import { faker } from '@faker-js/faker';

describe('UserMapper integration tests', () => {
  let prisma: PrismaClient;

  beforeAll(async () => {
    prisma = new PrismaClient();
    await prisma.$connect();
  });

  afterEach(async () => {
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should map a real user from the database to User.OutputProps', async () => {
    const createdUser = await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      },
    });

    const output = UserMapper.toOutput(createdUser);

    expect(output).toEqual({
      id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
      createdAt: createdUser.createdAt.toISOString(),
      updatedAt: createdUser.updatedAt.toISOString(),
    });
  });
});
