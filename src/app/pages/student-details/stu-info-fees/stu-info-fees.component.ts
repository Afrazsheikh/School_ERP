import { Component, Input } from '@angular/core';
import { StudentService } from '../student.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from  '../../../services/api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-stu-info-fees',
  templateUrl: './stu-info-fees.component.html',
  styleUrls: ['./stu-info-fees.component.scss']
})
export class StuInfoFeesComponent {
  @Input() studentData: any ;
  studentFee:any;
  studentForm:any;
  classes: any[] =[];
  concessionList:any[] = [];
  feeModeList:any[] =[];
  constructor(public fb: FormBuilder, private studentService:StudentService,private api: ApiService,private router: Router) {
    this.concessionList = this.studentService.concessionList;
    this.feeModeList = this.studentService.feeMode;
  }
 ngOnInit() {
  this.studentFee = this.studentData['fees'];
  this.getAllClass();
  this.createForm();
 }
 getAllClass() {
  this.api.getAllClass().subscribe(resp => {
    this.classes = resp.classes
  });
}
 createForm(){
  this.studentForm = this.fb.group({ 
      id:[this.studentData._id],
      feeType: ['', Validators.required],
      concession: ['', Validators.required],
      feeMode: ['', Validators.required]
    });
 }
 updateInfo(formData){
  console.log(formData.value);

 }
 payInvoice(){
  this.router.navigate(["/student-acconting/pay-fees/"+this.studentData._id]);
 }
}
