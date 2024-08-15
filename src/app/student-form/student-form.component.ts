import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { School } from '../interfaces/school';
import { SchoolsService } from '../service/schools.service';
import { StudentsService } from '../service/students.service';

@Component({
  selector: 'app-student-form',
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
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.css',
})
export class StudentFormComponent implements OnInit {
  studentForm: FormGroup;
  schools: School[] = [];

  constructor(
    fb: FormBuilder,
    private schoolsService: SchoolsService,
    private studentService: StudentsService
  ) {
    this.studentForm = fb.group({
      name: fb.control('', [
        Validators.minLength(3),
        Validators.maxLength(200),
        Validators.required,
      ]),
      email: fb.control('', [
        Validators.minLength(5),
        Validators.maxLength(200),
        Validators.email,
        Validators.required,
      ]),
      dateOfBirth: fb.control('', [Validators.required, this.dateValidator]),
      schoolId: fb.control(''),
      startedAt: fb.control(''),
    });
  }

  dateValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const date = new Date(control.value);
    const today = new Date();
    if (date > today) {
      return { invalidDate: true };
    }

    return null;
  }

  get name() {
    return this.studentForm.get('name');
  }

  get email() {
    return this.studentForm.get('email');
  }

  get dateOfBirth() {
    return this.studentForm.get('dateOfBirth');
  }

  get startedAt() {
    return this.studentForm.get('startedAt');
  }

  get schoolId() {
    return this.studentForm.get('schoolId');
  }

  ngOnInit(): void {
    this.schoolsService.getAllSchools().subscribe({
      error: (err) => {
        console.log(err);
      },
      next: (schools) => {
        console.log(schools);
        this.schools = schools;
      },
    });
  }

  submit(): void {
    this.studentService.createStudent(this.studentForm.value).subscribe({
      next(data) {
        console.log(data);
      },
      error(err) {
        console.log(err);
      },
    });
  }

  getErrorMessage(name: string): string {
    const control = this.studentForm.get(name);
    if (!control) return '';

    if (control.hasError('required')) {
      return 'This field is required';
    } else if (control.hasError('minlength')) {
      return 'This field is too short';
    } else if (control.hasError('maxlength')) {
      return 'This field is too long';
    } else if (control.hasError('email')) {
      return 'This is not a valid email';
    } else if (control.hasError('invalidDate')) {
      return 'This is not a valid date';
    }

    return '';
  }
}
