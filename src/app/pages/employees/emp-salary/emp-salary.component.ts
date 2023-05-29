import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-emp-salary',
  templateUrl: './emp-salary.component.html',
  styleUrls: ['./emp-salary.component.scss']
})
export class EmpSalaryComponent {
  @Input() employeeData: any ;
}
