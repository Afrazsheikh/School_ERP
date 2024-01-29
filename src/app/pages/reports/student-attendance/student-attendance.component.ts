import { Component, ViewEncapsulation } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { StudentService } from '../../student-details/student.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import {
  MatDatepicker,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
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
  selector: 'app-student-attendance',
  templateUrl: './student-attendance.component.html',
  styleUrls: ['./student-attendance.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
  encapsulation: ViewEncapsulation.None,
})
export class StudentAttendanceComponent {
  reportForm: any;
  date = new FormControl(moment());
  sections: any[] = [];
  classes: any[] = [];
  studentData: any[] = [];
  selectedRow:any;
  tableHeader:any;
  isLoading = true;
  isCsvShow: boolean =false;
  constructor(
    private api: ApiService,
    private toastr: ToastrService,
    private router: Router,
    private studentService: StudentService,
    private spinner: NgxSpinnerService,
    private datepipe: DatePipe
  ) {
    this.addForm();
  }
  ngOnInit() {    
    this.getAllClass();
    this.tableHeader = {
      data: [
        {  field: "autoNo", dataType:"autoNo", title: 'S. No', sort: false, visible: true, search:false },
        {  field: "name", dataType: "string", title: 'Student Name', sort: true, visible: true, search:true },
        {  field: "totalPresentCount", dataType: "string", title: 'Full Day', sort: true, visible: true, search:true },
        {  field: "totalHalfDayCount", dataType: "string", title: 'Half Day', sort: true, visible: true, search:true },
        {  field: "totalAbsentCount", dataType: "string", title: 'Absent', sort: true, visible: true, search:true }
       ],
      searchPlaceholder:"Search by Student Name",
      sortBy: { field: 'name', asc: true },
      toolbar: {
        show: true,
        visibleOn: 'visibility',
        config: {
        },
      },
    }
  }
 
  getAllClass() {
    this.api.getAllClass().subscribe((resp) => {
      this.classes = resp.classes;
    });
  }
  onChangeClass(event) {
    this.sections = [];
    const id = event.target.value;
    this.classes.forEach((element) => {
      if (element._id === id) {
        this.sections = element.sections;
        this.reportForm.patchValue({ section: element?.sections[0]?._id });
      }
    });
    console.log(event.target.value['section']);
  }
  addForm() {
    this.reportForm = new FormGroup({
      studentClass: new FormControl(null, [Validators.required]),
      section: new FormControl(null),
    });
  }
  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(
    normalizedMonthAndYear: Moment,
    datepicker: MatDatepicker<Moment>
  ) {
    const ctrlValue = this.date.value!;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }
  callReport(formData) {
    this.isCsvShow = true
    const payload = {
      classId: formData.value.studentClass,
      sectionId: formData.value.section,
      date: moment(this.date.value).format('MM/YYYY'),
    };
    this.studentData = [];
    this.api.getStudentAttendanceReport(payload).subscribe(
      (resp) => {
        this.studentData = resp[0]['data'];
        console.log(this.studentData);
        
      },
      (err) => {
        this.spinner.hide();
        console.error(err);
      }
    );
  }
  rowEvent($event: any) {
    this.selectedRow = $event.lead;
  }

  downloadCSV() {
    const csvContent = this.generateCSVContent();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'student_data.csv');
  }

  private generateCSVContent(): string {
    const header = 'Name,Fullday,HalfDay,Absent\n';

    const rows = this.studentData
      .map((student) => `${student.name}, ${student.totalPresentCount},  ${student.totalHalfDayCount}, ${student.totalAbsentCount}`)
      .join('\n');

    return header + rows;
  }
}
