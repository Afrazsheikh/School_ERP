import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StudentService } from '../../student-details/student.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService} from '../../../services/api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import moment from 'moment';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-attendance-student',
  templateUrl: './attendance-student.component.html',
  styleUrls: ['./attendance-student.component.scss']
})
export class AttendanceStudentComponent {
  sections: any[] = [];
  classes: any[] = [];
  aceYear :any[] =[];
  reportForm: FormGroup;
  studentData: any;
  order:  string = 'type';
  reverse: boolean = false;
  caseInsensitive: boolean = false;
  constructor(private api: ApiService, private toastr: ToastrService, private router: Router,
    private studentService:StudentService, private spinner: NgxSpinnerService, private datepipe: DatePipe
) {
   this.aceYear = this.studentService.aceYear;
   this.addForm();
  }
  ngOnInit(): void {  
    this.getAllClass();
  }
  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }
  getAllClass() {
    this.api.getAllClass().subscribe(resp => {
      this.classes = resp.classes;
    });
  }
  onChangeClass(event){
    this.sections =[];
    const id = event.target.value;
    this.classes.forEach(element => {
        if(element._id === id) {
          this.sections = element.sections;
          this.reportForm.patchValue({section: element?.sections[0]?._id});
        }
    });
    console.log(event.target.value['section']);
  }
  addForm() {
    this.reportForm = new FormGroup({
      studentClass: new FormControl(null, [Validators.required]),
      section: new FormControl(null),
      academicYear: new FormControl(null, [Validators.required]),
      startDate:new FormControl(null, [Validators.required]),
    })
  }
  callReport(reportForm){
    const data = {
      academicYear: reportForm.value.academicYear,
      section: reportForm.value.section,
      studentClass: reportForm.value.studentClass,
      date: this.datepipe.transform(reportForm.value.startDate, 'MM/dd/yyyy') 
    }
    this.spinner.show();
    this.api.getStudentAttendanceData(data).subscribe(data => {
      this.spinner.hide();
      this.studentData = data['data'];
    },
    (err) =>{
      this.spinner.hide();
      this.studentData =[];
      this.toastr.error(err);
    })
  }
}
