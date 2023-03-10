import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DueFeesInvoiceComponent } from './due-fees-invoice/due-fees-invoice.component';
import { FeeTypeComponent } from './fee-type/fee-type.component';
import { FeesAllocationComponent } from './fees-allocation/fees-allocation.component';
import { FeesGroupComponent } from './fees-group/fees-group.component';
import { FeesPayInvoiceComponent } from './fees-pay-invoice/fees-pay-invoice.component';
import { FeesRemainderComponent } from './fees-remainder/fees-remainder.component';
import { FineSetupComponent } from './fine-setup/fine-setup.component';

const routes: Routes = [

  {
    path: 'fees-type',
    component: FeeTypeComponent
  },
  {
    path: 'fees-group',
    component: FeesGroupComponent
  },
  {
    path: 'fine-setup',
    component: FineSetupComponent
  },
  {
    path: 'fees-allocation',
    component: FeesAllocationComponent
  },
  {
    path: 'fees-pay-invoice',
    component: FeesPayInvoiceComponent
  },

  {
    path: 'due-fees-invoice',
    component: DueFeesInvoiceComponent
  },
  {
    path: 'fees-remainder',
    component: FeesRemainderComponent
  },
  {
    path: 'invoice',
    loadChildren: () => import('./fees-pay-invoice/invoice.module').then( m => m.InvoiceModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentAccountingRoutingModule { }
