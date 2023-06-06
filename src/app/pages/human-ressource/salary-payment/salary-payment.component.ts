import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { ApiService } from 'src/app/services/api.service';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { Moment } from 'moment';
import { Router } from '@angular/router';

const moment = _moment;
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-salary-payment',
  templateUrl: './salary-payment.component.html',
  styleUrls: ['./salary-payment.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class SalaryPaymentComponent {
  employees: any[] = [];
  filteredEmployees: any[] = [];
  salaries: any[] = [];
  empSal: any[] = [];
  designations: any[] = [];
  designFilter: string = 'select';
  date = new FormControl(moment());
  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.getAllEmployees();
    this.getDesignations();
  }

  getDesignations() {
    this.api.getDesignations().subscribe((resp) => {
      this.designations = resp.designations;
      console.log(this.designations);
    });
  }

  getAllEmployees() {
    // this.api.getAllEmployees().subscribe((resp) => {
    //   this.employees = resp.employees;
    //   this.filteredEmployees = resp.employees;
    //   this.getAllSalaries();
    // });
  }

  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(
    normalizedMonth: Moment,
    datepicker: MatDatepicker<Moment>
  ) {
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }

  getFilteredEmployees() {
    this.filteredEmployees = this.employees.filter(
      (emp) => emp.designationId === this.designFilter
    );
  }

  getAllSalaries() {
    this.api.getSalaryTemplates().subscribe((resp) => {
      this.salaries = resp.salaries;
      this.patchEmpSal();
    });
  }

  patchEmpSal() {
    this.filteredEmployees.forEach((emp) => {
      if (emp.salaryGrade) {
        emp.salaryDetails = this.salaries.find(
          (sal) => sal._id == emp.salaryGrade
        );
      }
    });
    console.log(this.filteredEmployees);
  }

  onFilter() {
    console.log(this.date.value);

    this.api
      .getEmployeeSalaryWithStatusBYMonth(this.date.value.format('MM-YYYY'))
      .subscribe((resp) => {
        this.filteredEmployees = resp.salary_receipts;
        this.employees = resp.salary_receipts;
        // this.filteredEmployees = resp.employees;
        // this.getAllSalaries();
      });
  }

  navigateToSalaryCreate(emp: any) {
    this.router.navigateByUrl(
      '/human-resource/salary-payroll-create/' +
        emp._id +
        '/' +
        this.date.value.format('MM-YYYY')
    );
  }
}
