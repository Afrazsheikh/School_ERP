import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeesRoutingModule } from './fees-routing.module';
import { FeeCategoryComponent } from './fee-category/fee-category.component';
import { AssignFeeTypeComponent } from './assign-fee-type/assign-fee-type.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { SharedModule } from '../../shared/shared.module';
import { AddFeeCategoyComponent } from './add-fee-categoy/add-fee-categoy.component';
import { EditFeeCategoyComponent } from './edit-fee-categoy/edit-fee-categoy.component';
import { AssignFeeListComponent } from './assign-fee-list/assign-fee-list.component';
import { AssignFeeTypeOneComponent } from './assign-fee-type-one/assign-fee-type-one.component';
import { AssignFeeTypeTwoComponent } from './assign-fee-type-two/assign-fee-type-two.component';

@NgModule({
  declarations: [
    FeeCategoryComponent,
    AssignFeeTypeComponent,
    AddFeeCategoyComponent,
    EditFeeCategoyComponent,
    AssignFeeListComponent,
    AssignFeeTypeOneComponent,
    AssignFeeTypeTwoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,    
    MatDatepickerModule,
    SharedModule,
    ScrollingModule,
    FeesRoutingModule
  ]
})
export class FeesModule { }
