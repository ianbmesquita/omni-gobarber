import { Router } from 'express';

import UserMap from '@modules/users/mappers/UserMap';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const usersRepository = new UsersRepository();

  const authenticateUser = new AuthenticateUserService(usersRepository);

  const { user, token } = await authenticateUser.execute({
    email,
    password,
  });

  const authenticatedUser = UserMap.toDTO(user);

  return response.status(201).json({ authenticatedUser, token });
});

export default sessionsRouter;
