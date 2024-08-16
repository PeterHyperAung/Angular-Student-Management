export interface IUser {
  id: number;
  username: string;
  role: 'ADMIN' | 'USER';
  isAdmin(): boolean;
}
