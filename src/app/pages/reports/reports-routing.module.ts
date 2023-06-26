import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmissionDetailsReportsComponent } from './admission-details-reports/admission-details-reports.component';
import { ClassTeacherListComponent } from './class-teacher-list/class-teacher-list.component';
import { FeesConsessionReportComponent } from './fees-consession-report/fees-consession-report.component';
import { InactiveStudentReportComponent } from './inactive-student-report/inactive-student-report.component';
import { StudentAttendanceComponent } from './student-attendance/student-attendance.component';
import { StudentStrengthReportComponent } from './student-strength-report/student-strength-report.component';
import { PrincipalListComponent } from './principal-list/principal-list.component';
import { PrincipalListAddComponent } from './principal-list-add/principal-list-add.component';
const routes: Routes = [
  {

    path: 'stud-strength',
    component:  StudentStrengthReportComponent
  }
 ,
 {

  path: 'adm-detail',
  component:  AdmissionDetailsReportsComponent
},
{

  path: 'inactive-stud',
  component:  InactiveStudentReportComponent
},
{

  path: 'fees-cons',
  component:  FeesConsessionReportComponent
},
{
  path: 'class-teacher-list',
  component:  ClassTeacherListComponent
},
{
  path: 'sub-teacher-list',
  component:  ClassTeacherListComponent
},
{
  path: 'prinicipal-report',
  component:  PrincipalListComponent
},
{
  path:'add-school-data',
  component:PrincipalListAddComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
