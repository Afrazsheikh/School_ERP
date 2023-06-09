import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmissionComponent } from './pages/admission/admission.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
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
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'admission',
    loadChildren: () =>
      import('./pages/admission/admission.module').then(
        (m) => m.AdmissionModule
      ),
  },
  {
    path: 'fees',
    loadChildren: () =>
      import('./pages/fees/fees.module').then((m) => m.FeesModule),
  },
  {
    path: 'student-details',
    loadChildren: () =>
      import('./pages/student-details/student-details.module').then(
        (m) => m.StudentDetailsModule
      ),
  },
  {
    path: 'employee',
    loadChildren: () =>
      import('./pages/employees/employees.module').then(
        (m) => m.EmployeesModule
      ),
  },
  {
    path: 'cert',
    loadChildren: () =>
      import('./pages/certificate/certificate.module').then(
        (m) => m.CertificateModule
      ),
  },
  {
    path: 'marks',
    loadChildren: () =>
      import('./pages/marks/marks.module').then((m) => m.MarksModule),
  },
  {
    path: 'homework',
    loadChildren: () =>
      import('./pages/homework/homework.module').then((m) => m.HomeworkModule),
  },
  {
    path: 'bulk',
    loadChildren: () =>
      import('./pages/bulk-sms/bulk-sms.module').then((m) => m.BulkSmsModule),
  },
  {
    path: 'transport',
    loadChildren: () =>
      import('./pages/transport/transport.module').then(
        (m) => m.TransportModule
      ),
  },
  {
    path: 'reception',
    loadChildren: () =>
      import('./pages/reception/reception.module').then(
        (m) => m.ReceptionModule
      ),
  },
  {
    path: 'academic',
    loadChildren: () =>
      import('./pages/academic/academic.module').then((m) => m.AcademicModule),
  },
  {
    path: 'student-acconting',
    loadChildren: () =>
      import('./pages/strudent-accounting/student-accounting.module').then(
        (m) => m.StudentAccountingModule
      ),
  },
  {
    path: 'human-resource',
    loadChildren: () =>
      import('./pages/human-ressource/human-ressource.module').then(
        (m) => m.HumanRessourceModule
      ),
  },
  {
    path: 'report',
    loadChildren: () =>
      import('./pages/reports/reports.module').then((m) => m.ReportsModule),
  },

  {
    path: 'parent',
    loadChildren: () =>
      import('./pages/parents-app/parents-app.module').then(
        (m) => m.ParentsAppModule
      ),
  },
  {
    path: 'attendance',
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
