import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
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
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
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
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  private authService: AuthService;

  constructor(fb: FormBuilder, authService: AuthService) {
    this.authService = authService;
    this.loginForm = fb.group({
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

    console.log(this.loginForm.get('username'));
    console.log(this.loginForm.get('password'));
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  getErrorMessage(controlName: string): string {
    const control = this.loginForm.get(controlName);
    if (control?.hasError('required')) {
      return 'You must enter a value';
    }
    if (control?.hasError('minlength')) {
      return `Minimum length is ${control.errors?.['minlength'].requiredLength}`;
    }
    if (control?.hasError('maxlength')) {
      return `Maximum length is ${control.errors?.['maxlength'].requiredLength}`;
    }

    return '';
  }

  submitForm(): void {
    if (this.loginForm.invalid) return;
    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value).subscribe({
      error: (err) => console.log(err),
      next: (res: any) => {
        console.log(res);
        this.authService.setToken(res.token);
      },
    });
  }
}
