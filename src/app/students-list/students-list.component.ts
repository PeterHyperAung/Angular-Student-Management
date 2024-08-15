import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import {
  NzTableFilterFn,
  NzTableFilterList,
  NzTableModule,
  NzTableSortFn,
  NzTableSortOrder,
} from 'ng-zorro-antd/table';
import { Student, Students } from '../interfaces/student';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { Router } from '@angular/router';

interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<Student> | null;
}

@Component({
  selector: 'app-students-list',
  standalone: true,
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css'],
  imports: [CommonModule, NzTableModule, NzButtonComponent],
})
export class StudentsListComponent {
  constructor(private router: Router) {}

  listOfColumns: ColumnItem[] = [
    {
      name: 'Id',
      sortOrder: null,
      sortFn: (a: Student, b: Student) => a.id - b.id,
    },
    {
      name: 'Name',
      sortOrder: null,
      sortFn: (a: Student, b: Student) => a.name.localeCompare(b.name),
    },
    {
      name: 'Email',
      sortFn: (a: Student, b: Student) => a.email.localeCompare(b.email),
      sortOrder: null,
    },
    {
      name: 'Date of Birth',
      sortOrder: null,
      sortFn: (a: Student, b: Student) =>
        new Date(a.dateOfBirth).getTime() - new Date(b.dateOfBirth).getTime(),
    },
    {
      name: 'School',
      sortOrder: null,
      sortFn: (a: Student, b: Student) =>
        a.school.name.localeCompare(b.school.name),
    },
    {
      name: 'Started At',
      sortOrder: null,
      sortFn: (a: Student, b: Student) =>
        new Date(a.startedAt ?? '').getTime() -
        new Date(b.startedAt ?? '').getTime(),
    },
  ];
  listOfData: Students = [
    {
      id: 1,
      name: 'John Brown',
      email: 'johnbrown@gmail.com',
      dateOfBirth: '2000-01-01',
      school: {
        id: 1,
        name: 'School 1',
        principal: 'Principal 1',
      },
      startedAt: '2019-01-01',
    },
    {
      id: 2,
      name: 'Jim Green',
      email: 'jimgreen@gmail.com',
      dateOfBirth: '2010-01-01',
      school: {
        id: 1,
        name: 'School 1',
        principal: 'Principal 1',
      },
      startedAt: '2017-01-01',
    },
    {
      id: 3,
      name: 'Joe Black',
      email: 'joeblack@gmail.com',
      dateOfBirth: '2005-01-01',
      school: {
        id: 1,
        name: 'School 1',
        principal: 'Principal 1',
      },
      startedAt: '2018-01-01',
    },
    {
      id: 4,
      name: 'Jim Red',
      email: 'jimred@gmail.com',
      dateOfBirth: '2012-01-01',
      school: {
        id: 1,
        name: 'School 1',
        principal: 'Principal 1',
      },
      startedAt: '2019-03-01',
    },
  ];

  trackByName(_: number, item: ColumnItem): string {
    return item.name;
  }

  trackByStudentId(_: number, item: Student): number {
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

  sortByAge(): void {
    this.listOfColumns.forEach((item) => {
      if (item.name === 'Age') {
        item.sortOrder = 'descend';
      } else {
        item.sortOrder = null;
      }
    });
  }

  // resetFilters(): void {
  //   this.listOfColumns.forEach((item) => {
  //     if (item.name === 'Name') {
  //       item.listOfFilter = [
  //         { text: 'Joe', value: 'Joe' },
  //         { text: 'Jim', value: 'Jim' },
  //       ];
  //     } else if (item.name === 'Address') {
  //       item.listOfFilter = [
  //         { text: 'London', value: 'London' },
  //         { text: 'Sidney', value: 'Sidney' },
  //       ];
  //     }
  //   });
  // }

  resetSortAndFilters(): void {
    this.listOfColumns.forEach((item) => {
      item.sortOrder = null;
    });
    // this.resetFilters();
  }
}
