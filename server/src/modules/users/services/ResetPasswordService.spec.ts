import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import MockUsersRepository from '../repositories/mocks/MockUsersRepository';
import MockUserTokensRepository from '../repositories/mocks/MockUserTokensRepository';
import MockHashProvider from '../providers/HashProvider/mocks/MockHashProvider';
import ResetPasswordService from './ResetPasswordService';

let mockUsersRepository: MockUsersRepository;
let mockUserTokensRepository: MockUserTokensRepository;
let mockHashProvider: MockHashProvider;
let resetPassword: ResetPasswordService;

describe('ResetPassword', () => {
  beforeEach(() => {
    mockUsersRepository = new MockUsersRepository();
    mockUserTokensRepository = new MockUserTokensRepository();
    mockHashProvider = new MockHashProvider();

    resetPassword = new ResetPasswordService(
      mockUsersRepository,
      mockUserTokensRepository,
      mockHashProvider,
    );
  });

  it('should be able to reset password.', async () => {
    const user = await mockUsersRepository.create({
      name: 'Ian Mesquita',
      email: 'ian@mail.com',
      password: '123456',
    });

    const { token } = await mockUserTokensRepository.generate(user.id);

    const generateHash = jest.spyOn(mockHashProvider, 'generateHash');

    await resetPassword.execute({
      password: '123123',
      token,
    });

    const updatedUser = await mockUsersRepository.findById(user.id);

    expect(generateHash).toHaveBeenCalledWith('123123');
    expect(updatedUser?.password).toBe('123123');
  });

  it('should not be able to reset password with non-existing token', async () => {
    await expect(
      resetPassword.execute({
        token: 'inexistent',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset password with non-existing user', async () => {
    const { token } = await mockUserTokensRepository.generate('inexistent');

    await expect(
      resetPassword.execute({
        token,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset password if passed more then 2 hours', async () => {
    const user = await mockUsersRepository.create({
      name: 'Ian Mesquita',
      email: 'ian@mail.com',
      password: '123456',
    });

    const { token } = await mockUserTokensRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPassword.execute({
        token,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
