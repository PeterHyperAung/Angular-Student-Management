import { Component } from '@angular/core';
import { School } from '../interfaces/school';
import { Router } from '@angular/router';
import {
  NzTableModule,
  NzTableSortFn,
  NzTableSortOrder,
} from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common';
import { NzButtonComponent } from 'ng-zorro-antd/button';

interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<School> | null;
}

@Component({
  selector: 'app-schools-list',
  standalone: true,
  imports: [CommonModule, NzTableModule, NzButtonComponent],
  templateUrl: './schools-list.component.html',
  styleUrl: './schools-list.component.css',
})
export class SchoolsListComponent {
  constructor(private router: Router) {}

  listOfColumns: ColumnItem[] = [
    {
      name: 'Id',
      sortOrder: null,
      sortFn: (a: School, b: School) => a.id - b.id,
    },
    {
      name: 'Name',
      sortOrder: null,
      sortFn: (a: School, b: School) => a.name.localeCompare(b.name),
    },
    {
      name: 'Principal',
      sortOrder: null,
      sortFn: (a: School, b: School) => a.principal.localeCompare(b.principal),
    },
  ];
  listOfData: School[] = [
    {
      id: 1,
      name: 'John Brown',
      principal: 'Principal 1',
    },
    {
      id: 2,
      name: 'Jim Green',
      principal: 'Principal 2',
    },
    {
      id: 3,
      name: 'Joe Black',
      principal: 'Principal 3',
    },
    {
      id: 4,
      name: 'Jim Red',
      principal: 'Principal 4',
    },
  ];

  trackByName(_: number, item: ColumnItem): string {
    return item.name;
  }

  trackBySchoolId(_: number, item: School): number {
    return item.id;
  }

  create(): void {
    this.router.navigate(['/schools/create']);
  }

  toDateString(date: string | Date): string {
    if (!date) return '';
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
}
