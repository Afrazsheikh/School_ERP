import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-salary-payroll-create',
  templateUrl: './salary-payroll-create.component.html',
  styleUrls: ['./salary-payroll-create.component.scss'],
})
export class SalaryPayrollCreateComponent implements OnInit {
  employeeId!: string;
  employeeDetail: any;
  constructor(
    _route: ActivatedRoute,
    private _apiService: ApiService,
    private toastr: ToastrService,
    private _location: Location
  ) {
    _route.params.subscribe({
      next: (routeParam) => {
        if (routeParam.hasOwnProperty('id')) {
          this.employeeId = routeParam['id'];
          this.fetchEmployeeDetail();
          this.fetchReceipt();
        }
      },
    });
  }

  ngOnInit() {}

  fetchEmployeeDetail() {
    this._apiService.getAllEmployeesById(this.employeeId).subscribe({
      next: (res) => {
        console.log(res);
        this.employeeDetail = res.employee;
      },
      error: (err) => {
        this.toastr.error(JSON.stringify(err));
      },
      complete: () => {},
    });
  }

  onSubmitPayment() {
    this._apiService
      .createSalaryReceipt({
        status: 'PAID',
        salaryPaidMonth: this.currentMonthAndYear,
        employee: this.employeeId,
      })
      .subscribe({
        next: (res) => {
          this.toastr.success('Salary record added successfully!');
        },
        error: (err) => {
          this.toastr.error(JSON.stringify(err));
        },
        complete: () => {},
      });
  }

  fetchReceipt() {
    this._apiService
      .getSalaryMonthAndEmpWise(this.employeeId, this.currentMonthAndYear)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          this.toastr.error(JSON.stringify(err));
        },
        complete: () => {},
      });
  }

  get currentMonthAndYear(): string {
    return (
      new Date().toISOString().split('T')[0].split('-')[1] +
      '-' +
      new Date().toISOString().split('T')[0].split('-')[0]
    );
  }

  backButtonClick() {
    this._location.back();
  }
}
