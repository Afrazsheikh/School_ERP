import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../services/api.service';
import { default as _rollupMoment, Moment } from 'moment';
const moment = _rollupMoment ;
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
  selector: 'app-attendance-employee',
  templateUrl: './attendance-employee.component.html',
  styleUrls: ['./attendance-employee.component.scss'],
  encapsulation: ViewEncapsulation.None,

  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],

})
export class AttendanceEmployeeComponent implements OnInit {
  designations: any[] = [];
  today = new Date();
  addForm: FormGroup;
  rows: FormArray;
  employees: any[] = [];
  employeesList: any[] = [];
  departmentDrp: string = "";

  constructor(private api: ApiService,
    public fb: FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService) {
    this.today.setDate(this.today.getDate() - 1);
    this.createForm();
    this.rows = this.fb.array([]);
    this.addForm.addControl('rows', this.rows);
  }
  ngOnInit() {
    this.getDesignations();
  }
  createForm() {
    this.addForm = this.fb.group({
      designation: ['', Validators.required],
      employee:['', Validators.required],
      date: [moment(),Validators.required],
    });
  }
  onAddRow(data) {
    this.rows.push(this.createItemFormGroup(data));
  }
  createItemFormGroup(data): FormGroup {
    console.log(data);
    return this.fb.group({
      _id: [data?._id],
      status: [data?.status],
      date: [data?.date],
      remark: [data?.remark],
    });
  }
  removeGroup() {
    const controlData = this.addForm.get('rows') as FormArray;
    controlData.clear();
    this.addForm.updateValueAndValidity();
  }
  getDesignations() {
    this.api.getDesignations().subscribe(resp => {
      this.designations = resp.designations;
    });
  }
  getAllEmployees() {
    this.api.getDesignationById(this.departmentDrp).subscribe(resp => {
      this.employeesList = resp.employees;
    }, (err) => {
      this.toastr.error(err);
    })
  }
  designationChange(event) {
    if(event)
    {
      this.departmentDrp=event.target.value;
      this.getAllEmployees();
    }
    
  }
  getEmployees() {
    this.removeGroup();
    //this.spinner.show();
    var employeeobj: any;
    for (var i = 1; i <= 31; i++) {
      var date = i + "/" + this.today.getMonth() + "/" + this.today.getFullYear();

      employeeobj = {
        _id: [i],
        status: [''],
        remark: [''],
        date: [date],
      };
      this.onAddRow(employeeobj);

    }


    // this.api.getEmployeesByPageNo(this.pageNo - 1, this.departmentDrp).subscribe(resp => {
    //   this.spinner.hide();
    //   // this.employees = resp.employees;

    //   // this.employees.forEach(element => {
    //   //   var employeeobj: any;
    //   //     employeeobj = {
    //   //     _id: [element?._id],
    //   //     image: [element?.image],
    //   //     name: [element?.name],
    //   //     status: [element?.status],
    //   //     remark: [element?.remark],
    //   //   };
    //    //this.onAddRow(employeeobj);
    //   //   this.addForm.updateValueAndValidity();
    //   // });

    //   this.pagingConfig.totalItems = resp['totalCount'];
    // }, (err) => {
    //   this.spinner.hide();
    //   this.employees = [];
    //   this.toastr.error(err);
    // })
  }
  filterEmployee(addForm) {
    console.log(addForm);
    this.departmentDrp = addForm.value.designation;
    this.getEmployees();
  }
  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.addForm.value?.date.value;
    ctrlValue.year(normalizedYear.year());
    this.addForm.value?.date.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue =this.addForm.value?.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.addForm.value?.date.setValue(ctrlValue);
    datepicker.close();
  }
  
  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.addForm.value?.date;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.addForm.controls['date'].setValue(ctrlValue);
    datepicker.close();
  }
  statusChange(event) {
    this.rows.controls.forEach(element => {
      element.get('status').setValue(event.target.value);
    });
  }
  saveEmployeeAttendance() {
    console.log(this.addForm.value);
    ;
  }
}
