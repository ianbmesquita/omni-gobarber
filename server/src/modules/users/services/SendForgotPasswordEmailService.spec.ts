import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import MockMailProvider from '@shared/container/providers/MailProvider/mocks/MockMailProvider';
import MockUsersRepository from '../repositories/mocks/MockUsersRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

describe('SendForgotPasswordEmail', () => {
  it('should be able to recover password using email.', async () => {
    const mockUsersRepository = new MockUsersRepository();
    const mockMailProvider = new MockMailProvider();

    const sendMail = jest.spyOn(mockMailProvider, 'sendMail');

    const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      mockUsersRepository,
      mockMailProvider,
    );

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
    const mockUsersRepository = new MockUsersRepository();
    const mockMailProvider = new MockMailProvider();

    const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      mockUsersRepository,
      mockMailProvider,
    );

    await expect(
      sendForgotPasswordEmail.execute({
        email: 'ian@mail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
