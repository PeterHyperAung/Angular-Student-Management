import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { School } from '../interfaces/school';
import { environment } from '../environments/environment';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root',
})
export class SchoolsService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private jwtService: JwtService) {}

  getAllSchools() {
    const token = this.jwtService.getLocalStroageToken();

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
