import { ISchool } from '../interfaces/school';

export class School implements ISchool {
  constructor(
    public id: ISchool['id'],
    public name: ISchool['name'],
    public principal: ISchool['principal']
  ) {}
}
