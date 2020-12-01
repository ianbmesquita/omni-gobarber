import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import MockUsersRepository from '../repositories/mocks/MockUsersRepository';
import MockHashProvider from '../providers/HashProvider/mocks/MockHashProvider';
import AuthenticateUserService from './AuthenticateUserService';

let mockUsersRepository: MockUsersRepository;
let mockHashProvider: MockHashProvider;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    mockUsersRepository = new MockUsersRepository();
    mockHashProvider = new MockHashProvider();

    authenticateUser = new AuthenticateUserService(
      mockUsersRepository,
      mockHashProvider,
    );
  });

  it('should be able to authenticate.', async () => {
    const user = await mockUsersRepository.create({
      name: 'teste 1',
      email: 'teste@mail.com',
      password: '123456',
    });

    const response = await authenticateUser.execute({
      email: 'teste@mail.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non existing user.', async () => {
    expect(
      authenticateUser.execute({
        email: 'teste@mail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('it should not be able to authenticate with wrong password.', async () => {
    await mockUsersRepository.create({
      name: 'teste 1',
      email: 'teste@mail.com',
      password: '123456',
    });

    await expect(
      authenticateUser.execute({
        email: 'teste@mail.com',
        password: 'wrong',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
