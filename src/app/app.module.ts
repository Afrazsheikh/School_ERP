import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import { SharedModule } from "./shared/shared.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HumanRessourceComponent } from './pages/human-ressource/human-ressource.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { ToastrModule } from 'ngx-toastr';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
@NgModule({
    declarations: [
      AppComponent,
      HumanRessourceComponent,
      ReportsComponent,
      DashboardComponent,
    ],
    providers: [BsModalService],
    bootstrap: [AppComponent],
    imports: [
      BrowserModule,
      BrowserAnimationsModule,
      AppRoutingModule,
      HttpClientModule,
      AppRoutingModule,
      MatToolbarModule,
      MatSidenavModule,
      MatButtonModule,
      MatIconModule,
      SharedModule,
      MatDatepickerModule,
      MatNativeDateModule,
      SelectDropDownModule,
      ToastrModule.forRoot({positionClass: 'toast-center-center'}),
      ModalModule.forRoot()
    ]
})
export class AppModule { }
