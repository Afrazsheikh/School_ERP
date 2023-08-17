import { Component, TemplateRef } from '@angular/core';
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


  constructor(private api: ApiService,private toastr: ToastrService ,private modalService: BsModalService, ) {
    this.examTermForm =  new FormGroup ({
      name: new FormControl(null, [Validators.required]),
    
    });
    this.editTermForm =  new FormGroup ({
     
      examTermId: new FormControl(null, [Validators.required]),

      name: new FormControl(null, [Validators.required]),
    
    });
    this.disturbutionForm =  new FormGroup ({
      name: new FormControl(null, [Validators.required]),
    
    });
    this.editDistForm =  new FormGroup ({
     
      marksDistributionId: new FormControl(null, [Validators.required]),

      name: new FormControl(null, [Validators.required]),
    
    });


 

  }
  exam:any
  ngOnInit(): void {this.getExamTerms() 
    this.getMarksDiturbution() }


  addDExamTerm()
  {
    console.log(this.examTermForm.value);
    
    this.isLoading = true;
    this.api.createExamTerm(this.examTermForm.value).subscribe(resp => {
      console.log(resp);
      
      this.isLoading = false;

      this.toastr.success(resp.message, "exams Term  add success");
     
  this.getExamTerms();
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
  patchTermForm(term:  any){
   this.selectedTerm=term
    this.editTermForm.patchValue({
      examTermId: term._id,
      name: term.name,
 
    });
    
  }
  updateDist(){
    this.isLoading = true;
    console.log(":this.editDistForm.value", this.editTermForm.value);
    
    this.api.updateExamTerm(this.editTermForm.value).subscribe(resp => {
      console.log(resp);
      
      this.isLoading = false;
      this.toastr.success(resp.message, "Exam  Disturbution  update success");
      document.getElementById('editModalDismissBtn')?.click();
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
    console.log(this.disturbutionForm.value);
    
    this.isLoading = true;
    this.api.marksDistribution(this.disturbutionForm.value).subscribe(resp => {
      console.log(resp);
      
      this.isLoading = false;

      this.toastr.success(resp.message, "exams Disturbution  add success");
     
  this.getMarksDiturbution();
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


  }

