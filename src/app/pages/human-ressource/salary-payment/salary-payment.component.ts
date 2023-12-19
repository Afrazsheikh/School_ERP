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
import { NgxSpinnerService } from 'ngx-spinner';

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
  selectedRow:any;
  tableHeader:any;
  constructor(private api: ApiService, private router: Router,private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.getAllEmployees();
    this.getDesignations();
    this.tableHeader = {
      data: [
        {  field: "newId", dataType:"string", title: 'Staff Id', sort: false, visible: true, search:false },
        {  field: "name", dataType: "string", title: 'Name', sort: true, visible: true, search:true, width:"15%" },
        {  field: "designationName", dataType: "string", title: 'Designation', sort: true, visible: true, search:true, width:"15%"  },
        {  field: "departmentName", dataType: "string", title: 'Department', sort: true, visible: true, search:true, width:"15%"  },
        {  field: "number", dataType: "string", title: 'Mobile Noe', sort: true, visible: true, search:true },
        {  field: "salaryGradeTitle", dataType: "string", title: 'Salary Grade', sort: true, visible: true, search:true },
        {  field: "basicSalary", dataType: "string", title: 'Basic Salary', sort: true, visible: true, search:true },
        {  field: "action", dataType:"action", title: 'Action', sort: false, visible: true, search:false }
       ],

      searchPlaceholder:"Search by Name, Designation, Department and Salary Grade and Basic Salary",
      sortBy: { field: 'name', asc: true },
      toolbar: {
        show: true,
        visibleOn: 'visibility',
        config: {         
          paynow: {
            show: true,
            callback: () => {},
          }
      },
    }
  }
  }
  getDesignations() {
    this.api.getDesignations().subscribe(resp => {
      if (Array.isArray(resp.designations)) {
        resp.designations.sort((a, b) => a.name.localeCompare(b.name));
        this.designations = resp.designations;
      } else {
        console.error('Designations data is not an array:', resp.designations);
      }
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
    this.spinner.show();
     this.api
      .getEmployeeSalaryWithStatusBYMonth(this.date.value.format('MM-YYYY'))
      .subscribe((resp) => {
        this.spinner.hide();
        this.filteredEmployees = resp.salary_receipts;
        this.employees = resp.salary_receipts;
        this.filteredEmployees.forEach(Element =>{
          Element['newId'] = Element._id.substr(Element._id.length - 4);
          Element['designationName']= Element?.designation?.name;
          Element['departmentName']= Element?.department?.name;
          Element['basicSalary']= "₹" + ((Element?.salaryGrade?.basicSalary) ? Element.salaryGrade.basicSalary : 0);
          Element['salaryGradeTitle']= Element?.salaryGrade?.salaryGrade;       
          Element['salaryStatus']= Element.salaryStatus === "PAID" ? "Salary Paid" : "Pay Now";
        })
      },
      (err) =>{
        this.spinner.hide();
      });
  }

  navigateToSalaryCreate(emp: any) {
    if(emp.salaryStatus === "PAID")
    {
      this.router.navigateByUrl(
         '/human-resource/payroll-invoice/'
         +
          emp._id +
          '/' +
          this.date.value.format('MM-YYYY')
      );
    }
    else
    {
      this.router.navigateByUrl(
        '/human-resource/salary-payroll-create/' +
          emp._id +
          '/' +
          this.date.value.format('MM-YYYY')
      );
    }
    
  }
  rowEvent($event: any) {
    this.selectedRow = $event.lead;
    if($event['event'] === 'paynow'){
      this.navigateToSalaryCreate(this.selectedRow);
    }

  }
}
