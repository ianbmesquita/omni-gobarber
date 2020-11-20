import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import MockHashProvider from '../providers/HashProvider/mocks/MockHashProvider';

import MockUsersRepository from '../repositories/mocks/MockUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let mockUsersRepository: MockUsersRepository;
let mockHashProvider: MockHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    mockUsersRepository = new MockUsersRepository();
    mockHashProvider = new MockHashProvider();

    updateProfile = new UpdateProfileService(
      mockUsersRepository,
      mockHashProvider,
    );
  });

  it('should be able to update the profile.', async () => {
    const user = await mockUsersRepository.create({
      name: 'teste 1',
      email: 'teste1@mail.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'teste 2',
      email: 'teste2@mail.com',
    });

    expect(updatedUser.name).toBe('teste 2');
    expect(updatedUser.email).toBe('teste2@mail.com');
  });

  it('should not be able to update the profile from non-existing user.', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'inexistent user',
        name: 'teste 2',
        email: 'teste2@mail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change the email by one that already exists.', async () => {
    await mockUsersRepository.create({
      name: 'teste 1',
      email: 'teste1@mail.com',
      password: '123456',
    });

    const user = await mockUsersRepository.create({
      name: 'teste 2',
      email: 'teste2@mail.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'teste 2',
        email: 'teste1@mail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update password.', async () => {
    const user = await mockUsersRepository.create({
      name: 'teste 1',
      email: 'teste1@mail.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'teste 1',
      email: 'teste1@mail.com',
      old_password: '123456',
      password: '123123',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should not be able to update password without old password.', async () => {
    const user = await mockUsersRepository.create({
      name: 'teste 1',
      email: 'teste1@mail.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'teste 1',
        email: 'teste1@mail.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update password with wrong old password.', async () => {
    const user = await mockUsersRepository.create({
      name: 'teste 1',
      email: 'teste1@mail.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'teste 1',
        email: 'teste1@mail.com',
        old_password: 'wrong password',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
