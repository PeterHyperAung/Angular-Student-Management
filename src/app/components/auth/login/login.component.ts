import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
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
import { AuthService } from '../../../service/auth.service';
import { JwtService } from '../../../service/jwt.service';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { Store } from '@ngrx/store';
import { AuthState } from '../../store/auth/auth.state';
import { login } from '../../store/auth/auth.actions';

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
    NzAlertModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = true;
  unexpectedError = false;
  authFail = false;

  constructor(
    fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private jwtService: JwtService,
    private location: Location,
    private store: Store<AuthState>
  ) {
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
  }

  ngOnInit(): void {
    if (this.jwtService.checkAuth()) {
      this.location.back();
    } else {
      this.loading = false;
    }
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
    this.authService.login(this.loginForm.value).subscribe({
      error: (err: any) => {
        if (err.status === 400 && err.error.status == 'FAIL') {
          this.authFail = true;
          return;
        }
        this.unexpectedError = true;
      },
      next: (res: any) => {
        const user = this.jwtService.parseJwt(res.token);
        this.store.dispatch(
          login({
            username: user.username,
            role: user.role,
            token: res.token,
          })
        );
        this.router.navigate(['/']);
      },
    });
  }
}
