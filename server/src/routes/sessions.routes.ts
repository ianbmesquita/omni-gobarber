import { Router } from 'express';

import UserMap from '../mappers/UserMap';

import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const authenticateUser = new AuthenticateUserService();

    const { user } = await authenticateUser.execute({
      email,
      password,
    });

    const mappedUser = UserMap.toDTO(user);

    return response.status(201).json(mappedUser);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default sessionsRouter;
