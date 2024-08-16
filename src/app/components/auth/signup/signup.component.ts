import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { JwtService } from '../../../service/jwt.service';
import { Location } from '@angular/common';
import { AuthService } from '../../../service/auth.service';
import { NzAlertModule } from 'ng-zorro-antd/alert';

@Component({
  selector: 'app-signup',
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
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  loading: boolean = true;
  unexpectedError: boolean = false;

  constructor(
    fb: FormBuilder,
    private authService: AuthService,
    private jwtService: JwtService,
    private router: Router,
    private location: Location
  ) {
    this.signupForm = fb.group({
      username: fb.control('', [
        Validators.minLength(3),
        Validators.maxLength(200),
        Validators.required,
      ]),
      password: fb.control('', [
        Validators.minLength(5),
        Validators.maxLength(200),
        Validators.required,
      ]),
    });
  }

  ngOnInit(): void {
    if (this.jwtService.checkAuth()) {
      this.location.back();
    } else {
      this.loading = false;
    }
  }

  get username() {
    return this.signupForm.get('username');
  }

  get password() {
    return this.signupForm.get('password');
  }

  getErrorMessage(controlName: string): string {
    const control = this.signupForm.get(controlName);
    if (control?.hasError('required')) {
      return 'You must enter a value';
    }
    if (control?.hasError('minlength')) {
      return `Minimum length is ${control.errors?.['minlength'].requiredLength}`;
    }
    if (control?.hasError('maxlength')) {
      return `Maximum length is ${control.errors?.['maxlength'].requiredLength}`;
    }
    if (control?.hasError('isTaken')) {
      return 'Username is already taken';
    }

    return '';
  }

  submitForm(): void {
    this.authService.signup(this.signupForm.value).subscribe({
      error: (err) => {
        console.log(err);
        if (err.status === 401 && err.error.status === 'FAIL') {
          return this.signupForm.get('username')?.setErrors({ isTaken: true });
        }
        this.unexpectedError = true;
      },
      next: (res: any) => {
        this.router.navigate(['/login']);
      },
    });
  }
}
