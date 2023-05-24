import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-fee-category',
  templateUrl: './fee-category.component.html',
  styleUrls: ['./fee-category.component.scss']
})
export class FeeCategoryComponent {
  modalRef!: BsModalRef;
  categoryList:any[] =[];
  constructor(private api: ApiService, private toastr: ToastrService, private router: Router,private modalService: BsModalService){

  }
  ngOnInit(): void {    
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
  }
  addCategory(){
    this.router.navigate(['/fees/add-category']);
  }
  editCategory(row){
    this.router.navigate(['/fees/edit-category']);
  }
}
