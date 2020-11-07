import User from '@modules/users/infra/typeorm/entities/User';

interface UserMap {
  id: string;
  name: string;
  email: string;
  avatar: string;
  created_at: Date;
  updated_at: Date;
}

class UserMap {
  public static toDTO(user: User): UserMap {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  }
}

export default UserMap;
