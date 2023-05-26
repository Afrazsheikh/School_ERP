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
  categoryList:any;
  rows: FormArray;
  classFees:any[] = [];
  classes:any[];
  feeRow:any;
  aceYear:any[] = [];
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
      this.categoryList = data.allData;
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
    return this.fb.group({
      id:  [data?._id],
      categoryName:  [data?.categoryName],
      code:  [data?.code],
      amount:  ['',Validators.required],
    });
  }
  get pairs() {
    return (<FormArray>this.addForm.get('rows'));
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
      this.toastr.success(resp.message, "Added Successully");
      this.resetField();
    },
    (err) => {
      this.toastr.error(err, " add failed");
      console.error(err);
    })
    
  }
  
}
