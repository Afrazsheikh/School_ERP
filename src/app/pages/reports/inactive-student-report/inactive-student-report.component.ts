import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { StudentService } from '../../student-details/student.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-inactive-student-report',
  templateUrl: './inactive-student-report.component.html',
  styleUrls: ['./inactive-student-report.component.scss']
})
export class InactiveStudentReportComponent {
  sections: any[] = [];
  classes: any[] = [];
  subjects: any[] = [];
  reportForm: FormGroup;
  studentData: any;
  studentId:any;
  studentSelRow:any;
  aceYear :any[] =[];
  constructor(private api: ApiService, private toastr: ToastrService, private router: Router,
    private studentService:StudentService, private spinner: NgxSpinnerService
) {
   this.aceYear = this.studentService.aceYear;
   this.addForm();
  }
  ngOnInit(): void {  
    this.getAllClass(); 
    
  }
  addForm() {
    this.reportForm = new FormGroup({
      studentClass: new FormControl(null, [Validators.required]),
      section: new FormControl(null),
      academicYear: new FormControl(null, [Validators.required]),
      status:new FormControl(null)
    })
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
  getAllClass() {
    this.api.getAllClass().subscribe(resp => {
      this.classes = resp.classes;
    });
  }
  callReport(reportForm){
    const data = {
      academicYear: reportForm.value.academicYear,
      section: reportForm.value.section,
      studentClass: reportForm.value.studentClass,
    }
    var type: boolean =false;
    if(reportForm.value.status === 'Active') {
      type = true;
    }
    this.spinner.show();
    this.studentData = [];
    this.api.getActiveInactiveStudent(data, type).subscribe(data => {
      this.spinner.hide();
      this.studentData = data['students'];
    },
    (err) =>{
      this.spinner.hide();
      this.studentData =[];
      this.toastr.error(err);
    })
  }
}
