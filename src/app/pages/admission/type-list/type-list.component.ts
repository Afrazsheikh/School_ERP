import { Component, TemplateRef, ViewChild } from '@angular/core';
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
  selectedRow:any;
  tableHeader:any;
  @ViewChild('template', { read: TemplateRef }) editTemplate:TemplateRef<any>;
  @ViewChild('deletemplate', { read: TemplateRef }) deleteTemplate:TemplateRef<any>;
  constructor(private api: ApiService, private toastr: ToastrService, private router: Router,public fb: FormBuilder,private modalService: BsModalService){

  }
  ngOnInit() {
    this.createForm();
    this.getAllType();
    this.tableHeader = {
      data: [
        {  field: "autoNo", dataType:"autoNo", title: 'S. No', sort: false, visible: true, search:false },
        {  field: "name", dataType: "string", title: 'Type Name', sort: true, visible: true, search:true },
        {  field: "action", dataType:"action", title: 'Action', sort: false, visible: true, search:false  }
       ],
      searchPlaceholder:"Search by Type Name",
      sortBy: { field: 'name', asc: true },
      toolbar: {
        show: true,
        visibleOn: 'visibility',
        config: {
         
          edit: {
            show: true,
            callback: () => {
              
            },
          },
          delete: {
            show: true,
            callback: () => {
              // $('#detail-grievance').modal('show')
  
            },
          },
        },
      },
    }
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
  rowEvent($event: any) {
    this.selectedRow = $event.lead;
    if($event['event'] === 'edit'){
      this.openModal(this.editTemplate, this.selectedRow)
    }
    if($event['event'] === 'delete'){
      this.openDeleteModal(this.deleteTemplate, this.selectedRow)
    }

  }
}
