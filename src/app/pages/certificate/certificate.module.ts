import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CertificateRoutingModule } from './certificate-routing.module';
import { CertTempComponent } from './cert-temp/cert-temp.component';
import { CertStudComponent } from './cert-stud/cert-stud.component';
import { CertEmpComponent } from './cert-emp/cert-emp.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatTabsModule } from '@angular/material/tabs';
import { QuillModule } from 'ngx-quill';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxFileDropModule } from 'ngx-file-drop';
import { CertEditComponent } from './cert-edit/cert-edit.component';
import { NgxPrintModule } from 'ngx-print';

@NgModule({
  declarations: [
    CertTempComponent,
    CertStudComponent,
    CertEmpComponent,
    CertEditComponent
  ],
  imports: [
    CommonModule,
    CertificateRoutingModule,
    MatTabsModule,
    ReactiveFormsModule,
    QuillModule.forRoot(),
    SharedModule,
    NgxFileDropModule,
    FormsModule, NgxPrintModule
  ]
})
export class CertificateModule { }
