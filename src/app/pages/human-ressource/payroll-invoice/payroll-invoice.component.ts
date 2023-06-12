import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { StudentService } from '../../student-details/student.service';

@Component({
  selector: 'app-payroll-invoice',
  templateUrl: './payroll-invoice.component.html',
  styleUrls: ['./payroll-invoice.component.scss']
})
export class PayrollInvoiceComponent {
   employeeId!: string;
   monthAndYear!: Date;
   employeeDetail: any;
   isSalaryDetailAvailable = false;
   paymentFormGroup!: FormGroup;
   isAlreadyPaid = false;
   currentDate = new Date();
   studentAllInfo:any;
  constructor(_route: ActivatedRoute,
    private _apiService: ApiService,
     private toastr: ToastrService,
    ) {

      _route.params.subscribe({
      next: (routeParam) => {
        console.log(routeParam);

        if (routeParam.hasOwnProperty('id')) {
          this.employeeId = routeParam['id'];
          this.monthAndYear =  routeParam['monthAndYear'];
          this.fetchEmployeeDetail();
         // this.monthAndYear = new Date(routeParam['monthAndYear'].split('-')[0]);
        }
      },
    });
  }

  fetchEmployeeDetail() {
    this._apiService.getSalaryMonthAndEmpWise(this.employeeId, this.monthAndYear).subscribe({
      next: (res) => {
        this.employeeDetail = res.salary_receipts;
        if (this.employeeDetail.hasOwnProperty('salaryGrade')) {
          this.isSalaryDetailAvailable = true;
        }
      },
      error: (err) => {
        this.toastr.error(JSON.stringify(err));
      },
      complete: () => {},
    });
  }
}
