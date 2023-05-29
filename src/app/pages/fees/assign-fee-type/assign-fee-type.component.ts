import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { StudentService} from '../../student-details/student.service';
@Component({
  selector: 'app-assign-fee-type',
  templateUrl: './assign-fee-type.component.html',
  styleUrls: ['./assign-fee-type.component.scss']
})
export class AssignFeeTypeComponent {
  addForm:FormGroup;
  categoryList:any; categoryListMirror:any[] = [];
  rows: FormArray;
  classFees:any[] = [];
  classes:any[];
  feeRow:any;
  aceYear:any[] = [];
  feeListClassWise:any = [];
  feeListClassWiseRow:any = [];
  constructor(private api: ApiService, private toastr: ToastrService, private router: Router,public fb: FormBuilder, private studentService: StudentService) {
    this.aceYear = this.studentService.aceYear;
    this.createForm();
    this.rows = this.fb.array([]);
    this.addForm.addControl('rows', this.rows);
  }
  ngOnInit() {
    this.getAllClass();    
    this.getCategoryData();
  }
  getCategoryData(){
    this.api.getAllFeeCategory().subscribe(data =>{
      this.categoryList =  data.allData;
      this.categoryList.forEach(element => {
        this.onAddRow(element);
      });
     
     },
     (err) => {
      this.categoryList = [];
      // this.toastr.error(err, " add failed");
       console.error(err);
     });
  }
  getAllClass() {
    this.api.getAllClass().subscribe(resp => {
      this.classes = resp.classes;
    });
  }
  createForm(){
    this.addForm = this.fb.group({
      academicYear:['', Validators.required],
      studentClass:[]
    });
  }
  onAddRow(data) {     
    this.rows.push(this.createItemFormGroup(data));
  }
  createItemFormGroup(data): FormGroup {
    console.log(data);
    return this.fb.group({
      id:  [data?._id],
      categoryName:  [data?.categoryName],
      code:  [data?.code],
      amount:  [data?.amount]
    });
  }
  get pairs() {
    return (<FormArray>this.addForm.get('rows'));
  }
  onChangeClass(event){
   
  }
  removeGroup() {
   const controlData = this.addForm.get('rows') as FormArray;
   controlData.clear();
    this.addForm.updateValueAndValidity();
  }
  GetAmountData(){  
    this.removeGroup(); 
    const payload = {
      year: this.addForm.value.academicYear,
      classId:this.addForm.value.studentClass
    }
    this.api.getFeeTypeClassandYearWise(payload).subscribe(data =>{
      console.log(data);
      this.feeListClassWise = data['data']; 
      if(data['data']) {
        this.categoryListMirror =[];
        this.feeListClassWise.forEach(element => {
          this.categoryList.forEach(cate =>{
            var userName = element.feeCategory.find(x => x.categoryName === cate.categoryName);
            if(userName !== undefined){
              this.categoryListMirror.push(userName);
            } else {
              this.categoryListMirror.push(cate);
            }
           });
        });
        this.categoryListMirror.forEach(element => {
          this.onAddRow(element);
        });
        this.addForm.updateValueAndValidity();
      } 
     },
     (err) => {
      this.feeListClassWise = [];
      this.categoryList.forEach(element => {
        this.onAddRow(element);
      });
      this.addForm.updateValueAndValidity();
       console.error(err);
     });
  
  }
  resetField() {
    this.pairs.controls.forEach(group => group.get('amount').reset());
  }
  createInfo(formData){
    console.log(formData.value);
    const payload = {
      classId:formData.value.studentClass,
      year:formData.value.academicYear,
      amount:formData.value.rows
    }
    this.api.createFeeType(payload).subscribe(resp => {
      this.toastr.success(resp.message, "Added Sucessfully");
      this.resetField();
      this.addForm.controls['studentClass'].reset();
    },
    (err) => {
      this.toastr.error(err, " add failed");
      console.error(err);
    })
    
  }
  
}
