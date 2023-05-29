import { Component, Input } from '@angular/core';
import { StudentService } from '../student.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  addForm:any;
  categoryList: any[] =[];
  concessionList:any[] = [];
  feeModeList:any[] =[];
  row = {"isExpand": false , 'mode':''}
  rows: FormArray;
  optionsForQuaterly: any[] = [
    {value:'Q1',months:['Jan','Feb','Mar']},
    {value:'Q2',months:['Apr','May','Jun']},
    {value:'Q3',months:['Jul','Aug','Sep']},
    {value:'Q4',months:['Oct','Nov','Dec']}
  ];
  availableMonths = [{ months: 'January', value: 1 , date: 'Jan-2023'},{ months: 'February', value: 2 ,date: 'Feb-2023'}, { months: 'March', value: 3 }, { months: 'April', value: 4 }, { months: 'May', value: 5 }, { months: 'June', value: 6 }, { months: 'July', value: 7 }, { months: 'August', value: 8 }, { months: 'September', value: 9 }, { months: 'October', value: 10 }, { months: 'November', value: 11}, { months: 'December', value: 12}]

  constructor(public fb: FormBuilder, private studentService:StudentService,private api: ApiService,private router: Router) {
    this.concessionList = this.studentService.concessionList;
    this.feeModeList = this.studentService.feeMode;
    this.rows = this.fb.array([]);
  }
  calculatePerc(i){
    const controlData = this.addForm.get('rows') as FormArray;
    var totalA = 0 ;
    const obje = controlData.controls[i];
    const perct =  (obje.value.amount / 100) * obje.value.concession;
    totalA = obje.value.amount - perct;
    obje.patchValue({
      totalAmount: totalA
    })
    
  }
  onCheckChange(e, i){
   const controlData = this.addForm.get('rows') as FormArray;
    const obje = controlData.controls[i];
    obje.patchValue({
      isChecked: e.target.checked
    });
    this.calculateAmount();
  }
  calculateAmount(){
    var totalAmount =0
    const controlData = this.addForm.get('rows') as FormArray;
    controlData.controls.forEach(element =>{
     if(element.value.isChecked) {
      totalAmount = totalAmount + element.value.totalAmount
     }
    });
    this.addForm.patchValue({
      totalFinalAmount: totalAmount
    });
  }
 ngOnInit() {
  console.log(this.studentData);
  this.studentFee = this.studentData['fees'];
  this.getCategoryData();
  this.createForm();
  this.addForm.addControl('rows', this.rows);

 }

 getCategoryData(){
  const payload = {
    year: this.studentData?.academic?.academicYear,
    classId:this.studentData?.academic?.studentClass?._id
  }
  this.api.getFeeTypeClassandYearWise(payload).subscribe(data =>{
   this.categoryList =  data['data'][0]['feeCategory'];
    if(this.api.isEmptyObject(this.studentFee)){
      this.categoryList.forEach(element => {
        this.onAddRow(element);
      });
    } else {
      //we need to update amount
    }
   },
   (err) => {
    this.categoryList = [];
    // this.toastr.error(err, " add failed");
     console.error(err);
   });
  }
    onAddRow(data) {     
      this.rows.push(this.createItemFormGroup(data));
    }
    payNowClick(formData){
      console.log(formData.value);
    this.row.isExpand = true;
    this.row.mode = this.addForm.feeMode;


    this.api.getFeeTypeClassandYearWise(formData.value).subscribe(data =>{
      this.categoryList =  data['data'][0]['feeCategory'];
       if(this.api.isEmptyObject(this.studentFee)){
         this.categoryList.forEach(element => {
           this.onAddRow(element);
         });
       } else {
         //we need to update amount
       }
      },
      (err) => {
       this.categoryList = [];
       // this.toastr.error(err, " add failed");
        console.error(err);
      });
    
    }
    createItemFormGroup(data): FormGroup {
      console.log(data);
      return this.fb.group({
        id:  [data?.id],
        categoryName:  [data?.categoryName],
        code:  [data?.code],
        amount:  [data?.amount],
        concession: [''],
        totalAmount: [data?.amount],
        isChecked: [false]
      });
    }
 createForm(){
  this.addForm = this.fb.group({ 
      id:[this.studentData._id],
      feeMode: ['',  Validators.required],
      academicYear:[this.studentData?.academic?.academicYear, Validators.required],
      studentClass:[this.studentData?.academic?.studentClass?._id],
      totalFinalAmount: []

    });
 }
 updateInfo(formData){
  console.log(formData.value);

 }
 payInvoice(){
  this.router.navigate(["/student-acconting/pay-fees/"+this.studentData._id]);
 }
 checkValue(event){
console.log(event.target.value)
 }
}
