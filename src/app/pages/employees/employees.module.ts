import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { EmpListComponent } from './emp-list/emp-list.component';
import { EmpDeptComponent } from './emp-dept/emp-dept.component';
import { EmpDesgComponent } from './emp-desg/emp-desg.component';
import { EmpAddComponent } from './emp-add/emp-add.component';
import {MatTabsModule} from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxFileDropModule } from 'ngx-file-drop';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import { EmpDetailComponent } from './emp-detail/emp-detail.component';
import { EmpBaiscComponent } from './emp-baisc/emp-baisc.component';
import { EmpSalaryComponent } from './emp-salary/emp-salary.component';
import { EmpPictureInfoComponent } from './emp-picture-info/emp-picture-info.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { EmpBankDetailComponent } from './emp-bank-detail/emp-bank-detail.component';
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
    EmpListComponent,
    EmpDeptComponent,
    EmpDesgComponent,
    EmpAddComponent,
    EmpDetailComponent,
    EmpBaiscComponent,
    EmpSalaryComponent,
    EmpPictureInfoComponent,
    EmpBankDetailComponent
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    AccordionModule.forRoot(),
    MatTabsModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxFileDropModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatSelectModule
  ],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class EmployeesModule { }
