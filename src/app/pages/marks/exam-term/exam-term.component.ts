import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-exam-term',
  templateUrl: './exam-term.component.html',
  styleUrls: ['./exam-term.component.scss']
})
export class ExamTermComponent {
  examTermForm:  FormGroup
  editTermForm: FormGroup
  isLoading: boolean;
  examTerms: any;
  selectedTerm: any;
  modalRef!: BsModalRef;
  disturbutionForm:  FormGroup
  editDistForm: FormGroup

  marksDistributions: any;
  selectedDist: any;
  selectedRow:any;
  tableHeader:any;
  distributorTableHeader:any;
  @ViewChild('editLeave', { read: TemplateRef }) editTemplate:TemplateRef<any>;
  @ViewChild('deletePrompt', { read: TemplateRef }) deleteTemplate:TemplateRef<any>;

  @ViewChild('editLeaveE', { read: TemplateRef }) editDistributionTemplate:TemplateRef<any>;
  @ViewChild('deletePromptD', { read: TemplateRef }) deleteDistribtionTemplate:TemplateRef<any>;
  
  constructor(private api: ApiService,private toastr: ToastrService ,private modalService: BsModalService, ) {
    this.examTermForm =  new FormGroup ({
      name: new FormControl(null, [Validators.required]),
    
    });
    this.editTermForm =  new FormGroup ({     
      examTermId: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required])    
    });
    this.disturbutionForm =  new FormGroup ({
      name: new FormControl(null, [Validators.required])    
    });
    this.editDistForm =  new FormGroup ({     
      marksDistributionId: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required])    
    });
  }
  exam:any
  ngOnInit(): void {
    this.getExamTerms(); 
    this.getMarksDiturbution(); 
    this.tableHeader = {
      data: [
        {  field: "autoNo", dataType:"autoNo", title: 'S. No', sort: false, visible: true, search:false },
        {  field: "name", dataType: "string", title: 'Name', sort: true, visible: true, search:true },
        {  field: "action", dataType:"action", title: 'Action', sort: false, visible: true, search:false  }
       ],
      searchPlaceholder:"Search by Name",
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
    this.distributorTableHeader= {
      data: [
        {  field: "autoNo", dataType:"autoNo", title: 'S. No', sort: false, visible: true, search:false },
        {  field: "name", dataType: "string", title: 'Name', sort: true, visible: true, search:true },
        {  field: "action", dataType:"action", title: 'Action', sort: false, visible: true, search:false  }
       ],
      searchPlaceholder:"Search by Name",
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


  addDExamTerm()
  {
    console.log(this.examTermForm.value);
    
    this.isLoading = true;
    this.api.createExamTerm(this.examTermForm.value).subscribe(resp => {
     this.isLoading = false;
     this.toastr.success(resp.message, "Exams Term  Added Success");
     this.getExamTerms();
     this.examTermForm.reset();
    },
    (err) => {
      this.isLoading = false; 
      this.toastr.error(err, "exams  term add failed");
      console.error(err);
    })
  }

  getExamTerms(){
    console.log("this");
    
    this.api.getExamTerms().subscribe((res)=>{
      this.examTerms = res.examTerms
      console.log(this.examTerms, "first res");
      
    })
  }
  patchTermForm(term:  any, template: TemplateRef<any>,){
   this.selectedTerm=term
    this.editTermForm.patchValue({
      examTermId: term._id,
      name: term.name 
    });
    this.modalRef = this.modalService.show(template);
  }
  updateDist(){
    this.isLoading = true;
    console.log(":this.editDistForm.value", this.editTermForm.value);
    
    this.api.updateExamTerm(this.editTermForm.value).subscribe(resp => {
      this.isLoading = false;
      this.toastr.success(resp.message, "Exam  Disturbution  update success");
     this.closePopup();
      this.getExamTerms();
    },
    (err) => {
      this.isLoading = false;
      this.toastr.error(err, "Exam  Disturbution update failed");
    })

  }
  deleteExaTerm(){

    this.isLoading = true;
    this.api.deleteExamTerm(this.selectedTerm._id).subscribe(resp => {
      console.log(resp);
      this.isLoading = false;
     this.closePopup();
     this.toastr.success(resp.message, "Deleted Successfully");
      this.getExamTerms()
    },
    (err) => {
      this.isLoading = false;
      console.error(err);
    })
  }
  // Disturbution
  

  addDist()
  {
     this.isLoading = true;
    this.api.marksDistribution(this.disturbutionForm.value).subscribe(resp => {
     this.isLoading = false;
     this.toastr.success(resp.message, "exams Disturbution  add success");
     this.getMarksDiturbution();
     this.disturbutionForm.reset();
    },
    (err) => {
      this.isLoading = false;
      this.toastr.error(err, "exams  Disturbution add failed");
      console.error(err);
    })
  }

  getMarksDiturbution(){
    console.log("this");
    
    this.api.getAllMarksDistubutions().subscribe((res)=>{
      this.marksDistributions = res.marksDistributions
      console.log(this.marksDistributions, "first res");
      
    })
  }
  patchDistForm(dist:  any, template: TemplateRef<any>){
   this.selectedDist=dist
    this.editDistForm.patchValue({
      marksDistributionId: dist._id,
      name: dist.name,
 
    });
    this.modalRef = this.modalService.show(template);
  }
  updateDistE(){
    this.isLoading = true;
    console.log(":this.editDistForm.value", this.editDistForm.value);
    
    this.api.updateMarksDistribution(this.editDistForm.value).subscribe(resp => {
      console.log(resp);
      
      this.isLoading = false;
      this.toastr.success(resp.message, "Exam  Disturbution  update success");
     this.closePopup();
      this.getMarksDiturbution();
    },
    (err) => {
      this.isLoading = false;
      this.toastr.error(err, "Exam  Disturbution update failed");
    })

  }
  deleteDist(){

    this.isLoading = true;
    this.api.deleteMarksDistribution(this.selectedDist._id).subscribe(resp => {
      console.log(resp);
      this.isLoading = false;
      this.closePopup();
      this.toastr.success(resp.message, "Deleted Succssfully");
      this.getMarksDiturbution()
    },
    (err) => {
      this.isLoading = false;
      console.error(err);
    })
  }

  openDeleteModal(template: TemplateRef<any>, data: any){
    this.selectedTerm = data;
    this.modalRef = this.modalService.show(template);
  }
  openDeleteDistributionModal(template: TemplateRef<any>, data: any){
    this.selectedDist = data;
    this.modalRef = this.modalService.show(template);
  }
  closePopup(){
    this.modalRef.hide();
  }
  rowEvent($event: any) {
    this.selectedRow = $event.lead;
    if($event['event'] === 'edit'){
      this.patchTermForm(this.selectedRow, this.editTemplate)
    }
    if($event['event'] === 'delete'){
      this.openDeleteModal(this.deleteTemplate, this.selectedRow)
    }

  }
  distributionRowEvent($event: any) {
    this.selectedRow = $event.lead;
    if($event['event'] === 'edit'){
      this.patchDistForm(this.selectedRow, this.editDistributionTemplate)
    }
    if($event['event'] === 'delete'){
      this.openDeleteDistributionModal(this.deleteDistribtionTemplate, this.selectedRow)
    }

  }

  }

