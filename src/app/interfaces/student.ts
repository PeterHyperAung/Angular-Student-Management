import { School } from './school';

export type Student = {
  id: number;
  name: string;
  email: string;
  dateOfBirth: string;
  school: School;
  startedAt: string | null;
};

export type Students = Student[];
