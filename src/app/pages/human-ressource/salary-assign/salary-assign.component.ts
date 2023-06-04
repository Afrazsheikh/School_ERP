import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-salary-assign',
  templateUrl: './salary-assign.component.html',
  styleUrls: ['./salary-assign.component.scss']
})
export class SalaryAssignComponent implements OnInit {

  employees: any[] = [];
  filteredEmployees: any[] = [];
  salaries: any[] = [];
  empSal: any[] = [];
  designations: any[] = [];
  isLoading: boolean;
  designFilter: string = 'select';

  constructor(private api: ApiService, private toastr: ToastrService)
  {}

  ngOnInit(): void {
    this.getAllEmployees();
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
      console.log(this.employees);

      this.employees = resp.employees;
      this.filteredEmployees = resp.employees;
      this.getAllSalaries();
    });
  }

  getFilteredEmployees()
  {
    this.filteredEmployees = this.employees.filter(emp => emp.designation?._id === this.designFilter);
  }

  getAllSalaries()
  {
    this.api.getSalaryTemplates().subscribe(resp => {
      this.salaries = resp.salaries;
      console.log(this.salaries);
      
      this.patchEmpSal();
    })
  }

  patchEmpSal()
  {
    this.filteredEmployees.forEach(emp => {
      if(emp.salaryGrade) {
        if(!this.empSal.some(e => e._id == emp._id)) {
          this.empSal.push({
            employeeId: emp._id,
            salaryId: emp.salaryGrade
          });
        }
      }
    });
  }

  updateEmpSal(empId: string, event: any)
  {
    console.log(event.target.value);
    const index = this.empSal.findIndex(e => e.employeeId == empId);
    if(index != -1)
    {
      if(event.target.value == 'select') {
        this.empSal.splice(index, 1);
      }
      else {
        this.empSal[index].salaryId = event.target.value;
      }
    }
    else if(event.target.value != 'select') {
      this.empSal.push({
        employeeId: empId,
        salaryId: event.target.value
      });
    }

    console.log("Emp Sal-->", this.empSal);
  }

  saveSalary()
  {
    this.isLoading = true;
    this.api.updateEmpSal(this.empSal).subscribe(resp => {
      this.isLoading = false;
      this.toastr.success(resp.message, "Salary assign update success");
    },
    (err) => {
      this.isLoading = false;
      this.toastr.error(err, "Salary assign update failed");
      console.error(err);
    })
  }
}
