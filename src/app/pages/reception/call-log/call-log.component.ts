import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-call-log',
  templateUrl: './call-log.component.html',
  styleUrls: ['./call-log.component.scss'],
})
export class CallLogComponent {
  callLogForm: FormGroup;
  isLoading: boolean;
  callLogs: any[] = [];
  selectedEnq: any;
  editCall: FormGroup;
  selectedcall: any;
  selectedRow: any;
  tableHeader: any;
  modalRef!: BsModalRef;
  @ViewChild('template', { read: TemplateRef }) editTemplate: TemplateRef<any>;
  @ViewChild('deletemplate', { read: TemplateRef }) deleteTemplate: TemplateRef<any>;

  constructor(
    private api: ApiService,
    private toastr: ToastrService,
    private modalService: BsModalService
  ) {
    this.callLogForm = new FormGroup({
      callType: new FormControl(null, [Validators.required]),
      purpose: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      date: new FormControl(null, [Validators.required]),
      timeSlotTo: new FormControl(null, [Validators.required]),
      mobileNo: new FormControl(null, [Validators.required]),
      timeSlotFrom: new FormControl(null, [Validators.required]),
      followUpDate: new FormControl(null, [Validators.required]),
      note: new FormControl(null, [Validators.required]),
    });
    this.editCall = new FormGroup({
      callType: new FormControl(null, [Validators.required]),
      purpose: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      date: new FormControl(null, [Validators.required]),
      timeSlotTo: new FormControl(null, [Validators.required]),
      mobileNo: new FormControl(null, [Validators.required]),
      timeSlotFrom: new FormControl(null, [Validators.required]),
      followUpDate: new FormControl(null, [Validators.required]),
      note: new FormControl(null, [Validators.required]),
    });
  }
  exam: any;
  ngOnInit(): void {
    this.getCallLog();
    this.tableHeader = {
      data: [
        {  field: "autoNo", dataType:"autoNo", title: 'S. No', sort: false, visible: true, search:false },
        {  field: "name", dataType: "string", title: 'Name', sort: true, visible: true, search:true },
        {  field: "mobileNo", dataType: "string", title: 'Mobile No.', sort: true, visible: true, search:true },
        {  field: "purpose", dataType: "string", title: 'Calling Purpose', sort: true, visible: true, search:true, width:"13%" },
        {  field: "callType", dataType: "string", title: 'Call Type', sort: true, visible: true, search:true,width:"13%" },
        {  field: "date", dataType: "date", title: 'Date', sort: true, visible: true, search:true },
        {  field: "timeSlotFrom", dataType: "string", title: 'Start Time', sort: true, visible: true, search:true,width:"8%" },
        {  field: "timeSlotTo", dataType: "string", title: 'End Time', sort: true, visible: true, search:true,width:"8%" },
        {  field: "followUpDate", dataType: "date", title: 'Follow up', sort: true, visible: true, search:true },
        {  field: "action", dataType:"action", title: 'Action', sort: false, visible: true, search:false  }
       ],
      searchPlaceholder:"Search by Name, Moblie No, Call Type and Calling Purpose",
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

  getCallLog() {
    this.api.getAllCallLogs().subscribe((resp) => {
      this.callLogs = resp.callLogs;
    });
  }
  addCallLog() {
    this.isLoading = true;
    this.api.addCallLog(this.callLogForm.value).subscribe(
      (resp) => {
        console.log(resp);
        this.isLoading = false;
        this.toastr.success(resp.message, 'add success');
        this.getCallLog();
      },
      (err) => {
        this.isLoading = false;
        this.toastr.error(err, ' add failed');
        console.error(err);
      }
    );
  }

  setCall(enq: any) {
    this.selectedcall = enq;
    this.editCall.patchValue({
      callType: enq.callType,
      purpose: enq.purpose,
      name: enq.name,
      mobileNo: enq.mobileNo,
      date: enq.date,
      timeSlotTo: enq.timeSlotTo,
      timeSlotFrom: enq.timeSlotFrom,
      followUpDate: enq.followUpDate,
      note: enq.note,
    });
  }

  updateEnq() {
    this.isLoading = true;
    this.api.updateCall(this.selectedcall._id, this.editCall.value).subscribe(
      (resp) => {
       this.isLoading = false;
        this.closePopup();
        this.toastr.success(resp.message, 'Call update success');
        this.getCallLog();
      },
      (err) => {
        this.isLoading = false;
        this.toastr.error(err, 'Call update failed');
        console.error(err);
      }
    );
  }

  delete() {
    this.isLoading = true;
    this.api.deletCall(this.selectedcall._id).subscribe(
      (resp) => {
        console.log(resp);
        this.isLoading = false;
       this.closePopup();
        this.getCallLog();
      },
      (err) => {
        this.isLoading = false;
        console.error(err);
      }
    );
  }

  rowEvent($event: any) {
    this.selectedRow = $event.lead;
    if($event['event'] === 'edit'){     
      this.setCall(this.selectedRow);
      this.openModal(this.editTemplate, this.selectedRow)
    }
    if($event['event'] === 'delete'){
      this.selectedcall= this.selectedRow;
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
