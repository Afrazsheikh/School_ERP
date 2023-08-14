import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmissionComponent } from './pages/admission/admission.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './pages/auth/auth.guard';
import { LogoutComponent } from './pages/logout/logout.component';
const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'logout',
    component: LogoutComponent,
  },
  {
    path: 'dashboard',
    canActivate: [ AuthGuard ],
    component: DashboardComponent,
  },
  {
    path: 'admission',
    canActivate: [ AuthGuard ],
    loadChildren: () =>
      import('./pages/admission/admission.module').then(
        (m) => m.AdmissionModule
      ),
  },
  {
    path: 'fees',
    canActivate: [ AuthGuard ],
    loadChildren: () =>
      import('./pages/fees/fees.module').then((m) => m.FeesModule),
  },
  {
    path: 'student-details',
    canActivate: [ AuthGuard ],
    loadChildren: () =>
      import('./pages/student-details/student-details.module').then(
        (m) => m.StudentDetailsModule
      ),
  },
  {
    path: 'employee',
    canActivate: [ AuthGuard ],
    loadChildren: () =>
      import('./pages/employees/employees.module').then(
        (m) => m.EmployeesModule
      ),
  },
  {
    path: 'cert',
    canActivate: [ AuthGuard ],
    loadChildren: () =>
      import('./pages/certificate/certificate.module').then(
        (m) => m.CertificateModule
      ),
  },
  {
    path: 'marks',
    canActivate: [ AuthGuard ],
    loadChildren: () =>
      import('./pages/marks/marks.module').then((m) => m.MarksModule),
  },
  {
    path: 'homework',
    canActivate: [ AuthGuard ],
    loadChildren: () =>
      import('./pages/homework/homework.module').then((m) => m.HomeworkModule),
  },
  {
    path: 'bulk',
    canActivate: [ AuthGuard ],
    loadChildren: () =>
      import('./pages/bulk-sms/bulk-sms.module').then((m) => m.BulkSmsModule),
  },
  {
    path: 'transport',
    canActivate: [ AuthGuard ],
    loadChildren: () =>
      import('./pages/transport/transport.module').then(
        (m) => m.TransportModule
      ),
  },
  {
    path: 'reception',
    canActivate: [ AuthGuard ],
    loadChildren: () =>
      import('./pages/reception/reception.module').then(
        (m) => m.ReceptionModule
      ),
  },
  {
    path: 'academic',
    canActivate: [ AuthGuard ],
    loadChildren: () =>
      import('./pages/academic/academic.module').then((m) => m.AcademicModule),
  },
  {
    path: 'student-acconting',
    canActivate: [ AuthGuard ],
    loadChildren: () =>
      import('./pages/strudent-accounting/student-accounting.module').then(
        (m) => m.StudentAccountingModule
      ),
  },
  {
    path: 'human-resource',
    canActivate: [ AuthGuard ],
    loadChildren: () =>
      import('./pages/human-ressource/human-ressource.module').then(
        (m) => m.HumanRessourceModule
      ),
  },
  {
    path: 'report',
    canActivate: [ AuthGuard ],
    loadChildren: () =>
      import('./pages/reports/reports.module').then((m) => m.ReportsModule),
  },

  {
    path: 'parent',
    canActivate: [ AuthGuard ],
    loadChildren: () =>
      import('./pages/parents-app/parents-app.module').then(
        (m) => m.ParentsAppModule
      ),
  },
  {
    path: 'attendance',
    canActivate: [ AuthGuard ],
    loadChildren: () =>
      import('./pages/attendance/attendance.module').then(
        (m) => m.AttendanceModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
