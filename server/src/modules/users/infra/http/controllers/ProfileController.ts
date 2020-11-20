import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UserMap from '@modules/users/mappers/UserMap';

import UpdateProfileService from '../../../services/UpdateProfileService';
import ShowProfileController from '../../../services/ShowProfileService';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const showController = container.resolve(ShowProfileController);

    const user = await showController.execute({ user_id });

    const mappedUser = UserMap.toDTO(user);

    return response.json(mappedUser);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name, email, old_password, password } = request.body;

    const updateProfile = container.resolve(UpdateProfileService);

    const user = await updateProfile.execute({
      user_id,
      name,
      email,
      old_password,
      password,
    });

    const mappedUser = UserMap.toDTO(user);

    return response.json(mappedUser);
  }
}
