import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-emp-list',
  templateUrl: './emp-list.component.html',
  styleUrls: ['./emp-list.component.scss']
})
export class EmpListComponent {

  employees: any[] = [];
  filteredEmp: any[] = []
  emplyee: any;
  isLoading: boolean;
  selectedDesign: any;

  constructor(private api: ApiService,
    private toastr: ToastrService,

    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
    this.api.getAllEmployees().subscribe(resp => {
      this.employees = resp.employees;
      console.log(this.employees);

      this.filteredEmp = this.employees.filter(emp => emp.designation?.name == 'Admin');
    });
  }

  filterEmployee(event: any) {
    console.log(this.filteredEmp);
const tabIndex = event.index;
    if (tabIndex == 0) {
      this.filteredEmp = this.employees.filter(emp => emp.designation?.name == 'Admin')
      console.log();
      
    }
    if (tabIndex == 0) {
      this.filteredEmp = this.employees.filter(emp => emp.designation?.name == 'ADMIN')
    }
    else if (tabIndex == 1) {
      this.filteredEmp = this.employees.filter(emp => emp.designation?.name == 'Senior Teacher')
    }
    else if (tabIndex == 1) {
      this.filteredEmp = this.employees.filter(emp => emp.designation?.name == "TEACHER")
    }
    else if (tabIndex == 2) {
      this.filteredEmp = this.employees.filter(emp => emp.designation?.name == 'Accountant')
    }
    else if (tabIndex == 3) {
      this.filteredEmp = this.employees.filter(emp => emp.designation?.name == 'Librarian')
    }
    else if (tabIndex == 4) {
      this.filteredEmp = this.employees.filter(emp => emp.designation?.name == 'Receptionist')
    }
    else if (tabIndex == 5) {
      this.filteredEmp = this.employees.filter(emp => emp.designation?.name != 'Teacher')
    }
    else if (tabIndex == 5) {
      this.filteredEmp = this.employees.filter(emp => emp.designation?.name != 'TEACHER')
    }
    else if (tabIndex == 5) {
      this.filteredEmp = this.employees.filter(emp => emp.designation?.name != 'Admin')


    } else if (tabIndex == 5) {
      this.filteredEmp = this.employees.filter(emp => emp.designation?.name != 'Accountant')


    } else if (tabIndex == 5) {
      this.filteredEmp = this.employees.filter(emp => emp.designation?.name != 'Librarian')


    } else if (tabIndex == 5) {
      this.filteredEmp = this.employees.filter(emp => emp.designation?.name != 'Receptionist')


    }

  }

  editTeacherEm(route: any) {
    console.log("tevdafgc");

    console.log(route);

    this.emplyee = route;
    const navExtras: NavigationExtras = {
      state: {
        data: this.emplyee
      }
    };

    this.router.navigate(["/employee/add", this.emplyee._id], navExtras);
  }

  deleteEmpl() {
    console.log(this.emplyee._id);
    this.isLoading = true;
    this.api.deleteEmployee(this.emplyee._id).subscribe(resp => {
      console.log(resp);
      this.isLoading = false;
      document.getElementById('modalDismissBtn')?.click();
      this.toastr.success(resp.message, "Employee  Deleted successFully");
  // this.getEmployees()
    },
      (err) => {
        this.isLoading = false;
        console.error(err);
      })
  }
  detailClick(employee){
    this.router.navigate(["/employee/detail/"+ employee._id]);
  }


}
