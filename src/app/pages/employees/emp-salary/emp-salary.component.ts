import { Component, Input } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-emp-salary',
  templateUrl: './emp-salary.component.html',
  styleUrls: ['./emp-salary.component.scss']
})
export class EmpSalaryComponent {
  @Input() employeeData: any ;
  empBasic:any;
  salaryData:any[] = [];
  constructor(private api: ApiService,private router: Router) {
  }
 ngOnInit() {
  this.empBasic = this.employeeData;
  this.getSalaryData();
 }
 getSalaryData() {
  this.api.getEmployeesIdWiseSalaryData(this?.empBasic?._id).subscribe(resp => {
   this.salaryData = resp?.salary_receipts;
  });
}
paySlipClick(employee){
  this.router.navigate(["/human-resource/salary-payroll-create/"+employee?.employee+"/"+employee?.salaryPaidMonth]);
}
}
