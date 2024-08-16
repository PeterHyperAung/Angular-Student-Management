import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import {
  NzTableFilterFn,
  NzTableFilterList,
  NzTableModule,
  NzTableSortFn,
  NzTableSortOrder,
} from 'ng-zorro-antd/table';
import { IStudent } from '../../interfaces/student';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { Router } from '@angular/router';
import { SchoolsService } from '../../service/schools.service';
import { initialPaginateInfo, IPaginateInfo } from '../../interfaces/paginate';

interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<IStudent> | null;
}

@Component({
  selector: 'app-students-list',
  standalone: true,
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css'],
  imports: [CommonModule, NzTableModule, NzButtonComponent],
})
export class StudentsListComponent implements OnInit {
  loading = true;
  listOfColumns: ColumnItem[] = [];
  listOfData: IStudent[] = [];
  paginateQueryInfo: IPaginateInfo = { ...initialPaginateInfo };

  constructor(private router: Router, private schoolsService: SchoolsService) {}

  ngOnInit(): void {}

  trackByName(_: number, item: ColumnItem): string {
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
