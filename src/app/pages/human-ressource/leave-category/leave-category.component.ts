import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-leave-category',
  templateUrl: './leave-category.component.html',
  styleUrls: ['./leave-category.component.scss']
})
export class LeaveCategoryComponent implements OnInit {

  leaveCategories: any[] = [];
  designations: any[] = [];
  leaveForm: FormGroup;
  editLeaveForm: FormGroup;
  selectedLeave: any;
  isLoading: boolean;
  selectedRow: any;
  tableHeader: any;
  modalRef!: BsModalRef;
  @ViewChild('template', { read: TemplateRef }) editTemplate: TemplateRef<any>;
  @ViewChild('deletemplate', { read: TemplateRef }) deleteTemplate: TemplateRef<any>;
  constructor(private api: ApiService, private toastr: ToastrService,
  private modalService: BsModalService)
  {
    this.leaveForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      designation: new FormControl('select', [Validators.required]),
      days: new FormControl(null, [Validators.required])
    });

    this.editLeaveForm = new FormGroup({
      leavesCategoryId: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      designation: new FormControl('select', [Validators.required]),
      days: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit(): void {
    this.getDesignaions();
   
    this.tableHeader = {
      data: [
        {  field: "autoNo", dataType:"autoNo", title: 'S. No', sort: false, visible: true, search:false, width:"10%" },
        {  field: "name", dataType: "string", title: 'Name', sort: true, visible: true, search:true, width:"25%" },
        {  field: "designationName", dataType: "string", title: 'Designation', sort: true, visible: true, search:true,  },
        {  field: "days", dataType: "string", title: 'Day', sort: true, visible: true, search:true,  width:"8%" },
        {  field: "action", dataType:"action", title: 'Action', sort: false, visible: true, search:false, width:"20%"  }
       ],
      searchPlaceholder:"Search by Name and Designation",
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

  getLeaveCategory()
  {
    this.api.getLeaveCategory().subscribe(resp => {
      this.leaveCategories = resp.leavesCategory;           
      this.mapLeaveDesignation();
    })
  }

  getDesignaions()
  {
    this.api.getDesignaions().subscribe(resp => {
      this.designations = resp.designations;
      this.getLeaveCategory();
     
    });
  }  

  mapLeaveDesignation()
  {
    this.leaveCategories.forEach(leave => {
      console.log(leave);
      
      leave["designationDetail"] = this.designations.find(d => d._id == leave.designation);
      leave['designationName'] =leave.designationDetail?.name;
      console.log(leave.d);
      
    });
  }

  addLeave()
  {
    this.isLoading = true;
    this.api.addLeave(this.leaveForm.value).subscribe(resp => {
      this.isLoading = false;
      this.toastr.success(resp.message, "Leave category add success");
      this.getLeaveCategory();
    },
    (err) => {
      this.isLoading = false;
      this.toastr.error(err, "Leave category add failed");
    })
  }

  patchLeaveForm(leave: any)
  {
    this.selectedLeave = leave;
    this.editLeaveForm.patchValue({
      leavesCategoryId: leave._id,
      name: leave.name,
      designation: leave.designation,
      days: leave.days
    });
  }

  updateLeave()
  {
    this.isLoading = true;
    this.api.updateLeave(this.editLeaveForm.value).subscribe(resp => {
      this.isLoading = false;
      this.toastr.success(resp.message, "Leave category update success");
      this.closePopup();
      this.getLeaveCategory();
    },
    (err) => {
      this.isLoading = false;
      this.toastr.error(err, "Leave category update failed");
    })
  }

  deleteLeave()
  {
    this.isLoading = true;
    this.api.deleteLeave(this.selectedLeave._id).subscribe(resp => {
      console.log(resp);
      this.isLoading = false;
      this.closePopup();
      this.getLeaveCategory();
    },
    (err) => {
      this.isLoading = false;
      console.error(err);
    })
  }
  rowEvent($event: any) {
    this.selectedRow = $event.lead;
    if($event['event'] === 'edit'){ 
      this.patchLeaveForm(this.selectedRow);
      this.openModal(this.editTemplate, this.selectedRow)
    }
    if($event['event'] === 'delete'){
      this.selectedLeave = this.selectedRow;
      this.openDeleteModal(this.deleteTemplate, this.selectedRow)
    }

    }
    openModal(template: TemplateRef<any>, data: any) {
      this.modalRef = this.modalService.show(template);
    }
    openDeleteModal(template: TemplateRef<any>, data: any){     
     this.modalRef = this.modalService.show(template);
    }
    closePopup(){
      this.modalRef.hide();
    }
}
