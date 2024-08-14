import { School } from './school';

export type Student = {
  id: number;
  name: string;
  email: string;
  dateOfBirth: string;
  school: School;
  startedAt: string;
};

export type Students = Student[];
