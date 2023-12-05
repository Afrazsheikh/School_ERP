import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FeeService } from '../fee.service';

@Component({
  selector: 'app-edit-fee-categoy',
  templateUrl: '../add-fee-categoy/add-fee-categoy.component.html',
  styleUrls: ['../add-fee-categoy/add-fee-categoy.component.scss']
})
export class EditFeeCategoyComponent {
  feeForm:FormGroup;
  feeRowData:any;
  constructor(private api: ApiService, private toastr: ToastrService, private router: Router,
    public fb: FormBuilder,private feeService:FeeService) {    
  }
  ngOnInit() {
    this.createForm();
     if(this.feeService.feeData?.categoryName) {
      this.feeForm.patchValue({
        id: this.feeService.feeData._id,
        categoryName: this.feeService.feeData.categoryName,
        code: this.feeService.feeData.code
      });
    } else {
      this.router.navigate(['/fees/category']);
    }    
  }
  backButtonClick(){
    this.router.navigate(['/fees/category']);
  }
  createForm() {
    this.feeForm = this.fb.group({
      id: [''],
      categoryName: ['', Validators.required],
      code: ['']
    });
  }
  createInfo(formData){
    let payload = {
      categoryName:formData.value.categoryName
    }
    this.api.updateFeeCategory(formData.value.id, payload).subscribe(resp => {
      this.toastr.success(resp.message, "Updated success");
      this.router.navigate(['/fees/category']);
    },
    (err) => {
      this.toastr.error(err, "update failed");
      console.error(err);
    })
  }
}
