import { Routes } from '@angular/router';
import { StudentsListComponent } from './students-list/students-list.component';
import { StudentFormComponent } from './student-form/student-form.component';
import { SchoolsListComponent } from './schools-list/schools-list.component';
import { SchoolFormComponent } from './school-form/school-form.component';
import { HomeComponent } from './home/home.component';
import { LogoutComponent } from './logout/logout.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
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
