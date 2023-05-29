import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpAddComponent } from './emp-add/emp-add.component';
import { EmpDeptComponent } from './emp-dept/emp-dept.component';
import { EmpDesgComponent } from './emp-desg/emp-desg.component';
import { EmpListComponent } from './emp-list/emp-list.component';
import { EmpDetailComponent } from './emp-detail/emp-detail.component';
const routes: Routes = [
  {
    path: 'list',
    component: EmpListComponent
  },
  {
    path: 'department',
    component: EmpDeptComponent
  },
  {
    path: 'designation',
    component: EmpDesgComponent
  },
  {
    path: 'add',
    component: EmpAddComponent
  },
  {
    path: 'add/:id',
    component: EmpAddComponent
  },
  {
    path: 'detail/:id',
    component: EmpDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
