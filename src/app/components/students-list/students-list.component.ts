import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { NzTableModule, NzTableQueryParams } from 'ng-zorro-antd/table';
import { IStudent, IStudentQueryCriteria } from '../../interfaces/student';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { Router } from '@angular/router';
import {
  getInitialPaginateInfo,
  IPaginateInfo,
} from '../../interfaces/paginate';
import { Student } from '../../models/student.model';
import { StudentsService } from '../../service/students.service';
import { TableColumnComponent } from '../common/table-column/table-column.component';
import { NzDividerComponent } from 'ng-zorro-antd/divider';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ColumnItem } from '../common/table-column/table-column.component';
import { Store } from '@ngrx/store';
import { AuthState } from '../store/auth/auth.state';
import { map, Observable } from 'rxjs';
import { selectRole } from '../store/auth/auth.selector';

type filterItem = 'name' | 'email' | 'school';

@Component({
  selector: 'app-students-list',
  standalone: true,
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css'],
  imports: [
    CommonModule,
    NzTableModule,
    NzButtonComponent,
    NzDividerComponent,
    TableColumnComponent,
  ],
})
export class StudentsListComponent implements OnInit {
  total = 0;
  loading = true;
  pageSize = 10;
  pageIndex = 1;
  isAdmin$: Observable<boolean>;
  studentsList: IStudent[] = [];
  filter: { key: filterItem; value: string }[] = [
    {
      key: 'name',
      value: '',
    },
    {
      key: 'email',
      value: '',
    },
    {
      key: 'school',
      value: '',
    },
  ];
  sortField = 'id';
  sortOrder: 'ascend' | 'descend' | null = null;
  listOfColumns: ColumnItem<Student>[] = [
    {
      name: 'Id',
      sortOrder: 'ascend',
      sortDirections: ['ascend', 'descend'],
      sortFn(a: IStudent, b: IStudent) {
        return a.id - b.id;
      },
    },
    {
      name: 'Name',
      sortOrder: 'ascend',
      sortDirections: ['ascend', 'descend'],
      sortFn: (a: IStudent, b: IStudent) => a.name.localeCompare(b.name),
      searchable: true,
      fieldName: 'name',
    },
    {
      name: 'Email',
      sortOrder: 'ascend',
      sortDirections: ['ascend', 'descend'],
      sortFn: (a: IStudent, b: IStudent) => a.email.localeCompare(b.email),
      searchable: true,
      fieldName: 'email',
    },
    {
      name: 'School',
      sortOrder: 'ascend',
      sortDirections: ['ascend', 'descend'],
      sortFn(a: IStudent, b: IStudent) {
        let firstSchool = a.school?.name ?? '';
        let secondSchool = b.school?.name ?? '';
        return firstSchool.localeCompare(secondSchool);
      },
      fieldName: 'school',
      searchable: true,
    },
    {
      name: 'Date of Birth',
      sortOrder: 'ascend',
      sortDirections: ['ascend', 'descend'],
      sortFn(a: IStudent, b: IStudent) {
        const first = new Date(a.dateOfBirth).getTime();
        const second = new Date(b.dateOfBirth).getTime();
        return first - second;
      },
      fieldName: 'dateOfBirth',
    },
    {
      name: 'Started At',
      sortOrder: 'ascend',
      sortDirections: ['ascend', 'descend'],
      sortFn(a: IStudent, b: IStudent) {
        const first = new Date(a.dateOfBirth).getTime();
        const second = new Date(b.dateOfBirth).getTime();

        return first - second;
      },
      fieldName: 'startedAt',
    },
    {
      name: 'Actions',
    },
  ];
  listOfData: IStudent[] = [];
  paginateQueryInfo: IPaginateInfo<IStudentQueryCriteria> = {
    ...getInitialPaginateInfo<IStudentQueryCriteria>({
      name: '',
      email: '',
      school: '',
    }),
  };

  constructor(
    private router: Router,
    private studentsService: StudentsService,
    private message: NzMessageService,
    private store: Store<AuthState>
  ) {
    this.isAdmin$ = this.store
      .select(selectRole)
      .pipe(map((role) => role === 'ADMIN'));
  }

  ngOnInit(): void {
    this.studentsService.getPaginateStudents(this.paginateQueryInfo).subscribe({
      next: (data) => {
        this.studentsList = data.content;
        this.pageIndex = data.pageable.pageNumber + 1;
        this.pageSize = data.pageable.pageSize;
        this.total = data.totalElements;
        this.loading = false;
      },
    });
  }

  onSearch({ fieldName, value }: { fieldName: string; value: string }): void {
    this.filter.forEach((item) => {
      if (item.key === fieldName) {
        item.value = value.trim();
      }
    });

    const params = {
      pageSize: this.pageSize,
      pageIndex: this.pageIndex,
      sort: [],
      filter: [...this.filter],
    } satisfies NzTableQueryParams;

    this.onQueryParamsChange(params);
  }

  onReset(fieldName: string): void {
    this.filter.forEach((item) => {
      if (item.key === fieldName) {
        item.value = '';
      }
    });

    const params = {
      pageSize: this.pageSize,
      pageIndex: this.pageIndex,
      sort: [],
      filter: [...this.filter],
    } satisfies NzTableQueryParams;

    this.onQueryParamsChange(params);
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex, sort, filter: searchValues } = params;

    for (let i = 0; i < sort.length; i++) {
      if (sort[i].value) {
        const col = this.listOfColumns[i];
        this.sortField = col.fieldName ?? col.name.toLowerCase();
        this.sortOrder =
          (sort[i] && (sort[i].value as 'ascend' | 'descend' | null)) ?? null;
        break;
      }
    }

    this.loading = true;
    this.studentsService
      .getPaginateStudents({
        pageIndex,
        pageSize,
        sortField: this.sortField,
        sortOrder: this.sortOrder,
        queryCriteria: this.getQueryCriteria(this.filter),
      })
      .subscribe((data) => {
        this.loading = false;
        this.pageIndex = data.pageable.pageNumber + 1;
        this.pageSize = data.pageable.pageSize;
        this.total = data.totalElements;
        this.studentsList = data.content;
      });
  }

  private getQueryCriteria(searchValues: { key: string; value: string }[]) {
    let queryCriteria = {} as IStudentQueryCriteria;

    searchValues.forEach((item) => {
      if (item.value) {
        queryCriteria = { ...queryCriteria, [item.key]: item.value };
      }
    });

    Object.keys(queryCriteria).forEach(
      (key) => (queryCriteria[key] = queryCriteria[key].trim() ?? '')
    );

    return queryCriteria;
  }

  onStudentEdit(id: number) {
    this.router.navigate([`/students/${id}`]);
  }

  onStudentDelete(id: number) {
    this.studentsService.deleteStudent(id).subscribe({
      next: () => {
        this.studentsList = this.studentsList.filter(
          (student) => student.id !== id
        );
        this.total -= 1;
        this.message.success('Student deleted successfully');
      },
    });
  }

  trackByName(_: number, item: ColumnItem<Student>): string {
    return item.name;
  }

  trackByStudentId(_: number, item: IStudent): number {
    return item.id;
  }

  create(): void {
    this.router.navigate(['/students/create']);
  }

  toDateString(date: string | Date | null | undefined): string {
    if (!date) return 'No date selected';
    if (typeof date === 'string') date = new Date(date);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }
}
