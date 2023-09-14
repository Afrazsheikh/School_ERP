import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-stu-info-exam-result',
  templateUrl: './stu-info-exam-result.component.html',
  styleUrls: ['./stu-info-exam-result.component.scss']
})
export class StuInfoExamResultComponent {
  @Input() studentData: any ;
  studentExam:any;
  studentExamArr1:any;
  studentExamArr2:any;
  constructor(private api: ApiService, private toastr: ToastrService, private router: Router,) {
  }
 ngOnInit() {
  this.studentExam = this.studentData;
  this.getExamData();
 }
 getExamData(){
  const payload = {
    studentId: this.studentData?._id,
    academic:this.studentData?.academic?._id
  }
  this.api.getMarksByAcademicAndStudentId(payload).subscribe(resp => {
    if(resp.hasOwnProperty('marks')) {
      this.studentExamArr1 = resp['marks']['First Terms'];
      this.studentExamArr2 = resp['marks']['Second Terms'];
    }
  },
  (err) => {
   // this.toastr.error(err, " update failed");
    console.error(err);
  })

 }
}
