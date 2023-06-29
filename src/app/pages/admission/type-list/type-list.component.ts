import { Component, TemplateRef } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import {startCase, camelCase} from 'lodash'
@Component({
  selector: 'app-type-list',
  templateUrl: './type-list.component.html',
  styleUrls: ['./type-list.component.scss']
})
export class TypeListComponent {
  createTypeForm:any;
  updateTypeForm:any;
  typeData:any[] = [];
  modalRef!: BsModalRef;
  typeId :any;
  constructor(private api: ApiService, private toastr: ToastrService, private router: Router,public fb: FormBuilder,private modalService: BsModalService){

  }
  ngOnInit() {
    this.createForm();
    this.getAllType();
  }   
  createForm() {
    this.createTypeForm = this.fb.group({
      id: [''],
      typeName: ['', Validators.required]
    });
  }
  getAllType() {
    this.api.getAdmissionTypeAll().subscribe(resp => {
      this.typeData = resp?.type
    },
      (err) => {
         console.error(err);
      })
  }
  createInfo(formData){
    const postData = {
      name:  startCase(camelCase(formData.value.typeName))
    };
    this.api.createAdmissionType(postData).subscribe(resp => {
      this.toastr.success(resp.message, "Created Successfully");
     this.getAllType();
     this.createTypeForm.reset();
    },
      (err) => {
        this.toastr.error(err, " add failed");
        console.error(err);
      })
      
  }
  updateForm(data:any){
    this.updateTypeForm = this.fb.group({
      id: [data._id, Validators.required],
      typeName: [data?.name, Validators.required]
    });
  }
  openModal(template: TemplateRef<any>, data: any) {
    this.updateForm(data);
    this.modalRef = this.modalService.show(template);
  }
  openDeleteModal(template: TemplateRef<any>, data: any){
    this.typeId = data._id;
    this.modalRef = this.modalService.show(template);
  }
  deletePopup(){
    this.api.deleteAdmissionType(this.typeId).subscribe(resp => {
      this.closePopup();
      this.toastr.success(resp.message, "Deleted success");
      this.getAllType();
    },
    (err) => {
      this.toastr.error(err, " update failed");
      console.error(err);
    })
  }
  closePopup(){
    this.modalRef.hide();
  }
  updateType(formdata:any){
    let payload = {
      typeId:formdata.value.id,
      name: startCase(camelCase(formdata.value.typeName))
    }
    this.api.updateAdmissionType(payload).subscribe(resp => {
      this.closePopup();
      this.toastr.success(resp[0].msg, "Updated success");
      this.getAllType();
      this.updateTypeForm.reset();
     
  // this.getExamTerms();
    },
    (err) => {
      this.toastr.error(err, " update failed");
      console.error(err);
    })
  }
}
