import { Router } from 'express';

import UserMap from '@modules/users/mappers/UserMap';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateUser = new AuthenticateUserService();

  const { user, token } = await authenticateUser.execute({
    email,
    password,
  });

  const authenticatedUser = UserMap.toDTO(user);

  return response.status(201).json({ authenticatedUser, token });
});

export default sessionsRouter;
