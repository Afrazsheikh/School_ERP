import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeeCategoryComponent } from './fee-category/fee-category.component';
import { AssignFeeTypeComponent } from './assign-fee-type/assign-fee-type.component';
import { AddFeeCategoyComponent } from './add-fee-categoy/add-fee-categoy.component';
import { EditFeeCategoyComponent } from './edit-fee-categoy/edit-fee-categoy.component';
import { AssignFeeListComponent } from './assign-fee-list/assign-fee-list.component';
import { AssignFeeTypeOneComponent } from './assign-fee-type-one/assign-fee-type-one.component';
import { AssignFeeTypeTwoComponent } from './assign-fee-type-two/assign-fee-type-two.component';
const routes: Routes = [
  {
    path: 'category', component: FeeCategoryComponent
  },
  {
    path: 'add-category', component: AddFeeCategoyComponent
  },
  {
    path: 'edit-category',component: EditFeeCategoyComponent
  },
  {
    path: 'fee-list',
    component: AssignFeeListComponent
  },
  {
    path: 'define-fee-type-1',
    component: AssignFeeTypeOneComponent
  },
  {
    path: 'define-fee-type-2',
    component: AssignFeeTypeTwoComponent
  },
  {
    path: 'define-fee-type',
    component: AssignFeeTypeComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeesRoutingModule { }
