import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-student-detail-all',
  templateUrl: './student-detail-all.component.html',
  styleUrls: ['./student-detail-all.component.scss']
})
export class StudentDetailAllComponent {

  student: any
  studentAll:any;
  studentId:any;
  isShow =false;
  constructor(
    private api: ApiService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService

  )
  {
    route.params.subscribe(param => {
     this.studentId = param['id'];
    });
  }

  ngOnInit(): void {
    this.getStudentData();
  }
  getStudentData(){
    this.spinner.show();
    this.api.getStudentById(this.studentId).subscribe(resp => {
      this.spinner.hide();
      this.isShow = true;
      this.student = resp['student']['studentResponse'];
      this.studentAll = resp['student'];
    },
    (err) =>{
      this.spinner.hide();
      this.student =[];
      this.toastr.error(err);
    });
  }


}
