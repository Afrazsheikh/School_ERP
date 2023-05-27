import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParentsAppRoutingModule } from './parents-app-routing.module';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GuardianAppComponent } from './guardian-app/guardian-app.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { TeacherAppComponent } from './teacher-app/teacher-app.component';

// import { ParentsAppRoutingModule } from './parents-app-routing.module';


@NgModule({
  declarations: [
    GuardianAppComponent,
    TeacherAppComponent

  ],
  imports: [
    CommonModule,
    ParentsAppRoutingModule,
    MatTabsModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgxFileDropModule
  ]
})
export class ParentsAppModule { }
