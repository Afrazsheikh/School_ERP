import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-visitor-log',
  templateUrl: './visitor-log.component.html',
  styleUrls: ['./visitor-log.component.scss']
})
export class VisitorLogComponent {

  visitorLogForm: FormGroup
  isLoading: boolean;
  callLogs: any[]= []
  selectedEnq: any;
  editVisitor: FormGroup;
  selectedcall: any;
  selectedRow: any;
  tableHeader: any;
  modalRef!: BsModalRef;
  @ViewChild('template', { read: TemplateRef }) editTemplate: TemplateRef<any>;
  @ViewChild('deletemplate', { read: TemplateRef }) deleteTemplate: TemplateRef<any>;
  constructor(private api: ApiService,private toastr: ToastrService,private modalService: BsModalService  ) {
    this.visitorLogForm =  new FormGroup ({
      visitingPuprose: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      mobileNo: new FormControl(null, [Validators.required]),
      date: new FormControl(null, [Validators.required]),
      entryTime: new FormControl(null, [Validators.required]),
      exitTime: new FormControl(null, [Validators.required]),
      noOfVisitors: new FormControl(null, [Validators.required]),
      idNumber: new FormControl(null, [Validators.required]),
      token: new FormControl(null, [Validators.required]),
      note: new FormControl(null, [Validators.required])    
    });
    this.editVisitor =  new FormGroup ({     
      visitingPuprose: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      mobileNo: new FormControl(null, [Validators.required]),
      date: new FormControl(null, [Validators.required]),
      entryTime: new FormControl(null, [Validators.required]),
      exitTime: new FormControl(null, [Validators.required]),
      noOfVisitors: new FormControl(null, [Validators.required]),
      idNumber: new FormControl(null, [Validators.required]),
      token: new FormControl(null, [Validators.required]),
      note: new FormControl(null, [Validators.required])   
    
    });
   


 

  }
  exam:any
  ngOnInit(): void {
    this.getVisitor() 
    this.tableHeader = {
      data: [
        {  field: "autoNo", dataType:"autoNo", title: 'S. No', sort: false, visible: true, search:false },
        {  field: "name", dataType: "string", title: 'Name', sort: true, visible: true, search:true },
        {  field: "mobileNo", dataType: "string", title: 'Mobile No.', sort: true, visible: true, search:true },
        {  field: "visitingPuprose", dataType: "string", title: 'Visiting Purpose', sort: true, visible: true, search:true, width:"8%" },
        {  field: "date", dataType: "date", title: 'Date', sort: true, visible: true, search:true },
        {  field: "entryTime", dataType: "string", title: 'Entry Time', sort: true, visible: true, search:true,width:"8%" },
        {  field: "exitTime", dataType: "string", title: 'Exit Time', sort: true, visible: true, search:true,width:"8%" },
        {  field: "noOfVisitors", dataType: "string", title: 'No. Of Visitors', sort: true, visible: true, search:true,width:"5%" },
        {  field: "token", dataType: "string", title: 'Token', sort: true, visible: true, search:true },
        {  field: "idNumber", dataType: "string", title: 'Id Number', sort: true, visible: true, search:true },
        {  field: "note", dataType: "string", title: 'Note', sort: true, visible: true, search:true,width:"8%" },
        {  field: "action", dataType:"action", title: 'Action', sort: false, visible: true, search:false ,width:"12%" }
       ],
      searchPlaceholder:"Search by Name, Moblie No, Visiting Purpose and No. Of Visitors",
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

  getVisitor(){
   
  
    this.api.getAllVisitor().subscribe(resp => {
      console.log(resp);
      
      this.callLogs = resp.callLogs
    });

}
  addVisitorLog()
  {
    // console.log(this.examTermForm.value);
    
    this.isLoading = true;
    this.api.addVisitorLog(this.visitorLogForm.value).subscribe(resp => {
      console.log(resp);
      
      this.isLoading = false;

      this.toastr.success(resp.message, "add success");
      this.getVisitor() 
  // this.getExamTerms();
    },
    (err) => {
      this.isLoading = false; 
      this.toastr.error(err, " add failed");
      console.error(err);
    })
  }

  setCall(enq: any)
  {
    this.selectedcall = enq;
    this.editVisitor.patchValue({
      visitingPuprose: enq.visitingPuprose,
   
      name: enq.name,
      mobileNo: enq.mobileNo,
      date: enq.date,
      entryTime: enq.entryTime,
      exitTime: enq.exitTime,
      noOfVisitors: enq.noOfVisitors,
      note: enq.note,
      idNumber: enq.idNumber,
      token: enq.token,


    

      
    
    });
  }

  updateVisitor(){
    this.api.updateVisitor(this.selectedcall._id, this.editVisitor.value).subscribe(resp => {
       this.closePopup()
      this.toastr.success(resp.message, "Call update success");
      this.getVisitor();
    ;
    },
    (err) => {
      this.isLoading = false;
      this.toastr.error(err, "Call update failed");
      console.error(err);
    })

  }

  delete(){
    this.isLoading = true;
    this.api.deleteVisitor(this.selectedcall._id).subscribe(resp => {
      console.log(resp);
      this.isLoading = false;
      this.closePopup();
      this.getVisitor();
    },
    (err) => {
      this.isLoading = false;
      console.error(err);
    })
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

