import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISchool, ISchoolQueryCriteria } from '../interfaces/school';
import { environment } from '../environments/environment';
import { JwtService } from './jwt.service';
import { IPaginateInfo, IPaginateResponse } from '../interfaces/paginate';
import { School } from '../models/school.model';
import { IExcel } from '../components/common/types/excel';

@Injectable({
  providedIn: 'root',
})
export class SchoolsService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private jwtService: JwtService) {}

  downloadExcelFile() {
    return this.http.get<IExcel>(`${this.apiUrl}/schools/excel`);
  }

  getAllSchools() {
    return this.http.get<ISchool[]>(`${this.apiUrl}/schools`);
  }

  getPaginateSchools(paginateQueryInfo: IPaginateInfo<ISchoolQueryCriteria>) {
    return this.http.post<IPaginateResponse<ISchool>>(
      `${this.apiUrl}/schools/nz-paginate`,
      paginateQueryInfo
    );
  }

  getSchool(schoolId: number) {
    return this.http.get<ISchool[]>(`${this.apiUrl}/schools/${schoolId}`);
  }

  createSchool(body: ISchool) {
    return this.http.post<ISchool>(`${this.apiUrl}/schools/school`, body);
  }

  updateSchool(body: ISchool, id: number) {
    return this.http.patch<ISchool>(`${this.apiUrl}/schools/${id}`, body);
  }

  deleteSchool(schoolId: number) {
    return this.http.delete(`${this.apiUrl}/schools/${schoolId}`);
  }
}
