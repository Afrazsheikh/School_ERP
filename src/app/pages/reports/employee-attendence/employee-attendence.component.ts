import { Component, ViewEncapsulation } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { StudentService } from '../../student-details/student.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker, MatDatepickerModule} from '@angular/material/datepicker';
import * as _moment from 'moment';
import {default as _rollupMoment, Moment} from 'moment';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { concat } from 'rxjs';
const moment = _rollupMoment || _moment;
import { saveAs } from 'file-saver';
// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
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
  selector: 'app-employee-attendence',
  templateUrl: './employee-attendence.component.html',
  styleUrls: ['./employee-attendence.component.scss'],
  providers: [
    {
     provide: DateAdapter,
     useClass: MomentDateAdapter,
     deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
   },
   {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
 ],
 encapsulation: ViewEncapsulation.None
})
export class EmployeeAttendenceComponent {
  reportForm: any;
  date = new FormControl(moment());
  designationList:any[] = [];
  employeeList:any[] = [];
  selectedRow:any;
  tableHeader:any;
  enableCsv: boolean =false;
  constructor(private api: ApiService, private toastr: ToastrService, private router: Router,
    private studentService:StudentService, private spinner: NgxSpinnerService, private datepipe: DatePipe
) {
   this.addForm();


  }
  ngOnInit() {
    this.getDesignations();
    this.tableHeader = {
      data: [
        {  field: "autoNo", dataType:"autoNo", title: 'S. No', sort: false, visible: true, search:false },
        {  field: "name", dataType: "string", title: 'Employee Name', sort: true, visible: true, search:true },
        {  field: "totalPresentCount", dataType: "string", title: 'Full Day', sort: true, visible: true, search:true },
        {  field: "totalHalfDayCount", dataType: "string", title: 'Half Day', sort: true, visible: true, search:true },
        {  field: "totalAbsentCount", dataType: "string", title: 'Absent', sort: true, visible: true, search:true }
       ],
      searchPlaceholder:"Search by Employee Name",
      sortBy: { field: 'name', asc: true },
      toolbar: {
        show: true,
        visibleOn: 'visibility',
        config: {
        },
      },
    }
  }
  getDesignations() {
    this.api.getDesignations().subscribe(resp => {
      this.designationList = resp.designations;
    });
  }
  addForm() {
    this.reportForm = new FormGroup({
        designation:new FormControl(null, [Validators.required])
    })
  }
  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value!;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }
  callReport(formData){
    this.enableCsv= true
    const payload = {
      designation: formData.value.designation,
      date:moment(this.date.value).format("MM/YYYY")
    }
    this.employeeList = [];
    this.api.getEmployeeAttendanceReport(payload).subscribe(resp => {
      this.employeeList = resp[0]['data'];
      console.log(this.employeeList);
      
    },
      (err) => {
        this.spinner.hide();
         console.error(err);
      })  
 
  }
  
  rowEvent($event: any) {
    this.selectedRow = $event.lead;
  }
  downloadEmployeeCSV() {
    const csvContent = this.generateEmployeeCSVContent();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'employee_data.csv');
  }
  
  private generateEmployeeCSVContent(): string {
    const header = 'Name,FullDays,HalfDays,Absent\n';
  
    const rows = this.employeeList
      .map(employee => `${employee.name},${employee.totalPresentCount},${employee.totalHalfDayCount}, ${employee.totalAbsentCount}`)
      .join('\n');
  
    return header + rows;
  }
}