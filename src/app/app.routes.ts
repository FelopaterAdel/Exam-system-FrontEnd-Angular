import { ExamDetailsComponent } from './pages/exam/exam-details/exam-details.component';
import { Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AccountComponent } from './pages/account/account.component';
import { LoginComponent } from './pages/account/login/login.component';
import { RegisterComponent } from './pages/account/register/register.component';
import { ExamComponent } from './pages/exam/exam.component';
import { ExamFormComponent } from './pages/exam/exam-form/exam-form.component';
import { TakeExamComponent } from './pages/exam/take-exam/take-exam.component';
import { ExamResultComponent } from './pages/exam/exam-result/exam-result.component';
import { ProfileComponent } from './pages/account/profile/profile.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'exams',
    pathMatch: 'full',
  },
  {
    path: 'exams',
    component: ExamComponent,
  },
  {
    path: 'exams',
    component: ExamComponent,
  },
  {
    path: 'exams/:id/edit',
    component: ExamFormComponent,
  },
  {
    path: 'exams/:id/take',
    component: TakeExamComponent
  },
  {
    path: 'exams/:id/result',
    component: ExamResultComponent
  },


  {
    path: 'exams/:id',
    component: ExamDetailsComponent,
  },


  {
    path: 'account',
    component: AccountComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full'
        ,data: { hideHeader: true }
       },
      { path: 'login', component: LoginComponent ,
        data: { hideHeader: true }
      },
      { path: 'register', component: RegisterComponent, 
        data: { hideHeader: true }
      },
      { path: 'profile', component: ProfileComponent, 
       
      },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

