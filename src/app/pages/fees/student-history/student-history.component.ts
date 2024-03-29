import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StudentService } from '../../student-details/student.service';
import { ApiService} from '../../../services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-student-history',
  templateUrl: './student-history.component.html',
  styleUrls: ['./student-history.component.scss']
})
export class StudentHistoryComponent {

  sections: any[] = [];
  classes: any[] = [];
  aceYear :any[] =[];
  reportForm:any;
  studentData:any[] = [];
constructor(private api: ApiService, private toastr: ToastrService, private router: Router, private studentService:StudentService,private spinner: NgxSpinnerService){
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
    academicYear: new FormControl(null, [Validators.required])
  })
}
getAllClass() {
  this.api.getAllClass().subscribe(resp => {
    this.classes = resp.classes;
   });
}
callReport(reportForm){
  const data = {
    academicYear: reportForm.value.academicYear,
    section:  reportForm.value.studentClass?.sections[0]?._id,
    studentClass: reportForm.value.studentClass?._id,
  }
  this.spinner.show();
  this.api.studentList(data).subscribe(data => {
    this.spinner.hide();
    this.studentData = data['students'];
  },
  (err) =>{
    this.spinner.hide();
    this.studentData =[];
    this.toastr.error(err);
  })
}
viewFeeReport(student){
  this.router.navigate(["/fees/print-invoice/"+student._id+"/"+student?.academic?.academicYear]);
  }
}
