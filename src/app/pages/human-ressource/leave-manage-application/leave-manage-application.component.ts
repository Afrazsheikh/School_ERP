import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import * as moment from 'moment';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-leave-manage-application',
  templateUrl: './leave-manage-application.component.html',
  styleUrls: ['./leave-manage-application.component.scss']
})
export class LeaveManageApplicationComponent implements OnInit {

  leaveApps: any[] = [];
  filteredLeaveApps: any[] = [];
  leaveCats: any[] = [];
  employees: any[] = [];
  employeesNewList: any[] = [];
  designations: any[] = [];
  leaveForm: FormGroup;
  editLeaveForm: FormGroup;
  selectedLeave: any;
  isLoading: boolean;
  fileData: any;
  designFilter: string = 'select';
  modalRef!: BsModalRef;
  constructor(private api: ApiService, private toastr: ToastrService,private modalService: BsModalService)
  {
    this.leaveForm = new FormGroup({
      toDate: new FormControl<Date | null>(null, [Validators.required]),
      fromDate: new FormControl<Date | null>(null, [Validators.required]),
      leaveType: new FormControl("select", [Validators.required]),
      employee: new FormControl("select", [Validators.required]),
      reason: new FormControl(null, [Validators.required]),
      status: new FormControl("PENDING"),
      designation: new FormControl()
    });
  }

  ngOnInit(): void {
    this.getLeaveApplication();
    this.getLeavesCategory();
  }
  onChangeDepart(event){
    // this.filterByDes = [];
    // this.filterByDesignation(event.target.value);
    this.getDesignationByIdData(event.target.value);
  }
  getDesignationByIdData(id){
    this.employeesNewList = [];
    this.leaveForm.patchValue({
      employee :""
    });
    this.api.getDesignationById(id).subscribe(resp => {
      this.employeesNewList = resp?.employees;
    });
  }
  getDesignations()
  {

    this.api.getDesignations().subscribe(resp => {
      this.designations = resp.designations
      this.filteredLeaveApps.forEach((leave, index) => {
        if(leave.employee) {
          leave.employee.designation = this.designations.find(design => design._id === leave.employee?.designation);
        }
      });
      console.log(this.designations);
    });
  }

  getLeaveApplication()
  {
    this.api.getLeaveApplication().subscribe(resp => {
      this.leaveApps = resp.leavesRequest;
      this.filteredLeaveApps = resp.leavesRequest;
      this.filteredLeaveApps = this.filteredLeaveApps.filter(leave => leave.employee || leave.student);
      this.getDesignations();
      this.getFilteredLeaves();
    });
  }
  

  getFilteredLeaves()
  {
    if(this.designFilter !== 'select') {
      if(this.designFilter === 'student') {
        this.filteredLeaveApps = this.leaveApps.filter(leave => leave.student );
      }
      else {
        this.filteredLeaveApps = this.leaveApps.filter(leave => leave.employee?.designation?._id === this.designFilter);
      }
      console.log("GetFiltercall\n\n")
      console.log(this.filteredLeaveApps);
    }
    
  }

  getLeavesCategory()
  {
    this.api.getLeaveCategory().subscribe(resp => {
      this.leaveCats = resp.leavesCategory;
      this.getEmployees();
    });
  }

  getEmployees()
  {
    this.api.getAllEmployees().subscribe(resp => {
      this.employees = resp.employees;
    });
  }

  onFilesDropped(files: NgxFileDropEntry[])
  {
    console.log(files);
    if(files.length > 1) {
      alert('Please upload a single file');
    }
    else
    {
      for(const droppedFile of files) {
        if(droppedFile.fileEntry.isFile)
        {
          const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
          fileEntry.file((file: File) => {
            this.fileData = file;
          })
        }
      }
    }
  }

  addLeaveRequest()
  {
    this.isLoading = true;

    let postData = new FormData();
    postData.append("toDate", moment(this.leaveForm.value.toDate).format("MM-DD-yyyy"));
    postData.append("fromDate", moment(this.leaveForm.value.fromDate).format("MM-DD-yyyy"));
    postData.append("leaveType", this.leaveForm.value.leaveType);
    postData.append("employee", this.leaveForm.value.employee);
    postData.append("reason", this.leaveForm.value.reason);
    if(this.fileData) {
      postData.append("file", this.fileData);
    }

    console.log(postData);

    this.api.addLeaveRequest(postData).subscribe(resp => {
      this.isLoading = false;
      document.getElementById("addModalDismissBtn")?.click();
      this.toastr.success(resp.message, "Leave request add success");
      this.leaveForm.reset();
      this.fileData = null;
      this.getLeaveApplication();
    },
    (err) => {
      this.isLoading = false;
      this.toastr.error(err, "Leave request add failed");
    })
  }
  openQuickModalForAddLeave(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }
  openQuickModal(template: TemplateRef<any>, data: any){
    this.selectedLeave = data;
    this.leaveForm.patchValue({
      status :data.status
    });
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }
  closePopup(){
    this.modalRef.hide();
  }
  updateStatus()
  {
   
    this.isLoading = true;
    const postData = {
      leavesRequestId: this.selectedLeave._id,
      status: this.leaveForm.value.status
    };
    this.api.updateLeaveRequestStatus(postData).subscribe(resp => {
      console.log(resp);
      this.isLoading = false;
     // document.getElementById('updateStatusModal')?.click();
     this.closePopup();
      this.getLeaveApplication();
    },
    (err) => {
      this.isLoading = false;
      console.error(err);
    })
  }

  deleteLeave()
  {
    this.isLoading = true;
    this.api.deleteLeaveRequest(this.selectedLeave._id).subscribe(resp => {
      console.log(resp);
      this.isLoading = false;
      document.getElementById('modalDismissBtn')?.click();
      this.getLeaveApplication();
    },
    (err) => {
      this.isLoading = false;
      console.error(err);
    })
  }

}
