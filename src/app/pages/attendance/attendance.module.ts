import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttendanceRoutingModule } from './attendance-routing.module';
import { AttendanceEmployeeComponent } from './attendance-employee/attendance-employee.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AttendanceStudentComponent } from './attendance-student/attendance-student.component';
import { AttendanceExamComponent } from './attendance-exam/attendance-exam.component';


@NgModule({
  declarations: [
    AttendanceEmployeeComponent,
    AttendanceStudentComponent,
    AttendanceExamComponent
  ],
  imports: [
    CommonModule,
    AttendanceRoutingModule,
    SharedModule,
    ReactiveFormsModule,    
  ]
})
export class AttendanceModule { }
