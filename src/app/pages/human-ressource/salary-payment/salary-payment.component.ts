import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-salary-payment',
  templateUrl: './salary-payment.component.html',
  styleUrls: ['./salary-payment.component.scss']
})
export class SalaryPaymentComponent {

  employees: any[] = [];
  filteredEmployees: any[] = [];
  salaries: any[] = [];
  empSal: any[] = [];
  designations: any[] = [];
  designFilter: string = 'select';

  constructor(private api: ApiService)
  {}

  ngOnInit(): void {
    this.getAllEmployees()
    this.getDesignations()

  }

  getDesignations()
  {

    this.api.getDesignations().subscribe(resp => {
      this.designations = resp.designations
      console.log(this.designations);

    });
  }

  getAllEmployees()
  {
    this.api.getAllEmployees().subscribe(resp => {
      this.employees = resp.employees;
      this.filteredEmployees = resp.employees;
      this.getAllSalaries();
    });
  }

  getFilteredEmployees()
  {
    this.filteredEmployees = this.employees.filter(emp => emp.designation?._id === this.designFilter);
    console.log(this.filteredEmployees);
    
  }

  getAllSalaries()
  {
    this.api.getSalaryTemplates().subscribe(resp => {
      this.salaries = resp.salaries;
      this.patchEmpSal();
    })
  }

  patchEmpSal()
  {
    this.filteredEmployees.forEach(emp => {
      if(emp.salaryGrade) {
       emp.salaryDetails = this.salaries.find(sal => sal._id == emp.salaryGrade);
      }
    });
  }
}
