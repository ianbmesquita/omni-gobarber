import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import MockMailProvider from '@shared/container/providers/MailProvider/mocks/MockMailProvider';
import MockUsersRepository from '../repositories/mocks/MockUsersRepository';
import MockUserTokensRepository from '../repositories/mocks/MockUserTokensRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let mockUsersRepository: MockUsersRepository;
let mockUserTokensRepository: MockUserTokensRepository;
let mockMailProvider: MockMailProvider;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    mockUsersRepository = new MockUsersRepository();
    mockMailProvider = new MockMailProvider();
    mockUserTokensRepository = new MockUserTokensRepository();

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      mockUsersRepository,
      mockMailProvider,
      mockUserTokensRepository,
    );
  });

  it('should be able to recover password using email.', async () => {
    const sendMail = jest.spyOn(mockMailProvider, 'sendMail');

    await mockUsersRepository.create({
      name: 'Ian Mesquita',
      email: 'ian@mail.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'ian@mail.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to recover a non-existing user password', async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'ian@mail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to generate a forgot password token', async () => {
    const generateToken = jest.spyOn(mockUserTokensRepository, 'generate');

    const user = await mockUsersRepository.create({
      name: 'Ian Mesquita',
      email: 'ian@mail.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'ian@mail.com',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
