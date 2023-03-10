import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentAccountingRoutingModule } from './student-accounting-routing.module';
import { StrudentAccountingComponent } from './strudent-accounting.component';
import { FeeTypeComponent } from './fee-type/fee-type.component';
import {MatTabsModule} from '@angular/material/tabs';
import { SharedModule } from 'src/app/shared/shared.module';
import { FeesGroupComponent } from './fees-group/fees-group.component';
import { FineSetupComponent } from './fine-setup/fine-setup.component';
import { FeesAllocationComponent } from './fees-allocation/fees-allocation.component';
import { FeesPayInvoiceComponent } from './fees-pay-invoice/fees-pay-invoice.component';
import { InvoiceCollectPaidComponent } from './fees-pay-invoice/invoice-collect-paid/invoice-collect-paid.component';
import { DueFeesInvoiceComponent } from './due-fees-invoice/due-fees-invoice.component';
import { FeesRemainderComponent } from './fees-remainder/fees-remainder.component';


@NgModule({
  declarations: [
    StrudentAccountingComponent,
    FeeTypeComponent,
    FeesGroupComponent,
    FineSetupComponent,
    FeesAllocationComponent,
    FeesPayInvoiceComponent,
    InvoiceCollectPaidComponent,
    DueFeesInvoiceComponent,
    FeesRemainderComponent
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    StudentAccountingRoutingModule,
    SharedModule,
    
  ]
})
export class StudentAccountingModule { }
