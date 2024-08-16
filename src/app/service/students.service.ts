import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IStudent } from '../interfaces/student';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient, private datePipe: DatePipe) {}

  getAllStudents() {
    return this.http.get<IStudent[]>(`${this.apiUrl}/students`);
  }

  getPaginateStudents() {
    return this.http.get<IStudent[]>(`${this.apiUrl}/students`);
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

  updateStudent(body: IStudent) {
    return this.http.patch<IStudent>(`${this.apiUrl}/students`, body);
  }

  deleteStudent(studentId: number) {
    return this.http.delete(`${this.apiUrl}/students/${studentId}`);
  }
}
