import { Routes } from '@angular/router';
import { StudentsListComponent } from './students-list/students-list.component';
import { StudentFormComponent } from './student-form/student-form.component';
import { SchoolsListComponent } from './schools-list/schools-list.component';
import { SchoolFormComponent } from './school-form/school-form.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'students',
    component: StudentsListComponent,
  },
  {
    path: 'students/create',
    component: StudentFormComponent,
  },
  {
    path: 'schools',
    component: SchoolsListComponent,
  },
  {
    path: 'schools/create',
    component: SchoolFormComponent,
  },
];
