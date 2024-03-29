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
import { TransportFeeListComponent } from './transport-fee-list/transport-fee-list.component';
import { TransportFeeAddComponent } from './transport-fee-add/transport-fee-add.component';
import { PrintInvoiceComponent } from './print-invoice/print-invoice.component';
import { StudentHistoryComponent } from './student-history/student-history.component';
import { NgxPrintModule } from 'ngx-print';
@NgModule({
  declarations: [
    FeeCategoryComponent,
    AssignFeeTypeComponent,
    AddFeeCategoyComponent,
    EditFeeCategoyComponent,
    AssignFeeListComponent,
    TransportFeeListComponent,
    TransportFeeAddComponent,
    PrintInvoiceComponent,
    StudentHistoryComponent
  ],
  imports: [
    CommonModule,
    NgxPrintModule,
    ReactiveFormsModule,    
    MatDatepickerModule,
    SharedModule,
    ScrollingModule,
    FeesRoutingModule
  ]
})
export class FeesModule { }
