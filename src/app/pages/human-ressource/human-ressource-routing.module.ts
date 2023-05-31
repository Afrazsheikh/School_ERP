import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdvancedSalaryComponent } from './advanced-salary/advanced-salary.component';
import { LeaveApplicationComponent } from './leave-application/leave-application.component';
import { LeaveCategoryComponent } from './leave-category/leave-category.component';
import { LeaveManageApplicationComponent } from './leave-manage-application/leave-manage-application.component';
import { ManageApplicationComponent } from './manage-application/manage-application.component';
import { SalaryAssignComponent } from './salary-assign/salary-assign.component';
import { SalaryPaymentComponent } from './salary-payment/salary-payment.component';
import { SalaryEditComponent } from './salary-templete/salary-edit/salary-edit.component';
import { SalaryTempleteComponent } from './salary-templete/salary-templete.component';
import { SalaryPayrollCreateComponent } from './salary-payment/salary-payroll-create/salary-payroll-create.component';

const routes: Routes = [
  {
    path: 'salary-templete',
    component: SalaryTempleteComponent,
  },
  {
    path: 'salary-templete/:id',
    component: SalaryEditComponent,
  },
  {
    path: 'salary-assign',
    component: SalaryAssignComponent,
  },
  {
    path: 'salary-payment',
    component: SalaryPaymentComponent,
  },
  {
    path: 'advance-salary',
    component: AdvancedSalaryComponent,
  },
  {
    path: 'manage-application',
    component: ManageApplicationComponent,
  },
  {
    path: 'leave-category',
    component: LeaveCategoryComponent,
  },
  {
    path: 'leave-app',
    component: LeaveApplicationComponent,
  },
  {
    path: 'leave-manage-app',
    component: LeaveManageApplicationComponent,
  },
  {
    path: 'salary-payroll-create/:id',
    component: SalaryPayrollCreateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HumanRessourceRoutingModule {}
