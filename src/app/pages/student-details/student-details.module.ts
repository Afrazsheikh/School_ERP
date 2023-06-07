import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentDetailsRoutingModule } from './student-details-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { StudentDetailsComponent } from './student-details.component';
import { StudentMainComponent } from './student-main/student-main.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentInfoComponent } from './student-info/student-info.component';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StuInfoBasicComponent } from './stu-info-basic/stu-info-basic.component';
import { StuInfoFeesComponent } from './stu-info-fees/stu-info-fees.component';
import { StuInfoExamResultComponent } from './stu-info-exam-result/stu-info-exam-result.component';
import { StuParentInfoComponent } from './stu-parent-info/stu-parent-info.component';
import { StuInfoDocumentComponent } from './stu-info-document/stu-info-document.component';
import { StudInfoBooksComponent } from './stud-info-books/stud-info-books.component';
import { StudInfoPictureComponent } from './stud-info-picture/stud-info-picture.component';
import { StudentDetailAllComponent } from './student-detail-all/student-detail-all.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { NgxFileDropModule } from 'ngx-file-drop';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { StudVehicleRouteComponent } from './stud-vehicle-route/stud-vehicle-route.component';
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
    StudentDetailsComponent,
    StudentMainComponent,
    StudentListComponent,
    StudentInfoComponent,
    StuInfoBasicComponent,
    StuInfoFeesComponent,
    StuInfoExamResultComponent,
    StuParentInfoComponent,
    StuInfoDocumentComponent,
    StudInfoBooksComponent,
    StudInfoPictureComponent,
    StudentDetailAllComponent,
    StudVehicleRouteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AccordionModule.forRoot(),
    ReactiveFormsModule,
    StudentDetailsRoutingModule,
    SharedModule,
    MatSelectModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatFormFieldModule,
    NgxMaterialTimepickerModule,
    NgxFileDropModule,
    MatCheckboxModule


    
  ],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class StudentDetailsModule { }
