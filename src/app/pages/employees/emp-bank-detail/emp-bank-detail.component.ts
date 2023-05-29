import { Component, Input } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-emp-bank-detail',
  templateUrl: './emp-bank-detail.component.html',
  styleUrls: ['./emp-bank-detail.component.scss']
})
export class EmpBankDetailComponent {
  @Input() employeeData: any ;
  employeeBank:any;
  empBForm:FormGroup;
  constructor(private api: ApiService,private toastr: ToastrService, private router: Router,public fb: FormBuilder,) {
  }
 ngOnInit() {
  this.employeeBank = this.employeeData;
  this.createFrom();
 }
 createFrom(){
  this.empBForm = this.fb.group({ 
      id:[this.employeeBank._id],
      bankName: [this.employeeBank?.bankName, Validators.required],
      holderName: [this.employeeBank?.holderName, Validators.required],
      bankBranch: [this.employeeBank?.bankBranch, Validators.required],
      bankAddress: [this.employeeBank?.bankAddress, Validators.required],      
      ifscCode: [this.employeeBank?.ifscCode, Validators.required],
      accountNumber: [this.employeeBank?.accountNumber, Validators.required],
    });
 }

 updateInfo(formData){
  console.log(formData.value);
 }
}
