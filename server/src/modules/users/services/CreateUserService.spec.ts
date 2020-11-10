import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import MockHashProvider from '../providers/HashProvider/mocks/MockHashProvider';

import MockUsersRepository from '../repositories/mocks/MockUsersRepository';
import CreateUserService from './CreateUserService';

describe('CreatUser', () => {
  it('should be able to create a new user.', async () => {
    const mockUsersRepository = new MockUsersRepository();
    const mockHashProvider = new MockHashProvider();

    const createUser = new CreateUserService(
      mockUsersRepository,
      mockHashProvider,
    );

    const user = await createUser.execute({
      name: 'teste',
      email: 'teste@mail.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create two users with same email.', async () => {
    const mockUsersRepository = new MockUsersRepository();
    const mockHashProvider = new MockHashProvider();

    const createUser = new CreateUserService(
      mockUsersRepository,
      mockHashProvider,
    );

    await createUser.execute({
      name: 'teste 1',
      email: 'teste@mail.com',
      password: '123456',
    });

    expect(
      createUser.execute({
        name: 'teste 2',
        email: 'teste@mail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
