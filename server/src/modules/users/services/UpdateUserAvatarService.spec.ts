import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import MockStorageProvider from '@shared/container/providers/StorageProvider/mocks/MockStorageProvider';

import MockUsersRepository from '../repositories/mocks/MockUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';

let mockUsersRepository: MockUsersRepository;
let mockStorageProvider: MockStorageProvider;
let updateUserAvatar: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    mockUsersRepository = new MockUsersRepository();
    mockStorageProvider = new MockStorageProvider();

    updateUserAvatar = new UpdateUserAvatarService(
      mockUsersRepository,
      mockStorageProvider,
    );
  });

  it('should be able to update a user avatar.', async () => {
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
    await expect(
      updateUserAvatar.execute({
        user_id: 'inexistent',
        avatarFileName: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to delete old avatar when updating new one.', async () => {
    const deleteFile = jest.spyOn(mockStorageProvider, 'deleteFile');

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
