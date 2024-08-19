import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFilterTriggerComponent } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    FormsModule,
    NzDropDownModule,
    NzFilterTriggerComponent,
    NzIconModule,
    NzInputModule,
    NzButtonModule,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  @Input('column-name') columnName: string = '';
  value: string = '';
  @Input('field-name') fieldName: string = '';
  @Output() search = new EventEmitter<{ fieldName: string; value: string }>();
  @Output() reset = new EventEmitter<string>();
  visible = false;

  onReset() {
    this.value = '';
    this.reset.emit(this.fieldName);
  }
}
