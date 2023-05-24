import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {ApiService} from '../../../services/api.service';
@Component({
  selector: 'app-add-fee-categoy',
  templateUrl: './add-fee-categoy.component.html',
  styleUrls: ['./add-fee-categoy.component.scss']
})
export class AddFeeCategoyComponent {
  feeForm:FormGroup;
  constructor(private api: ApiService, private toastr: ToastrService, private router: Router,public fb: FormBuilder) {
    
    
  }
  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.feeForm = this.fb.group({
      id: [''],
      categoryName: ['', Validators.required],
      code: ['', Validators.required]
    });
  }
  createInfo(formData){
    console.log(formData);
    this.router.navigate(['/fees/category']);
  }
}