import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-admission-enq',
  templateUrl: './admission-enq.component.html',
  styleUrls: ['./admission-enq.component.scss']
})
export class AdmissionEnqComponent {
  selectedRow:any;
  tableHeader:any;
  modalRef!: BsModalRef;
  @ViewChild('template', { read: TemplateRef }) editTemplate:TemplateRef<any>;
  @ViewChild('deletemplate', { read: TemplateRef }) deleteTemplate:TemplateRef<any>;
  addEnquiryForm: FormGroup
  isLoading: boolean;
  enquiries: any[]= []
  selectedEnq: any;
  editEnq: FormGroup;
  
  constructor(private api: ApiService,private toastr: ToastrService,private modalService: BsModalService  ) {
    this.addEnquiryForm =  new FormGroup ({
      name: new FormControl(null, [Validators.required]),
      gender: new FormControl(null, [Validators.required]),
      dob: new FormControl(null, [Validators.required]),
      fatherName: new FormControl(null, [Validators.required]),
      motherName: new FormControl(null, [Validators.required]),
      mobileNo: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      assigned: new FormControl(null, [Validators.required]),
      response: new FormControl(null, [Validators.required]),
      classApplyFor: new FormControl(null, [Validators.required]),


    
    });
    this.editEnq =  new FormGroup ({
     
      // examTermId: new FormControl(null, [Validators.required]),

      name: new FormControl(null, [Validators.required]),
      gender: new FormControl(null, [Validators.required]),
      dob: new FormControl(null, [Validators.required]),
      fatherName: new FormControl(null, [Validators.required]),
      motherName: new FormControl(null, [Validators.required]),
      mobileNo: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      assigned: new FormControl(null, [Validators.required]),
      response: new FormControl(null, [Validators.required]),
      classApplyFor: new FormControl(null, [Validators.required]),
    });   
  }
  exam:any
  ngOnInit(): void {
    this.getEnqu();
    this.tableHeader = {
      data: [
        {  field: "autoNo", dataType:"autoNo", title: 'S. No', sort: false, visible: true, search:false },
        {  field: "name", dataType: "string", title: 'Name', sort: true, visible: true, search:true },
        {  field: "mobileNo", dataType: "string", title: 'Mobile No.', sort: true, visible: true, search:true },
        {  field: "guardianName", dataType: "string", title: 'Guardian', sort: true, visible: true, search:true, width:"13%" },
        {  field: "assigned", dataType: "string", title: 'Assigned', sort: true, visible: true, search:true },
        {  field: "dob", dataType: "date", title: 'Date of Birth', sort: true, visible: true, search:true },
        {  field: "response", dataType: "string", title: 'Response', sort: true, visible: true, search:true },
        {  field: "action", dataType:"action", title: 'Action', sort: false, visible: true, search:false  }
       ],
      searchPlaceholder:"Search by Name, Moblie No, Assigned and Response",
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

  getEnqu(){  
    this.api.getEnquery().subscribe(resp => {
      console.log(resp);      
      this.enquiries = resp.enquiries;
      this.enquiries.forEach(element=>{
          element['guardianName'] = element?.fatherName + " "+ element?.motherName;
      })
    });

}
  addDEnquery()
  {
    this.addEnquiryForm.value.mobileNo = this.addEnquiryForm.value.mobileNo.toString();
    this.addEnquiryForm.value.classApplyFor = this.addEnquiryForm.value.classApplyFor.toString();
    this.isLoading = true;
    this.api.addEnquery(this.addEnquiryForm.value).subscribe(resp => {
      console.log(resp);      
      this.isLoading = false;
      this.toastr.success(resp.message, "add success");
      this.getEnqu();     
    },
    (err) => {
      this.isLoading = false; 
      this.toastr.error(err, " add failed");
      console.error(err);
    })
  }

  setEnq(enq: any)
  {
    this.selectedEnq = enq;
    this.editEnq.patchValue({name: enq.name,
    
      gender: enq.gender,
      dob: enq.dob,
      fatherName: enq.fatherName,
      motherName: enq.motherName,
      mobileNo: enq.mobileNo,
      email: enq.email,
      assigned: enq.assigned,
      response: enq.assigned,
      classApplyFor: enq.classApplyFor,

      
    
    });
  }

  updateEnq(){

    this.isLoading = true;
    this.editEnq.value.mobileNo = this.editEnq.value.mobileNo.toString();
    this.editEnq.value.classApplyFor = this.editEnq.value.classApplyFor.toString();

    this.api.updateEnq(this.selectedEnq._id, this.editEnq.value).subscribe(resp => {
      console.log(resp);

      this.isLoading = false;

      this.closePopup();
      this.toastr.success(resp.message, "enquiry update success");
      this.getEnqu();
    ;
    },
    (err) => {
      this.isLoading = false;
      this.toastr.error(err, "Enquiry update failed");
      console.error(err);
    })

  }

  delete(){
    this.isLoading = true;
    this.api.deleteenquiry(this.selectedEnq._id).subscribe(resp => {
      console.log(resp);
      this.isLoading = false;
      this.closePopup();
      this.getEnqu();
    },
    (err) => {
      this.isLoading = false;
      console.error(err);
    })
  }
  rowEvent($event: any) {
    this.selectedRow = $event.lead;
    if($event['event'] === 'edit'){
      this.setEnq(this.selectedRow);
      this.openModal(this.editTemplate, this.selectedRow)
    }
    if($event['event'] === 'delete'){
      this.selectedEnq= this.selectedRow;
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

