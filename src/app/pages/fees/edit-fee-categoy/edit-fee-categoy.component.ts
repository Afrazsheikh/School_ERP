import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-fee-categoy',
  templateUrl: '../add-fee-categoy/add-fee-categoy.component.html',
  styleUrls: ['../add-fee-categoy/add-fee-categoy.component.scss']
})
export class EditFeeCategoyComponent {
  feeForm:FormGroup;
  constructor(private api: ApiService, private toastr: ToastrService, private router: Router,public fb: FormBuilder) {
    
    
  }
  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.feeForm = this.fb.group({
      id: ['123'],
      categoryName: ['Acedemic Fee', Validators.required],
      code: ['ACEDEMIC_FEE', Validators.required]
    });
  }
  createInfo(formData){
    console.log(formData);
    this.router.navigate(['/fees/category']);
      }
}
