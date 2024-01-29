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
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-student-strength-report',
  templateUrl: './student-strength-report.component.html',
  styleUrls: ['./student-strength-report.component.scss'],
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
export class StudentStrengthReportComponent {
  reportForm: any;
  aceYear: any[] = [];
  selectedType = 'class';
  castList: any[] = [];
  castDataArr: any[] = [];
  monthDataArr: any[] = [];
  genderDataArr: any[] = [];
  classDataArr: any[] = [];
  reportOption = [
    { id: 'class', name: 'Class Wise' },
    { id: 'gender', name: 'Gender Wise' },
    { id: 'cast', name: 'Cast Wise' },
    { id: 'month', name: 'Month Wise' },
  ];
  date = new FormControl(moment());
  constructor(
    private api: ApiService,
    private toastr: ToastrService,
    private router: Router,
    private studentService: StudentService,
    private spinner: NgxSpinnerService,
    private datepipe: DatePipe
  ) {
    this.aceYear = this.studentService.aceYear;
    this.castList = this.studentService.castList;
    this.addForm();
  }
  addForm() {
    this.reportForm = new FormGroup({
      reportType: new FormControl('class', [Validators.required]),
      cast: new FormControl(null),
      academicYear: new FormControl('', [Validators.required]),
      startDate: new FormControl(null),
      endDate: new FormControl(null),
    });
  }
  onChangeClass(event) {
    const name = event.target.value;
    this.reportForm.get('cast').clearValidators();
    this.reportForm.get('cast').updateValueAndValidity();

    if (name === 'month') {
      this.reportForm.get('academicYear').clearValidators();
      this.reportForm.get('academicYear').updateValueAndValidity();
    } else {
      this.reportForm.get('academicYear').setValidators([Validators.required]); // 5.Set Required Validator
      this.reportForm.get('academicYear').updateValueAndValidity();
    }
    if (name === 'cast') {
      this.reportForm.get('cast').setValidators([Validators.required]); // 5.Set Required Validator
      this.reportForm.get('cast').updateValueAndValidity();
    }
  }
  setMonthAndYear(
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
    this.selectedType = formData.value.reportType;
    const payload = {
      academicYear: formData.value.academicYear,
      caste: formData.value.cast,
      fromDate: moment(formData.value.startDate).format('YYYY-MM-DD'),
      toDate: moment(formData.value.endDate).format('YYYY-MM-DD'),
    };
    this.spinner.show();
    var type: string = '';
    switch (this.selectedType) {
      case 'month': {
        type = 'DATE';
        break;
      }
      case 'gender': {
        type = 'GENDER';
        break;
      }
      case 'cast': {
        type = 'CASTE';
        break;
      }
      case 'class': {
        type = 'GENDER';
        break;
      }
      default: {
        type = 'CLASS';
        break;
      }
    }
    this.monthDataArr = [];
    this.genderDataArr = [];
    this.classDataArr = [];
    this.api.getStudentStrengthReport(payload, type).subscribe(
      (resp) => {

        this.spinner.hide();
        switch (this.selectedType) {
          case 'month': {
            this.monthDataArr = resp['dateResponse'];
            break;
          }
          case 'gender': {
            this.genderDataArr = resp['genderResponse'];
            break;
          }
          case 'class': {
            this.monthDataArr = resp['genderResponse'];
            break;
          }
          case 'cast': {
            this.castDataArr = resp['casteResponse'];
            break;
          }
          default: {
            this.monthDataArr = resp['dateResponse'];
            break;
          }
        }
      },
      (err) => {
        this.spinner.hide();
        console.error(err);
      }
    );
  }
  stationNames: Set<string>;

  // csv
  downloadCSV() {
    switch (this.selectedType) {
      case 'cast':
        this.downloadCSVForCast();
        break;

      case 'class':
      case 'month':
        this.downloadCSVForClassOrMonth();
        break;

      case 'gender':
        this.downloadCSVForGender();
        break;
    }
  }

  downloadCSVForCast() {
    const csvData = this.convertToCSV(this.castDataArr);
    this.triggerDownload(csvData, 'cast');
  }

  downloadCSVForClassOrMonth() {
    const csvData = this.convertToCSV(this.monthDataArr);
    this.triggerDownload(csvData, 'class_or_month');
  }

  downloadCSVForGender() {
    const csvData = this.convertToCSV(this.genderDataArr);
    this.triggerDownload(csvData, 'gender');
  }

  triggerDownload(csvData: string, type: string) {
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, `report_${type}.csv`);
  }

  hasDataForDownload(): boolean {
    switch (this.selectedType) {
      case 'cast':
        return this.castDataArr && this.castDataArr.length > 0;

      case 'class':
      case 'month':
        return this.monthDataArr && this.monthDataArr.length > 0;

      case 'gender':
        return this.genderDataArr && this.genderDataArr.length > 0;

      default:
        return false;
    }
  }
  //  convertToCSV(data: any[]): string {
  //   console.log(data);

  //   const header = Object.keys(data[0]).join(',');

  //   const rows = data.map(item => Object.values(item).map(value => this.formatCSVValue(value)).join(','));
  // console.log(rows,"rows");

  //   return `${header}\n${rows.join('\n')}`;
  // }
  convertToCSV(data: any[]): string {
    const header = 'Academic Year,Boy,Girl,Class Name,Section Name,Total';
    // Mapping rows
    const rows = data.map((item) => {
      const className = item.studentClass ? item.studentClass.className : '';
      const sectionName = item.section ? item.section.name : '';
      const academicYear = item.academicYear || '';
      const boy = item.boy || '';
      const girl = item.girl || '';
      const total = item.total || '';
      const rowValues = [
        this.formatCSVValue(academicYear),
        this.formatCSVValue(boy),
        this.formatCSVValue(girl),
        this.formatCSVValue(className),
        this.formatCSVValue(sectionName),
        this.formatCSVValue(total),
      ];


      return rowValues.join(',');
    });


    // Adjust the header accordingly based on the properties
    return `${header},academicYear,boy,girl,className,sectionName,total\n${rows.join(
      '\n'
    )}`;
  }
  formatCSVValue(value: any): string {
    if (value == null) {
      return '';
    }

    if (typeof value === 'string' && value.includes(',')) {
      return `"${value}"`;
    }
    return value.toString();
  }
}
