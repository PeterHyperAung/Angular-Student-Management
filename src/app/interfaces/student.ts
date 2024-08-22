import { ISchool } from './school';

export interface IStudent {
  id: number;
  name: string;
  email: string;
  dateOfBirth: string;
  school?: ISchool;
  startedAt: string | null;
}

export type IStudentQueryCriteria = {
  name: string;
  email: string;
  school: string;
  [key: string]: string;
};
