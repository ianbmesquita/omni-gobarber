import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UserMap from '@modules/users/mappers/UserMap';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });

    const authenticatedUser = UserMap.toDTO(user);

    return response.status(201).json({ authenticatedUser, token });
  }
}
