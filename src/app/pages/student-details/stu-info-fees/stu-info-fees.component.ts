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
  row = {"isExpand": false}
  optionsForQuaterly: any[] = [
    {value:'Q1',months:['Jan','Feb','Mar']},
    {value:'Q2',months:['Apr','May','Jun']},
    {value:'Q3',months:['Jul','Aug','Sep']},
    {value:'Q4',months:['Oct','Nov','Dec']}
  ];
  availableMonths = [{ months: 'January', value: 1 },{ months: 'February', value: 2 }, { months: 'March', value: 3 }, { months: 'April', value: 4 }, { months: 'May', value: 5 }, { months: 'June', value: 6 }, { months: 'July', value: 7 }, { months: 'August', value: 8 }, { months: 'September', value: 9 }, { months: 'October', value: 10 }, { months: 'November', value: 11}, { months: 'December', value: 12}]

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
      feeType: ['', ],
      concession: ['', ],
      feeMode: ['', ]
    });
 }
 updateInfo(formData){
  console.log(formData.value);

 }
 payInvoice(){
  this.router.navigate(["/student-acconting/pay-fees/"+this.studentData._id]);
 }
 
}
