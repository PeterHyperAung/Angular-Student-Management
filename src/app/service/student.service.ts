import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Student } from '../interfaces/student';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllStudents() {
    return this.http.get<Student[]>(`${this.apiUrl}/students`);
  }

  getPaginateStudents() {
    return this.http.get<Student[]>(`${this.apiUrl}/students`);
  }

  getStudent(studentId: number) {
    return this.http.get<Student[]>(`${this.apiUrl}/students/${studentId}`);
  }

  createStudent(body: Student) {
    return this.http.post<Student>(`${this.apiUrl}/students`, {
      body,
    });
  }

  updateStudent(body: Student) {
    return this.http.patch<Student>(`${this.apiUrl}/students`, {
      body,
    });
  }

  deleteStudent(studentId: number) {
    return this.http.delete(`${this.apiUrl}/students/${studentId}`);
  }
}
