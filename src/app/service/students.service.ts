import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IStudent, IStudentQueryCriteria } from '../interfaces/student';
import { DatePipe } from '@angular/common';
import { IPaginateInfo, IPaginateResponse } from '../interfaces/paginate';
import { IExcel } from '../components/common/types/excel';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient, private datePipe: DatePipe) {}

  downloadExcelFile() {
    return this.http.get<IExcel>(`${this.apiUrl}/students/excel`);
  }

  getAllStudents() {
    return this.http.get<IStudent[]>(`${this.apiUrl}/students`);
  }

  getPaginateStudents(paginateQueryInfo: IPaginateInfo<IStudentQueryCriteria>) {
    return this.http.post<IPaginateResponse<IStudent>>(
      `${this.apiUrl}/students/nz-paginate`,
      paginateQueryInfo
    );
  }

  getStudent(studentId: number) {
    return this.http.get<IStudent[]>(`${this.apiUrl}/students/${studentId}`);
  }

  createStudent(body: IStudent) {
    body.dateOfBirth = this.datePipe.transform(
      body.dateOfBirth,
      'yyyy-MM-dd'
    ) as string;
    body.startedAt = this.datePipe.transform(body.dateOfBirth, 'yyyy-MM-dd');
    console.log(body);
    return this.http.post<IStudent>(`${this.apiUrl}/students/student`, body);
  }

  updateStudent(body: IStudent, studentId: number) {
    return this.http.patch<IStudent>(
      `${this.apiUrl}/students/${studentId}`,
      body
    );
  }

  deleteStudent(studentId: number) {
    return this.http.delete(`${this.apiUrl}/students/${studentId}`);
  }
}
