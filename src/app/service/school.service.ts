import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { School } from '../interfaces/school';

@Injectable({
  providedIn: 'root',
})
export class SchoolService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllSchools() {
    return this.http.get<School[]>(`${this.apiUrl}/schools`);
  }

  getSchool(schoolId: number) {
    return this.http.get<School[]>(`${this.apiUrl}/schools/${schoolId}`);
  }

  createSchool(body: School) {
    return this.http.post<School>(`${this.apiUrl}/schools`, {
      body,
    });
  }

  updateSchool(body: School) {
    return this.http.patch<School>(`${this.apiUrl}/schools`, {
      body,
    });
  }

  deleteSchool(schoolId: number) {
    return this.http.delete(`${this.apiUrl}/schools/${schoolId}`);
  }
}
