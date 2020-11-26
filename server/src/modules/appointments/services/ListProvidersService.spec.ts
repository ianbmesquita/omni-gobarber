import 'reflect-metadata';

import MockUsersRepository from '@modules/users/repositories/mocks/MockUsersRepository';
import ListProvidersService from './ListProvidersService';

let mockUsersRepository: MockUsersRepository;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    mockUsersRepository = new MockUsersRepository();

    listProviders = new ListProvidersService(mockUsersRepository);
  });

  it('should be able to list the providers.', async () => {
    const user1 = await mockUsersRepository.create({
      name: 'teste 1',
      email: 'teste1@mail.com',
      password: '123456',
    });

    const user2 = await mockUsersRepository.create({
      name: 'teste 2',
      email: 'teste2@mail.com',
      password: '123456',
    });

    const loggedUser = await mockUsersRepository.create({
      name: 'teste 3',
      email: 'teste3@mail.com',
      password: '123456',
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
