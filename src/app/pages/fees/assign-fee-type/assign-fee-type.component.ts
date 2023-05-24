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
  createForm(){
    this.addForm = this.fb.group({
      academicYear:['', Validators.required],
      studentClass:[]
    });
  }
  onAddRow() {
    for(var i=1 ;i<5 ;i++) {
        this.classFees.push({"class":i, "amount":"0"});
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
