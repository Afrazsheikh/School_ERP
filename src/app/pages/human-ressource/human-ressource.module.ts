import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HumanRessourceRoutingModule } from './human-ressource-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import {MatTabsModule} from '@angular/material/tabs';
import { SalaryTempleteComponent } from './salary-templete/salary-templete.component';
import { SalaryAssignComponent } from './salary-assign/salary-assign.component';
import { SalaryPaymentComponent } from './salary-payment/salary-payment.component';
import { AdvancedSalaryComponent } from './advanced-salary/advanced-salary.component';
import { ManageApplicationComponent } from './manage-application/manage-application.component';
import { LeaveCategoryComponent } from './leave-category/leave-category.component';
import { LeaveApplicationComponent } from './leave-application/leave-application.component';
import { LeaveManageApplicationComponent } from './leave-manage-application/leave-manage-application.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SalaryEditComponent } from './salary-templete/salary-edit/salary-edit.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxFileDropModule } from 'ngx-file-drop';
import { SalaryPayrollCreateComponent } from './salary-payment/salary-payroll-create/salary-payroll-create.component';


@NgModule({
  declarations: [
    SalaryTempleteComponent,
    SalaryAssignComponent,
    SalaryPaymentComponent,
    AdvancedSalaryComponent,
    ManageApplicationComponent,
    LeaveCategoryComponent,
    LeaveApplicationComponent,
    LeaveManageApplicationComponent,
    SalaryEditComponent,
    SalaryPayrollCreateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HumanRessourceRoutingModule,
    SharedModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxFileDropModule
  ]
})
export class HumanRessourceModule { }
