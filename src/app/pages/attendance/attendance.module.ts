import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttendanceRoutingModule } from './attendance-routing.module';
import { AttendanceEmployeeComponent } from './attendance-employee/attendance-employee.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AttendanceStudentComponent } from './attendance-student/attendance-student.component';
import { AttendanceExamComponent } from './attendance-exam/attendance-exam.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { DatePipe } from '@angular/common';
import { OrderModule } from 'ngx-order-pipe';
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
    AttendanceEmployeeComponent,
    AttendanceStudentComponent,
    AttendanceExamComponent
  ],
  imports: [
    CommonModule,
    AttendanceRoutingModule,
    OrderModule,
    SharedModule,
    ReactiveFormsModule,
    MatDatepickerModule, 
    MatMomentDateModule,
    NgxMaterialTimepickerModule,
    MatInputModule,
    MatFormFieldModule   
  ],
  providers: [DatePipe,
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class AttendanceModule { }
