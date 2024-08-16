import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { SchoolsService } from '../../service/schools.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-school-form',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonComponent,
    NzCardComponent,
    NzTypographyModule,
    NzFlexModule,
    NzAlertModule,
    NzDatePickerModule,
    NzSelectModule,
  ],
  templateUrl: './school-form.component.html',
  styleUrl: './school-form.component.css',
})
export class SchoolFormComponent implements OnInit {
  schoolForm: FormGroup;
  id: number | null = null;
  loading = true;

  constructor(
    fb: FormBuilder,
    private schoolsService: SchoolsService,
    private message: NzMessageService,
    private route: ActivatedRoute
  ) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.schoolForm = fb.group({
      name: fb.control('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(200),
      ]),
      principal: fb.control('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(200),
      ]),
    });
  }

  get btnText(): string {
    return this.id ? 'Update' : 'Create';
  }

  ngOnInit(): void {
    if (this.id) {
      this.schoolsService.getSchool(this.id).subscribe({
        next: (data) => {
          this.schoolForm.patchValue(data);
          this.loading = false;
        },
        error(err) {
          console.log(err);
        },
      });
    } else {
      this.loading = false;
    }
  }

  submit(): void {
    if (this.id) this.updateSchool();
    else this.createSchool();
  }

  private updateSchool() {
    console.log(this.schoolForm.value);
    this.schoolsService
      .updateSchool(this.schoolForm.value, this.id as number)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.message.success('School updated successfully');
        },
        error(err) {
          console.log(err);
        },
      });
  }

  private createSchool() {
    this.schoolsService.createSchool(this.schoolForm.value).subscribe({
      next: (data) => {
        console.log(data);
        this.schoolForm.reset();
        this.message.success('School created successfully');
      },
      error(err) {
        console.log(err);
      },
    });
  }

  get name(): AbstractControl {
    return this.schoolForm.get('name') as AbstractControl;
  }

  get principal(): AbstractControl {
    return this.schoolForm.get('principal') as AbstractControl;
  }

  getErrorMessage(name: string): string {
    const control = this.schoolForm.get(name);
    if (!control) return '';

    if (control.hasError('required')) {
      return 'This field is required';
    } else if (control.hasError('minlength')) {
      return 'This field is too short';
    } else if (control.hasError('maxlength')) {
      return 'This field is too long';
    }

    return '';
  }
}
