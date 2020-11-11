import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import MockStorageProvider from '@shared/container/providers/StorageProvider/mocks/MockStorageProvider';

import MockUsersRepository from '../repositories/mocks/MockUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';

describe('UpdateUserAvatar', () => {
  it('should be able to update a user avatar.', async () => {
    const mockUsersRepository = new MockUsersRepository();
    const mockStorageProvider = new MockStorageProvider();

    const updateUserAvatar = new UpdateUserAvatarService(
      mockUsersRepository,
      mockStorageProvider,
    );

    const user = await mockUsersRepository.create({
      name: 'teste',
      email: 'teste@mail.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'avatar.jpg',
    });

    expect(user.avatar).toBe('avatar.jpg');
  });

  it('should not be able to update avatar from non existent user.', async () => {
    const mockUsersRepository = new MockUsersRepository();
    const mockStorageProvider = new MockStorageProvider();

    const updateUserAvatar = new UpdateUserAvatarService(
      mockUsersRepository,
      mockStorageProvider,
    );

    expect(
      updateUserAvatar.execute({
        user_id: 'inexistent',
        avatarFileName: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to delete old avatar when updating new one.', async () => {
    const mockUsersRepository = new MockUsersRepository();
    const mockStorageProvider = new MockStorageProvider();

    const deleteFile = jest.spyOn(mockStorageProvider, 'deleteFile');

    const updateUserAvatar = new UpdateUserAvatarService(
      mockUsersRepository,
      mockStorageProvider,
    );

    const user = await mockUsersRepository.create({
      name: 'teste',
      email: 'teste@mail.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'avatar.jpg',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'avatar2.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
    expect(user.avatar).toBe('avatar2.jpg');
  });
});
