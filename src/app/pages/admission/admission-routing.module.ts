import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmissionComponent } from './admission.component';
import { CategoryComponent } from './category/category.component';
import { MultipleImportComponent } from './multiple-import/multiple-import.component';
import { CreateStudentComponent } from './create-student/create-student.component';
import { TypeListComponent } from './type-list/type-list.component';

const routes: Routes = [
  {
    path: 'create',
    component:CreateStudentComponent 
  },
  {
    path: 'create-student',
    component: AdmissionComponent
  },
  {
    path: 'category',
    component: CategoryComponent,
  },
  {
    path: 'admission-type',
    component: TypeListComponent,
  },
  {
    path: 'multiple-import',
    component: MultipleImportComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmissionRoutingModule { }
