import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  NzTableModule,
  NzTableSortFn,
  NzTableSortOrder,
} from 'ng-zorro-antd/table';
import { SearchComponent } from '../search/search.component';

export interface ColumnItem<T> {
  name: string;
  sortOrder?: NzTableSortOrder | null;
  sortFn?: NzTableSortFn<T> | null;
  sortDirections?: NzTableSortOrder[];
  searchable?: boolean;
  fieldName?: string;
}

@Component({
  selector: 'app-table-column',
  standalone: true,
  imports: [NzTableModule, SearchComponent],
  templateUrl: './table-column.component.html',
  styleUrl: './table-column.component.css',
})
export class TableColumnComponent<T> {
  @Input() listOfColumns: ColumnItem<T>[] = [];
  @Output('search') search = new EventEmitter<{
    fieldName: string;
    value: string;
  }>();
  @Output('reset') reset = new EventEmitter<string>();

  onSearch(event: { fieldName: string; value: string }) {
    this.search.emit(event);
  }

  onReset(fieldName: string) {
    this.reset.emit(fieldName);
  }
}
