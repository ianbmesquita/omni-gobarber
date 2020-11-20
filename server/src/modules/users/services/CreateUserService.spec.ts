import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import MockHashProvider from '../providers/HashProvider/mocks/MockHashProvider';

import MockUsersRepository from '../repositories/mocks/MockUsersRepository';
import CreateUserService from './CreateUserService';

let mockUsersRepository: MockUsersRepository;
let mockHashProvider: MockHashProvider;
let createUser: CreateUserService;

describe('CreatUser', () => {
  beforeEach(() => {
    mockUsersRepository = new MockUsersRepository();
    mockHashProvider = new MockHashProvider();

    createUser = new CreateUserService(mockUsersRepository, mockHashProvider);
  });

  it('should be able to create a new user.', async () => {
    const user = await createUser.execute({
      name: 'teste',
      email: 'teste@mail.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create two users with same email.', async () => {
    await createUser.execute({
      name: 'teste 1',
      email: 'teste@mail.com',
      password: '123456',
    });

    await expect(
      createUser.execute({
        name: 'teste 2',
        email: 'teste@mail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
