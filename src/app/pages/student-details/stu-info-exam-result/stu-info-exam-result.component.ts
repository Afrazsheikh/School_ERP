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
  examArr :any;
  finalExamArr:any[] = [];
  finalExamNameArr:any[] = [];
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
      this.examArr= resp['marks'];
      this.examArr.forEach(element => {
        this.finalExamNameArr.push({subArr:[], name:element?.examId?.name, id:element.examId?._id}) ;
     });
     console.log(this.finalExamNameArr);
     const uniqueArray = this.finalExamNameArr.filter((thing, index) => {
      const _thing = JSON.stringify(thing);
      return index === this.finalExamNameArr.findIndex(obj => {
        return JSON.stringify(obj) === _thing;
      });
    });
    console.log(uniqueArray);
    this.finalExamNameArr = uniqueArray;
    this.finalExamNameArr.forEach(element => {
          this.examArr.forEach(el => {
            if(el?.examId?._id === element?.id){
              element.subArr.push(el);
            }
          });      
     });
    
        console.log(this.finalExamArr);
        console.log(this.finalExamNameArr)
    }

  },
  (err) => {
   // this.toastr.error(err, " update failed");
    console.error(err);
  })

 }
}
