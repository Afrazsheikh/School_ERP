import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';




@Component({
  selector: 'app-exam-setup',
  templateUrl: './exam-setup.component.html',
  styleUrls: ['./exam-setup.component.scss']
})
export class ExamSetupComponent {
  exams: any
  examForm:  FormGroup
  isLoading: boolean;
  examTerms: any;
  marksDistributions: any;
  selectedLeave: any;
  selectedExam: any;
  inputData: string ;
  selectedRoute: any;
  constructor(private api: ApiService,private toastr: ToastrService ,private route: Router ) {
    this.examForm =  new FormGroup ({
      name: new FormControl(null, [Validators.required]),
      term: new FormControl(null, [Validators.required]),
      examtype: new FormControl(null, [Validators.required]),
      marksDistribution: new FormControl(null, [Validators.required]),
      remarks: new FormControl(null, [Validators.required]),


    })

 

  }
  exam:any
  ngOnInit(): void {
    this.getAllExam()
    this.getExamTerms()
    this.getMarksDiturbution()
    //this.getAllExam()
    // this.patchLeaveForm(this.exam)

  }

  addExams()
  {
   
    this.isLoading = true;
    this.api.createExam(this.examForm.value).subscribe(resp => {
      console.log(resp);
      
      this.isLoading = false;

      this.toastr.success(resp.message, "exams  add success");
      this.getAllExam();
    ;
    },
    (err) => {
      this.isLoading = false;
      this.toastr.error(err, "exams  add failed");
      console.error(err);
    })
  }
  // nav extra
  nvativeToSecForm() {
    let naviData: NavigationExtras = {
      queryParams: { data: this.inputData },
    };
    console.log(this.inputData);

    this.route.navigate(['marks/exam-setup/:id'], naviData);
  }
  deleteExams()
  {
    this.isLoading = true;
    this.api.deleteLeave(this.selectedLeave._id).subscribe(resp => {
      console.log(resp);
      this.isLoading = false;
      document.getElementById('modalDismissBtn')?.click();

    },
    (err) => {
      this.isLoading = false;
      console.error(err);
    })
  }

  getExamTerms()
  {
    this.api.getExamTerms().subscribe(resp => {
      this.examTerms = resp.examTerms;
      console.log(this.examTerms, "exam terms");
      
      this.mapExamTerm();
    });
  }

  mapExamTerm()
  {

    
    // this.examTerms.forEach(exam => {
    //   exam["designationDetail"] = this.examTerms.find(d => d._id == exam.term);
    // });
  
    
  }
  getAllExam(){
    console.log("this");
    
    this.api.getAllExam().subscribe((res)=>{
      this.exams = res.exams
      console.log(this.exams, "first res");
      
    })
  }
  getMarksDiturbution(){
    console.log("this");
    
    this.api.getAllMarksDistubutions().subscribe((res)=>{
      this.marksDistributions = res.marksDistributions
      console.log(this.marksDistributions, "first res");
      
    })
  }

  editRoute(route: any)
  {
    this.selectedRoute = route;
    const navExtras: NavigationExtras = {
      state: {
        data: this.selectedRoute
        
      }
      
    };
    console.log(this.selectedRoute);


    this.route.navigate(["/marks/exam-setup/", this.selectedRoute._id], navExtras);
  }


}
