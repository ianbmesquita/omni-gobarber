import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import MockUsersRepository from '../repositories/mocks/MockUsersRepository';
import ShowProfileService from './ShowProfileService';

let mockUsersRepository: MockUsersRepository;
let showProfile: ShowProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    mockUsersRepository = new MockUsersRepository();

    showProfile = new ShowProfileService(mockUsersRepository);
  });

  it('should be able to show the profile.', async () => {
    const user = await mockUsersRepository.create({
      name: 'teste 1',
      email: 'teste1@mail.com',
      password: '123456',
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('teste 1');
    expect(profile.email).toBe('teste1@mail.com');
  });

  it('should not be able to show the profile from non-existing user.', async () => {
    await expect(
      showProfile.execute({
        user_id: 'inexistent user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
