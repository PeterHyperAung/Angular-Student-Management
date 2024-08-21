export interface ISchool {
  id: number;
  name: string;
  principal: string;
}

export type ISchoolQueryCriteria = Omit<ISchool, 'id'>;
