import { Routes } from '@angular/router';
import { StudentsListComponent } from './components/students-list/students-list.component';
import { StudentFormComponent } from './components/student-form/student-form.component';
import { SchoolsListComponent } from './components/schools-list/schools-list.component';
import { SchoolFormComponent } from './components/school-form/school-form.component';
import { HomeComponent } from './components/home/home.component';
import { LogoutComponent } from './components/auth/logout/logout.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'students',
    component: StudentsListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'students/:id',
    component: StudentFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'students/create',
    component: StudentFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'schools',
    component: SchoolsListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'schools/:id',
    component: SchoolFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'schools/create',
    component: SchoolFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'logout',
    component: LogoutComponent,
    canActivate: [AuthGuard],
  },
];
