import { Component, OnInit } from '@angular/core';
import { ISchool } from '../../interfaces/school';
import { Router } from '@angular/router';
import {
  NzTableModule,
  NzTableQueryParams,
  NzTableSortFn,
  NzTableSortOrder,
} from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { SchoolsService } from '../../service/schools.service';
import { initialPaginateInfo } from '../../interfaces/paginate';
import { School } from '../../models/school.model';
import { NzDividerComponent } from 'ng-zorro-antd/divider';

interface ColumnItem {
  name: string;
  sortOrder?: NzTableSortOrder | null;
  sortFn?: NzTableSortFn<ISchool> | null;
}

@Component({
  selector: 'app-schools-list',
  standalone: true,
  imports: [CommonModule, NzTableModule, NzButtonComponent, NzDividerComponent],
  templateUrl: './schools-list.component.html',
  styleUrl: './schools-list.component.css',
})
export class SchoolsListComponent implements OnInit {
  total = 0;
  pageSize = 10;
  pageIndex = 1;
  loading = true;
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
    {
      name: 'Actions',
    },
  ];
  schoolsList: School[] = [];
  paginateQueryInfo = { ...initialPaginateInfo };

  constructor(private router: Router, private schoolsService: SchoolsService) {}

  ngOnInit(): void {
    this.schoolsService.getPaginateSchools(this.paginateQueryInfo).subscribe({
      next: (data) => {
        this.schoolsList = data.content;
        this.loading = false;
      },
    });
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    console.log(params);
    const { pageSize, pageIndex, sort, filter: searchValues } = params;
    const currentSort = sort.find((item) => item.value !== null);
    const sortField = (currentSort && currentSort.key) || 'id';
    const sortOrder =
      (currentSort && (currentSort.value as 'asc' | 'desc')) || null;
    this.loading = true;
    this.schoolsService
      .getPaginateSchools({
        pageIndex,
        pageSize,
        sortField,
        sortOrder,
        searchValues,
      })
      .subscribe((data) => {
        console.log(data);
        this.loading = false;
        this.pageIndex = data.pageable.pageNumber + 1;
        this.pageSize = data.pageable.pageSize;
        this.total = data.totalElements;
        this.schoolsList = data.content;
      });
  }

  onSchoolEdit(id: number) {
    this.router.navigate([`/schools/${id}`]);
  }

  onSchoolDelete(id: number) {
    console.log(id);
  }

  trackByName(_: number, item: ColumnItem): string {
    return item.name;
  }

  trackBySchoolId(_: number, item: ISchool): number {
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
