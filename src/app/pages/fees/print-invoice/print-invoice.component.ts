import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../student-details/student.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-print-invoice',
  templateUrl: './print-invoice.component.html',
  styleUrls: ['./print-invoice.component.scss']
})
export class PrintInvoiceComponent {
  invoiceDate = Date();
  feePayload:any;
  schoolInfo:any;
  studentAllInfo:any;
  studentInfo:any;
  studentId:any;
  isShow =false;
  totalPaid =0;
  remainingAmount = 0;
  constructor(private api: ApiService, private toastr: ToastrService, private router: Router, private route: ActivatedRoute,
  private studentService:StudentService, private spinner: NgxSpinnerService){
   this.schoolInfo = this.studentService.schoolInfo;
   route.params.subscribe(param => {
    this.studentId = param['id'];
   });
  }
  ngOnInit(): void { 
    this.getDetail(); 
  
  }
  getDetail(){
    this.spinner.show();
    this.api.getStudentById(this.studentId).subscribe(resp => {
      this.spinner.hide();      
     this.studentInfo = resp['student']['studentResponse'];
     this.feePayload =resp['student']?.feeData;
     this.isShow = true;
     if(!this.api.isEmptyObject(this.feePayload?.allMode)){
      this.feePayload?.allMode.forEach(element => {
          if((element.status).toLowerCase() === 'paid'){
            this.totalPaid = this.totalPaid + Number(element?.amount)
          }
      });
     }
     this.remainingAmount = (Number(this.feePayload?.totalFinalAmount) - this.totalPaid);
    },
    (err) =>{
      this.spinner.hide();
      this.studentAllInfo =[];
      this.toastr.error(err);
    });
  }

}
