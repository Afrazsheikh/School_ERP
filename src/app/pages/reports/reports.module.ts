import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { StudentStrengthReportComponent } from './student-strength-report/student-strength-report.component';
import { SharedModule } from '../../shared/shared.module';
import { AdmissionDetailsReportsComponent } from './admission-details-reports/admission-details-reports.component';
import { InactiveStudentReportComponent } from './inactive-student-report/inactive-student-report.component';
import { FeesConsessionReportComponent } from './fees-consession-report/fees-consession-report.component';
import { ClassTeacherListComponent } from './class-teacher-list/class-teacher-list.component';
import { SubjectTeacherListComponent } from './subject-teacher-list/subject-teacher-list.component';
import { StudentAttendanceComponent } from './student-attendance/student-attendance.component';
import { EmployeeAttendenceComponent } from './employee-attendence/employee-attendence.component';
import { PrincipalListComponent } from './principal-list/principal-list.component';
import { PrincipalListAddComponent } from './principal-list-add/principal-list-add.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
const MY_FORMATS = {
  parse: {
    dateInput: 'DD-MM-YYYY',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [
    StudentStrengthReportComponent,
    AdmissionDetailsReportsComponent,
    InactiveStudentReportComponent,
    FeesConsessionReportComponent,
    ClassTeacherListComponent,
    SubjectTeacherListComponent,
    StudentAttendanceComponent,
    EmployeeAttendenceComponent,
    PrincipalListComponent,
    PrincipalListAddComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ReportsRoutingModule,    
    MatDatepickerModule, 
    MatMomentDateModule,
    NgxMaterialTimepickerModule,
    MatInputModule,
    MatFormFieldModule,
    SharedModule
  ],
  providers: [DatePipe,
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class ReportsModule { }
