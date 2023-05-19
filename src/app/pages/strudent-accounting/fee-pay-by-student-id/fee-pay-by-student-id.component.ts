import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { StudentService } from '../../student-details/student.service';

@Component({
  selector: 'app-fee-pay-by-student-id',
  templateUrl: './fee-pay-by-student-id.component.html',
  styleUrls: ['./fee-pay-by-student-id.component.scss']
})
export class FeePayByStudentIdComponent {
  invoiceDate = Date();
  feePayload:any;
  paymentMethod:any[] = [];
  accountMethod:any[] = [];
  constructor(private api: ApiService, private toastr: ToastrService, private router: Router, private studentService:StudentService){
    this.paymentMethod = this.studentService.paymentMethod;
    this.accountMethod = this.studentService.AccountMethod;
  }
  ngOnInit(): void {  
  this.feePayload = [
    {
      "feeType":5,
      "dueDate":"1-MAY-23",
      "amount": "10,000",
      "discount":0,
      "fine":0,
      "paymentType":"",
      "payBy":""
    },
    {
      "feeType":5,
      "dueDate":"1-JUN-23",
      "amount": "10,000",
      "discount":0,
      "fine":0,
      "paymentType":"",
      "payBy":""
    },
    {
      "feeType":5,
      "dueDate":"1-JUL-23",
      "amount": "10,000",
      "discount":0,
      "fine":0,
      "paymentType":"",
      "payBy":""
    }

  ]; 
  }
}
