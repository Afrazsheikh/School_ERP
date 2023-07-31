import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardianAppComponent } from './guardian-app/guardian-app.component';
import { TeacherAppComponent } from './teacher-app/teacher-app.component';
import { BannerAddComponent } from './banner-add/banner-add.component';
import { BannerListComponent } from './banner-list/banner-list.component';
import { NotificationAddComponent } from './notification-add/notification-add.component';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { NoticBoardListComponent } from './notic-board-list/notic-board-list.component';
import { NoticBoardAddComponent } from './notic-board-add/notic-board-add.component';
const routes: Routes = [
  {
    path: 'parent_app',
    component: GuardianAppComponent
  },
  {
    path: 'banner-list',
    component: BannerListComponent
  },
  {
    path: 'banner-add',
    component: BannerAddComponent
  },
  {
    path: 'notice-board-list',
    component: NoticBoardListComponent
  },
  {
    path: 'notice-board-add',
    component: NoticBoardAddComponent
  },
  {
    path: 'notification-add',
    component: NotificationAddComponent
  },
  {
    path: 'notification-list',
    component: NotificationListComponent
  },
  {
    path: 'teacher_app',
    component: TeacherAppComponent
  },
  {
    path: 'ticket-list',
    component: GuardianAppComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParentsAppRoutingModule { }
