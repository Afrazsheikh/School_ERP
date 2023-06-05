import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
  isSalaryDetailAvailable = false;
  paymentFormGroup!: FormGroup;
  paymentModes = [
    'UPI',
    'NEFT',
    'RTGS',
    'IMPS',
    'CREDIT-CARD',
    'DEBIT-CARD',
    'CASH',
  ];
  salaryReceiptDetail: any;
  isAlreadyPaid = false;

  constructor(
    _route: ActivatedRoute,
    private _apiService: ApiService,
    private toastr: ToastrService,
    private _location: Location,
    private _formBuilder: FormBuilder
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

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.paymentFormGroup = this._formBuilder.group({
      status: 'PAID',
      totalAllowance: new FormControl(),
      totalDeductions: new FormControl(),
      overtimeHrs: new FormControl(null),
      overtimeAmount: new FormControl(0, [Validators.required]),
      payVia: new FormControl(null, Validators.required),
      account: new FormControl(null),
      netSalary: new FormControl(),
    });
  }

  fetchEmployeeDetail() {
    this._apiService.getAllEmployeesById(this.employeeId).subscribe({
      next: (res) => {
        this.employeeDetail = res.employee;
        if (this.employeeDetail.hasOwnProperty('salaryGrade')) {
          this.isSalaryDetailAvailable = true;
          this.paymentFormGroup.patchValue({
            totalAllowance: this.employeeDetail.salaryGrade.totalAllowance,
            totalDeductions: this.employeeDetail.salaryGrade.totalDeductions,
            netSalary: this.employeeDetail.salaryGrade.netSalary,
            account:
              this.employeeDetail.bankName +
              '-' +
              this.employeeDetail.accountNumber,
          });
        }
      },
      error: (err) => {
        this.toastr.error(JSON.stringify(err));
      },
      complete: () => {},
    });
  }

  onSubmitPayment() {
    if (this.isAlreadyPaid) {
      window.print();

      return;
    }
    this.paymentFormGroup.value.salaryPaidMonth = this.currentMonthAndYear;
    this.paymentFormGroup.value.employee = this.employeeId;
    this._apiService
      .createSalaryReceipt(this.paymentFormGroup.value)
      .subscribe({
        next: (res) => {
          this.toastr.success('Salary record added successfully!');
          this.fetchReceipt();
          this._location.back();
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
          if (res) {
            this.salaryReceiptDetail = res.salary_receipts;
            this.isAlreadyPaid =
              this.salaryReceiptDetail.salaryStatus === 'PAID' ? true : false;
            if (this.isAlreadyPaid) {
              this.paymentFormGroup.patchValue(res.salary_receipts);
            }
          }
        },
        error: (err) => {
          this.toastr.error(JSON.stringify(err));
        },
        complete: () => {},
      });
  }

  onEnterOvertimeHr(e: any) {
    console.log(e.target.value);
    this.paymentFormGroup.patchValue({
      overtimeAmount:
        +e.target.value * +this.employeeDetail.salaryGrade.overTimeRatePerHr,
    });
    this.paymentFormGroup.patchValue({
      netSalary:
        +this.employeeDetail.salaryGrade.netSalary +
        this.paymentFormGroup.value.overtimeAmount,
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
