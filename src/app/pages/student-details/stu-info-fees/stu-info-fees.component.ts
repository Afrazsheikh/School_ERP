import { Component, Input, TemplateRef } from '@angular/core';
import { StudentService } from '../student.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from  '../../../services/api.service';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-stu-info-fees',
  templateUrl: './stu-info-fees.component.html',
  styleUrls: ['./stu-info-fees.component.scss']
})

export class StuInfoFeesComponent {
  @Input() studentDataAll: any ;
  studentData:any;
  studentFee:any;
  addForm:any;
  categoryList: any[] =[];
  feeModeList:any[] =[];
  transportList:any[] = [];
  row = {"isExpand": false , 'mode':'', isVisibleSaveBtn: true}
  rows: FormArray;
  invoceRow: FormArray;
  paymentMethod:any[] = [];
  accountMethod:any[] = [];
  modalRef!: BsModalRef;
  invoiceRowSingleData :any;
  invoiceRowSingleIndex:any;
   constructor(public fb: FormBuilder, private studentService:StudentService,private api: ApiService,private router: Router
    ,private modalService: BsModalService,private spinner: NgxSpinnerService) {
    this.rows = this.fb.array([]);
    this.invoceRow = this.fb.array([]);
    this.paymentMethod = this.studentService.paymentMethod;
    this.accountMethod = this.studentService.AccountMethod;
  }
  
 ngOnInit() {
  console.log(this.studentData);
  this.studentData = this.studentDataAll['studentResponse'];  
  this.createForm();
  this.addForm.addControl('rows', this.rows);
  this.addForm.addControl('invoceRow', this.invoceRow);
  if(!this.api.isEmptyObject(this.studentDataAll?.feeData)){
    this.studentFee = this.studentDataAll?.feeData;
    this.getExistingFee();
  } else{
    this.getCategoryData();
  }
  this.getFeeMode();  
 
 
 }
 getTransporation(){
  const payload = {
    year: this.studentData?.academic?.academicYear
  }
  this.api.getYearWiseTransportationList(payload).subscribe(data =>{
    this.transportList = data.allData;
   },
   (err) => {
    this.transportList = [];
    // this.toastr.error(err, " add failed");
     console.error(err);
   });
}
 getFeeMode(){
  this.api.getAllFeeMode().subscribe(data =>{
    this.feeModeList =  data['allMode'];
  },(err) => {
     this.feeModeList = [];
      console.error(err);
    });
 }
 clearDataRestore(data){
  const controlData = this.addForm.get('rows') as FormArray;
  controlData.clear();

  data?.feeConcessionData?.allFee.forEach(element =>{
    this.onAddRow(element, true);
  });
  data?.feeConcessionData?.allMode.forEach(element => {
      this.onAddInvoiceRow(element);
  });
  //this.addForm.controls['totalFinalAmount'].disable();
  //this.addForm.controls['feeMode'].disable();
  this.addForm.updateValueAndValidity();
  this.row.isVisibleSaveBtn = true;
  this.row.isExpand = true;
 }
 getExistingFee(){
  this.row.isVisibleSaveBtn = true;
  this.addForm.patchValue({
    id :this.studentFee?._id,
    feeMode:this.studentFee?.feemode,
    academicYear:this.studentFee?.academicYear,
    studentClass:this.studentFee?.studentClass,
    totalFinalAmount:this.studentFee?.totalFinalAmount
  });
  this.addForm.controls['totalFinalAmount'].disable();
  this.addForm.controls['feeMode'].disable();
  this.addForm.updateValueAndValidity();
  this.studentFee.allFee.forEach(element =>{
    this.onAddRow(element, true);
  });
  this.studentFee.allMode.forEach(element => {
      this.onAddInvoiceRow(element);
  });
  if(this.studentFee?.isEditableCategory){
    this.row.isVisibleSaveBtn = this.studentFee?.isEditableCategory;
  }
  this.row.isExpand = true;
 }
 
 onAddInvoiceRow(data) {     
  this.invoceRow.push(this.createInvoiceFormGroup(data));
}
 createInvoiceFormGroup(data): FormGroup {
  
    return this.fb.group({
      id:  [data?.id],
      modeId:  [data?.modeId],
      month:  [data?.month],
      date:  [data?.date],
      status: [data?.status],
      amount: [data?.amount],
      paymentMethod: [{value:data?.paymentMode, disabled:((data?.status).toLowerCase() === 'paid'? true: false)}, Validators.required],
      paymentBy: ['']
    });
}
invoiceModelPopup(template: TemplateRef<any>, data: any, index){
  this.invoiceRowSingleData =data;
  this.invoiceRowSingleIndex =index;
  this.modalRef = this.modalService.show(template);
}
updateInvoice(data, index){ 
  const payload = {
    feeConcessionId : this.studentFee?._id,
    modeID: data.value.id, 
    paymentMode :data.value?.paymentMethod
  }
  this.api.updateInvoiceStudentModeWise(payload).subscribe(resp => {
    const controlData = this.addForm.get('invoceRow') as FormArray;
    const obje = controlData.controls[index];
     obje.patchValue({
     // paymentMethod: data.value?.paymentMethod,
      status:'Paid'
    })
    controlData.controls[index].get('paymentMethod').disable();
    this.row.isVisibleSaveBtn = false;
    this.addForm.updateValueAndValidity();
  },
    (err) => {
      
      console.error(err);
    });

  this.closePopup();
}
 getCategoryData(){
  const payload = {
    year: this.studentData?.academic?.academicYear,
    classId:this.studentData?.academic?.studentClass?._id
  }

  forkJoin([
    this.api.getFeeTypeClassandYearWise(payload),
    this.api.getYearWiseTransportationList(payload)
  ]).subscribe(res => {
      this.categoryList =res[0]['data'][0]['feeCategory'];
      this.transportList = res[1]['allData'];
      this.categoryList.push({id: '', categoryName:"", code: '', amount: 0, type:'$$KM@@'});
   // this.transportList.forEach(element => {
     // this.categoryList.push({id: element._id, categoryName:element.distance+" KM", code: element.code, amount: element.amount});
    //});
   this.categoryList.forEach(element => {
        this.onAddRow(element, false);
      });    
    }); //forkJOIN closing tag
    this.row.isVisibleSaveBtn = true;
  
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
  this.calculateAmount();
  
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

    onAddRow(data, disabledMode) {     
      this.rows.push(this.createItemFormGroup(data, disabledMode));
    }
    payNowClick(formData){
      this.spinner.show();
      var feeProcessData:any[] = []
      formData.value.rows.forEach(element =>{
        element['type']='';
        if(element.categoryName !== "") {
          feeProcessData.push(element);
        }
        
      })
    this.row.isExpand = true;
    this.row.mode = this.addForm.feeMode;
    const payload = {
      "studentId":this.studentData?._id,
      "feemode":formData.value.feeMode,
      "academicYear":formData.value.academicYear,
      "studentClass":formData.value.studentClass,
      "totalFinalAmount":(formData.value.totalFinalAmount).toString(),
      "allFee": feeProcessData, // formData.value.rows,
      "isEditableCategory":true   
    }
    this.api.studenWiseFeeCategoryStore(payload).subscribe(data =>{     
        this.studentFee  = data['feeConcessionData'];
        this.clearDataRestore(data);
        this.spinner.hide();
      },
      (err) => {
       this.categoryList = [];
       // this.toastr.error(err, " add failed");
        console.error(err);
      });
  
//this.getDueDatebyMode(formData);
    }
    getDueDatebyMode(formData){
      this.api.getAllFeeMonth(formData.value.feeMode).subscribe(data =>{
        console.log(data)
        },
        (err) => {
         this.categoryList = [];
         // this.toastr.error(err, " add failed");
          console.error(err);
        });  
    }
    createItemFormGroup(data, disabledMode): FormGroup {
      if(data?.amount){
        data.amount = Number(data.amount) 
      }
      if(data.hasOwnProperty('totalAmount')){  
        data.totalAmount = Number(data.totalAmount)     
      }else {
        data.totalAmount = Number(data.amount) 
      }
      if(disabledMode){
        return this.fb.group({
          id:  [data?.id],
          categoryName:  [data?.categoryName],
          code:  [data?.code],
          amount:  [data?.amount],
          concession: [{value:data?.concession, disabled:true}],
          hike:[{value:data?.hike, disabled:true}],
          totalAmount: [{value:data?.totalAmount,disabled:true}],
          isChecked: [{value:data?.isChecked, disabled:true}],
          type:[data?.type],
          transporationId:['']
        });
      } else {       
      return this.fb.group({
        id:  [data?.id],
        categoryName:  [data?.categoryName],
        code:  [data?.code],
        amount:  [data?.amount],
        concession: [''],
        hike:[{value:"", disabled:true}],
        totalAmount: [data?.amount],
        isChecked: [false],
        type:[data?.type],
        transporationId:['']
      });
      }  
    }
    onChangeTransporation(event, i){
      console.log(event.target.value);
      var transpData = this.transportList.find(l => l._id === event.target.value);

      const controlData = this.addForm.get('rows') as FormArray;
      const obje = controlData.controls[i];
      obje.patchValue({
        id: transpData?._id,
        categoryName:transpData?.distance,
        code:transpData?.code,
        amount:Number(transpData?.amount),
        concession:0,
        totalAmount:Number(transpData?.amount)
        });
    }
 createForm(){
  this.addForm = this.fb.group({ 
      id:[this.studentData._id],
      feeMode: ['',  Validators.required],
      academicYear:[this.studentData?.academic?.academicYear, Validators.required],
      studentClass:[this.studentData?.academic?.studentClass?._id],
      totalFinalAmount: [],
      tranId:[''],
      transDistance:[''],
      transCatgory:[''],
      transAmount:['']
    });
 }
 updateInfo(formData){
  console.log(formData.value);

 }
 payInvoice(){
  this.router.navigate(["/student-acconting/pay-fees/"+this.studentData._id]);
 }
 checkValue(event){

 }
 closePopup(){
  this.modalRef.hide();
}
printInvoice(){
  this.router.navigate(["/fees/print-invoice/"+this.studentData._id+"/"+this.studentData?.academic?.academicYear]);
}
}
