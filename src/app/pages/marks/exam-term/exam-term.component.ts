import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

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


  constructor(private api: ApiService,private toastr: ToastrService  ) {
    this.examTermForm =  new FormGroup ({
      name: new FormControl(null, [Validators.required]),
    
    });
    this.editTermForm =  new FormGroup ({
     
      examTermId: new FormControl(null, [Validators.required]),

      name: new FormControl(null, [Validators.required]),
    
    });


 

  }
  exam:any
  ngOnInit(): void {this.getExamTerms() }


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
      document.getElementById('modalDismissBtn')?.click();
      this.getExamTerms()
    },
    (err) => {
      this.isLoading = false;
      console.error(err);
    })
  }

  }

