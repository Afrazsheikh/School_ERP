import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-student-detail-all',
  templateUrl: './student-detail-all.component.html',
  styleUrls: ['./student-detail-all.component.scss']
})
export class StudentDetailAllComponent {

  student: any
  studentId:any;
  constructor(
    private api: ApiService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
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
    this.api.getStudentById(this.studentId).subscribe(resp => {
      console.log(resp);
      
      this.student = resp['student'];
    });
  }


}
