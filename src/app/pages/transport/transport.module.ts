import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransportRoutingModule } from './transport-routing.module';
import { RouteMasterComponent } from './route-master/route-master.component';
import { VehicleMasterComponent } from './vehicle-master/vehicle-master.component';
import { StopPageComponent } from './stop-page/stop-page.component';
import { AssignVehicleComponent } from './assign-vehicle/assign-vehicle.component';
import { ReportComponent } from './report/report.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatTabsModule } from '@angular/material/tabs';
import { ReactiveFormsModule } from '@angular/forms';
import { RouteEditComponent } from './route-master/route-edit/route-edit.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { VehicleEditComponent } from './vehicle-master/vehicle-edit/vehicle-edit.component';
import { StopEditComponent } from './stop-page/stop-edit/stop-edit.component';
import { AssignEditComponent } from './assign-vehicle/assign-edit/assign-edit.component';
import { ExpenseReportComponent } from './expense-report/expense-report.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { NgxFileDropModule } from 'ngx-file-drop';


@NgModule({
  declarations: [
    RouteMasterComponent,
    VehicleMasterComponent,
    StopPageComponent,
    AssignVehicleComponent,
    ReportComponent,
    RouteEditComponent,
    VehicleEditComponent,
    StopEditComponent,
    AssignEditComponent,
    ExpenseReportComponent,
  ],
  imports: [
    CommonModule,
    TransportRoutingModule,
    MatTabsModule,
    ReactiveFormsModule,
    SharedModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxFileDropModule,
    NgxMaterialTimepickerModule
  ]
})
export class TransportModule { }
