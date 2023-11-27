import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import {FeeService} from '../fee.service';
@Component({
  selector: 'app-fee-category',
  templateUrl: './fee-category.component.html',
  styleUrls: ['./fee-category.component.scss']
})
export class FeeCategoryComponent {
  modalRef!: BsModalRef;
  categoryList:any[] =[];
  categoryId:any;
  selectedRow:any;
  tableHeader:any;
  @ViewChild('deletemplate', { read: TemplateRef }) deleteTemplate:TemplateRef<any>;
  constructor(private api: ApiService, private toastr: ToastrService, 
    private router: Router,private modalService: BsModalService, private feeService:FeeService){

  }
  ngOnInit(): void {    
   this.getCategoryData();
   this.tableHeader = {
    data: [
      {  field: "autoNo", dataType:"autoNo", title: 'S. No', sort: false, visible: true, search:false },
      {  field: "categoryName", dataType: "string", title: 'Name', sort: true, visible: true, search:true },
      {  field: "code", dataType: "string", title: 'Code', sort: true, visible: true, search:true },
      {  field: "action", dataType:"action", title: 'Action', sort: false, visible: true, search:false  }
     ],
    searchPlaceholder:"Search by Name & Code",
    sortBy: { field: 'categoryName', asc: true },
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
  getCategoryData(){
    this.api.getAllFeeCategory().subscribe(data =>{
      this.categoryList = data.allData;
     },
     (err) => {
      this.categoryList = [];
      // this.toastr.error(err, " add failed");
       console.error(err);
     });
  }
  addCategory(){
    this.router.navigate(['/fees/add-category']);
  }
  editCategory(row){
    this.feeService.feeData = row;
    this.router.navigate(['/fees/edit-category']);
  }
  openDeleteModal(template: TemplateRef<any>, data: any){
    this.categoryId = data._id;
    this.modalRef = this.modalService.show(template);
  }
  deletePopup(){
    this.api.deleteFeeCategoryById(this.categoryId).subscribe(resp => {
      this.closePopup();
      this.toastr.success(resp.message, "Deleted success");
      this.getCategoryData();
    },
    (err) => {
      this.toastr.error(err, " update failed");
      console.error(err);
    })
  }
  closePopup(){
    this.modalRef.hide();
  }
  rowEvent($event: any) {
    this.selectedRow = $event.lead;
    if($event['event'] === 'edit'){
     this.editCategory(this.selectedRow);
    }
    if($event['event'] === 'delete'){
      this.openDeleteModal(this.deleteTemplate, this.selectedRow)
    }

  }
}
