import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableColumnComponent } from './table-column.component';

describe('TableColumnComponent', () => {
  let component: TableColumnComponent;
  let fixture: ComponentFixture<TableColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableColumnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
