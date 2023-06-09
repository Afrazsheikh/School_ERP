import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttendanceEmployeeComponent } from './attendance-employee/attendance-employee.component';
import { AttendanceStudentComponent } from './attendance-student/attendance-student.component';
import { AttendanceExamComponent } from './attendance-exam/attendance-exam.component';

const routes: Routes = [ {
  path: "employee",
  component: AttendanceEmployeeComponent
},
{
  path: "student",
  component: AttendanceStudentComponent
},
{
  path: "exam",
  component: AttendanceExamComponent
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttendanceRoutingModule { }
