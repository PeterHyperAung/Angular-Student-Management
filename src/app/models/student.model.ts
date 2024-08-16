import { IStudent } from '../interfaces/student';

export class Student implements IStudent {
  constructor(
    public id: IStudent['id'],
    public name: IStudent['name'],
    public email: IStudent['email'],
    public dateOfBirth: IStudent['dateOfBirth'],
    public school: IStudent['school'],
    public startedAt: IStudent['startedAt']
  ) {}
}
