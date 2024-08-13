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

interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<Student> | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<Student> | null;
}

@Component({
  selector: 'app-students-list',
  standalone: true,
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css'],
  imports: [CommonModule, NzTableModule, NzButtonComponent],
})
export class StudentsListComponent {
  listOfColumns: ColumnItem[] = [
    {
      name: 'Id',
      sortOrder: null,
      sortFn: null,
      listOfFilter: [],
      filterFn: null,
    },
    {
      name: 'Name',
      sortOrder: null,
      sortFn: (a: Student, b: Student) => a.name.localeCompare(b.name),
      listOfFilter: [
        { text: 'Joe', value: 'Joe' },
        { text: 'Jim', value: 'Jim' },
      ],
      filterFn: (list: string[], item: Student) =>
        list.some((name) => item.name.indexOf(name) !== -1),
    },
    {
      name: 'Email',
      sortFn: (a: Student, b: Student) => a.email.localeCompare(b.email),
      sortOrder: null,
      listOfFilter: [],
      filterFn: null,
    },
    {
      name: 'Age',
      sortOrder: null,
      sortFn: (a: Student, b: Student) => a.age - b.age,
      listOfFilter: [],
      filterFn: null,
    },
  ];
  listOfData: Students = [
    {
      id: 1,
      name: 'John Brown',
      email: 'johnbrown@gmail.com',
      age: 32,
    },
    {
      id: 2,
      name: 'Jim Green',
      email: 'jimgreen@gmail.com',
      age: 42,
    },
    {
      id: 3,
      name: 'Joe Black',
      email: 'joeblack@gmail.com',
      age: 32,
    },
    {
      id: 4,
      name: 'Jim Red',
      email: 'jimred@gmail.com',
      age: 32,
    },
  ];

  trackByName(_: number, item: ColumnItem): string {
    return item.name;
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

  resetFilters(): void {
    this.listOfColumns.forEach((item) => {
      if (item.name === 'Name') {
        item.listOfFilter = [
          { text: 'Joe', value: 'Joe' },
          { text: 'Jim', value: 'Jim' },
        ];
      } else if (item.name === 'Address') {
        item.listOfFilter = [
          { text: 'London', value: 'London' },
          { text: 'Sidney', value: 'Sidney' },
        ];
      }
    });
  }

  resetSortAndFilters(): void {
    this.listOfColumns.forEach((item) => {
      item.sortOrder = null;
    });
    this.resetFilters();
  }
}
