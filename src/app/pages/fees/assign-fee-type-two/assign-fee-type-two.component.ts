import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../../student-details/student.service';

@Component({
  selector: 'app-assign-fee-type-two',
  templateUrl: './assign-fee-type-two.component.html',
  styleUrls: ['./assign-fee-type-two.component.scss']
})
export class AssignFeeTypeTwoComponent {
  addForm:FormGroup;
  categoryList:any;
  rows: FormArray;
  classFees:any[] = [];
  classes:any[];
  feeRow:any;
  aceYear:any[] = [];
  categoryName:any;
  constructor(private api: ApiService, private toastr: ToastrService, private router: Router,public fb: FormBuilder, 
    private studentService: StudentService) {
    this.aceYear = this.studentService.aceYear;
  }
  ngOnInit() {
    this.getAllClass();
    this.createForm();
    this.categoryList = [
      { "id":1, "name":"Acedemic Fee", 'code':"ACEDEMIC_FEE"},
      { "id":2,"name":"Hostel Fee",'code':"HOSTEL_FEE"},
      { "id":2,"name":"Tution Fee",'code':"TUTION_FEE"},
      { "id":2,"name":"Field Trip Fee",'code':"FIELD_FEE"},
      { "id":2,"name":"Admission Fee",'code':"ADMISSION_FEE"},
      { "id":2,"name":"Transportation Fee for 5KM",'code':"TRANS_5KM_FEE"},
      { "id":2,"name":"Transportation Fee for 10KM",'code':"TRANS_10KM_FEE"},
      { "id":2,"name":"Transportation Fee for 15KM",'code':"TRANS_15KM_FEE"},
      { "id":2,"name":"Transportation Fee for 20KM",'code':"TRANS_20KM_FEE"},
      { "id":2,"name":"Transportation Fee for 25KM",'code':"TRANS_25KM_FEE"},
      { "id":2,"name":"Transportation Fee for 30KM",'code':"TRANS_30KM_FEE"}
      ];
      this.onAddRow();
  }
  getAllClass() {
    this.api.getAllClass().subscribe(resp => {
      this.classes = resp.classes;
    });
  }
  onChangeClass(event){
   this.categoryName = event.target.value;
  }
  createForm(){
    this.addForm = this.fb.group({
      academicYear:['2022-2023', Validators.required],
      studentClass:['Acedemic Fee']
    });
    this.categoryName ="Acedemic Fee";
  }
  onAddRow() {
    for(var i=1 ;i<5 ;i++) {
        this.classFees.push({"class":i, "caltegoryList":this.categoryList});
    }
    
    //this.rows.push(this.createItemFormGroup());
  }
  createItemFormGroup(): FormGroup {
    return this.fb.group({
      break:  [''],
      subject:  ['', Validators.required],
      teacher:  ['',Validators.required],
      startTime:  ['',Validators.required],
      endTime:  ['', Validators.required],
      classRoom:  ['']
    });
  }
  createInfo(){}
  
}

