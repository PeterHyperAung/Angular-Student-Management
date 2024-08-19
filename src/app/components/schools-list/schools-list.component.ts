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
import { NzMessageService } from 'ng-zorro-antd/message';
import { SearchComponent } from '../common/search/search.component';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import {
  ColumnItem,
  TableColumnComponent,
} from '../common/table-column/table-column.component';

@Component({
  selector: 'app-schools-list',
  standalone: true,
  imports: [
    CommonModule,
    NzTableModule,
    NzFlexModule,
    NzButtonComponent,
    NzDividerComponent,
    SearchComponent,
    TableColumnComponent,
  ],
  templateUrl: './schools-list.component.html',
  styleUrl: './schools-list.component.css',
})
export class SchoolsListComponent implements OnInit {
  total = 0;
  pageSize = 10;
  pageIndex = 1;
  loading = true;
  filter: { key: string; value: string }[] = [
    {
      key: 'name',
      value: '',
    },
    {
      key: 'principal',
      value: '',
    },
  ];
  sortField = 'id';
  sortOrder: 'ascend' | 'descend' | null = null;
  listOfColumns: ColumnItem<ISchool>[] = [
    {
      name: 'Id',
      sortOrder: 'ascend',
      sortDirections: ['ascend', 'descend'],
      sortFn: (a: School, b: School) => a.id - b.id,
    },
    {
      name: 'Name',
      sortOrder: 'ascend',
      sortDirections: ['ascend', 'descend'],
      sortFn: (a: School, b: School) => a.name.localeCompare(b.name),
      searchable: true,
    },
    {
      name: 'Principal',
      sortOrder: 'ascend',
      sortDirections: ['ascend', 'descend'],
      sortFn: (a: School, b: School) => a.principal.localeCompare(b.principal),
      searchable: true,
    },
    {
      name: 'Actions',
    },
  ];
  schoolsList: School[] = [];
  paginateQueryInfo = {
    ...initialPaginateInfo,
    searchValues: [
      { key: 'name', value: '' },
      { key: 'principal', value: '' },
    ],
  };

  constructor(
    private router: Router,
    private schoolsService: SchoolsService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.schoolsService.getPaginateSchools(this.paginateQueryInfo).subscribe({
      next: (data) => {
        this.schoolsList = data.content;
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
    console.log(params);

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
    console.log(params);

    this.onQueryParamsChange(params);
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex, sort, filter: searchValues } = params;

    for (let i = 0; i < sort.length; i++) {
      if (sort[i].value) {
        this.sortField = this.listOfColumns[i].name.toLowerCase();
        this.sortOrder =
          (sort[i] && (sort[i].value as 'ascend' | 'descend' | null)) ?? null;
        break;
      }
    }

    this.loading = true;
    this.schoolsService
      .getPaginateSchools({
        pageIndex,
        pageSize,
        sortField: this.sortField,
        sortOrder: this.sortOrder,
        searchValues: this.filter,
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
    this.schoolsService.deleteSchool(id).subscribe({
      next: () => {
        this.schoolsList = this.schoolsList.filter(
          (school) => school.id !== id
        );
        this.total -= 1;
        this.message.success('School deleted successfully');
      },
    });
  }

  trackByName(_: number, item: ColumnItem<ISchool>): string {
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
}
