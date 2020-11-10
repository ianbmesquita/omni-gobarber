import 'reflect-metadata';

// import AppError from '@shared/errors/AppError';

import MockUsersRepository from '../repositories/mocks/MockUsersRepository';
import MockHashProvider from '../providers/HashProvider/mocks/MockHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

describe('AuthenticateUser', () => {
  it('should be able to authenticate.', async () => {
    const mockUsersRepository = new MockUsersRepository();
    const mockHashProvider = new MockHashProvider();

    const authenticateUser = new AuthenticateUserService(
      mockUsersRepository,
      mockHashProvider,
    );

    const createUser = new CreateUserService(
      mockUsersRepository,
      mockHashProvider,
    );

    const user = await createUser.execute({
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
});
