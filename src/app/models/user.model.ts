import { IUser } from '../interfaces/user';

export class User implements IUser {
  constructor(
    public id: IUser['id'],
    public username: IUser['username'],
    public role: IUser['role']
  ) {}

  isAdmin(): boolean {
    return this.role === 'ADMIN';
  }
}
