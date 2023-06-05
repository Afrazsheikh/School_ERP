


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdmissionRoutingModule } from './admission-routing.module';
import { CategoryComponent } from './category/category.component';
import { MultipleImportComponent } from './multiple-import/multiple-import.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdmissionComponent } from './admission.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MAT_DATE_FORMATS, MatNativeDateModule } from '@angular/material/core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { NgxFileDropModule } from 'ngx-file-drop';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { CreateStudentComponent } from './create-student/create-student.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { SelectDropDownModule } from 'ngx-select-dropdown';

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
    AdmissionComponent,
    CategoryComponent,
    MultipleImportComponent,
    CreateStudentComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,    
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMaterialTimepickerModule,
    NgxFileDropModule,
    MatCheckboxModule,
    AdmissionRoutingModule,
    SharedModule,
    ScrollingModule,
    SelectDropDownModule
  ],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class AdmissionModule { }
