import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ISchool, ISchoolQueryCriteria } from '../../interfaces/school';
import { Router } from '@angular/router';
import { NzTableModule, NzTableQueryParams } from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { SchoolsService } from '../../service/schools.service';
import {
  getInitialPaginateInfo,
  IPaginateInfo,
} from '../../interfaces/paginate';
import { School } from '../../models/school.model';
import { NzDividerComponent } from 'ng-zorro-antd/divider';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SearchComponent } from '../common/search/search.component';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import {
  ColumnItem,
  TableColumnComponent,
} from '../common/table-column/table-column.component';
import { Store } from '@ngrx/store';
import { AuthState } from '../store/auth/auth.state';
import { map, Observable } from 'rxjs';
import { selectRole } from '../store/auth/auth.selector';
import { IStudent } from '../../interfaces/student';
import { IExcel } from '../common/types/excel';
import { FileHandler } from '../common/utils/FileHandler';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';

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
    NzIconModule,
    NzSpinModule,
  ],
  templateUrl: './schools-list.component.html',
  styleUrl: './schools-list.component.css',
})
export class SchoolsListComponent implements OnInit {
  isAdmin$: Observable<boolean>;
  @ViewChild('file') fileInput!: ElementRef;
  total = 0;
  pageSize = 10;
  pageIndex = 1;
  loading = true;
  fileLoading = false;
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
      sortFn: (a: School, b: School) => {
        if (a.principal === b.principal) return 0;
        if (!a.principal) return -1;
        if (!b.principal) return 1;
        return a.principal.localeCompare(b.principal);
      },
      searchable: true,
    },
    {
      name: 'Actions',
    },
  ];
  schoolsList: School[] = [];
  paginateQueryInfo: IPaginateInfo<ISchoolQueryCriteria> = {
    ...getInitialPaginateInfo<ISchoolQueryCriteria>({
      name: '',
      principal: '',
    }),
  };

  constructor(
    private router: Router,
    private schoolsService: SchoolsService,
    private message: NzMessageService,
    private store: Store<AuthState>,
    private fileHandler: FileHandler
  ) {
    this.isAdmin$ = this.store
      .select(selectRole)
      .pipe(map((role) => role === 'ADMIN'));
  }

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

  downloadExcelFile() {
    return this.schoolsService.downloadExcelFile().subscribe({
      next: (data: IExcel) => {
        this.fileHandler.downloadFileFromBase64(data.content, data.filename);
      },
      error: (err) => console.log(err),
      complete: () => console.log('completed'),
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

  async handleUpload() {
    const file = this.fileInput.nativeElement.files[0] as File;
    if (!(await this.fileHandler.checkFileType(file, 'xlsx'))) {
      this.message.error('Invalid file type');
      this.fileInput.nativeElement.value = '';
      return;
    }
    this.fileLoading = true;
    this.schoolsService
      .createSchoolsFromExcel(
        {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          sortField: this.sortField,
          sortOrder: this.sortOrder,
          queryCriteria: this.getQueryCriteria(this.filter),
        },
        file
      )
      .subscribe({
        next: (data) => {
          this.pageIndex = data.pageable.pageNumber + 1;
          this.pageSize = data.pageable.pageSize;
          this.total = data.totalElements;
          this.schoolsList = data.content;
          this.fileInput.nativeElement.value = '';
          this.message.success('Schools uploaded successfully');
          this.fileLoading = false;
          this.fileInput.nativeElement.value = '';
        },
        error: () => {
          this.message.error('Error uploading schools');
          this.fileLoading = false;
          this.fileInput.nativeElement.value = '';
        },
      });
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
        queryCriteria: this.getQueryCriteria(this.filter),
      })
      .subscribe((data) => {
        this.loading = false;
        this.pageIndex = data.pageable.pageNumber + 1;
        this.pageSize = data.pageable.pageSize;
        this.total = data.totalElements;
        this.schoolsList = data.content;
      });
  }

  private getQueryCriteria(searchValues: { key: string; value: string }[]) {
    let queryCriteria = {} as ISchoolQueryCriteria;
    searchValues.forEach((item) => {
      queryCriteria = { ...queryCriteria, [item.key]: item.value };
    });
    if (!queryCriteria.name) queryCriteria.name = '';
    if (!queryCriteria.principal) queryCriteria.principal = '';
    return queryCriteria;
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
