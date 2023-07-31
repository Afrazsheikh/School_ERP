import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParentsAppRoutingModule } from './parents-app-routing.module';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GuardianAppComponent } from './guardian-app/guardian-app.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { TeacherAppComponent } from './teacher-app/teacher-app.component';
import { BannerAddComponent } from './banner-add/banner-add.component';
import { BannerListComponent } from './banner-list/banner-list.component';
import { NotificationAddComponent } from './notification-add/notification-add.component';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { NoticBoardListComponent } from './notic-board-list/notic-board-list.component';
import { NoticBoardAddComponent } from './notic-board-add/notic-board-add.component';

// import { ParentsAppRoutingModule } from './parents-app-routing.module';


@NgModule({
  declarations: [
    GuardianAppComponent,
    TeacherAppComponent,
    BannerAddComponent,
    BannerListComponent,
    NotificationAddComponent,
    NotificationListComponent,
    NoticBoardListComponent,
    NoticBoardAddComponent

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
